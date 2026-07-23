import { cp, mkdir, mkdtemp, readFile, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = resolve(repositoryRoot, "test/fixtures/package-consumer");
const temporaryRoot = await mkdtemp(join(tmpdir(), "ui-foundations-package-"));
const packRoot = join(temporaryRoot, "pack");
const consumerRoot = join(temporaryRoot, "consumer");
const retainTemporaryRoot =
  process.env.UI_FOUNDATIONS_KEEP_PACKAGE_TEMP === "1";
await mkdir(packRoot);

const expectedExports = {
  ".": {
    types: "./dist/types/index.d.ts",
    import: "./dist/index.js",
  },
  "./components": {
    types: "./dist/types/components/index.d.ts",
    import: "./dist/components.js",
  },
  "./patterns": {
    types: "./dist/types/patterns/index.d.ts",
    import: "./dist/patterns.js",
  },
  "./theme-profiles": {
    types: "./dist/types/theme-profiles.d.ts",
    import: "./dist/theme-profiles.js",
  },
  "./styles.css": "./dist/foundation.css",
  "./components.css": "./dist/components.css",
  "./fonts.css": "./dist/fonts.css",
  "./global.css": "./dist/global.css",
  "./primitives.css": "./dist/primitives.css",
  "./tokens.css": "./dist/tokens.css",
  "./package.json": "./package.json",
};

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: process.env,
    ...options,
  });

  if (result.status !== 0) {
    process.stderr.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status}`,
    );
  }

  return result.stdout ?? "";
}

function packageRecordFrom(output) {
  const parsed = JSON.parse(output);
  if (Array.isArray(parsed)) return parsed[0];
  return Object.values(parsed)[0];
}

function collectPhysicalPackagePaths(output, packageName) {
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((path) =>
      path.replaceAll("\\", "/").endsWith(`/node_modules/${packageName}`),
    );
}

async function verifyPackage() {
  const packOutput = run("npm", [
    "pack",
    "--ignore-scripts",
    "--json",
    "--pack-destination",
    packRoot,
  ]);
  const packageRecord = packageRecordFrom(packOutput);
  const archiveFiles = new Set(packageRecord.files.map(({ path }) => path));
  const injectedMissingExport =
    process.env.UI_FOUNDATIONS_VERIFY_INJECT_MISSING_EXPORT;
  if (injectedMissingExport) {
    archiveFiles.delete(injectedMissingExport);
  }
  const requiredFiles = ["CHANGELOG.md", "README.md"];

  for (const requiredFile of requiredFiles) {
    if (!archiveFiles.has(requiredFile)) {
      throw new Error(`Packed artifact is missing ${requiredFile}`);
    }
  }

  const exportedFiles = new Set(
    Object.values(expectedExports)
      .flatMap((exportTarget) =>
        typeof exportTarget === "string"
          ? exportTarget
          : Object.values(exportTarget),
      )
      .map((exportTarget) => exportTarget.replace(/^\.\//, "")),
  );

  for (const exportedFile of exportedFiles) {
    if (!archiveFiles.has(exportedFile)) {
      throw new Error(
        `Packed artifact is missing exported file ${exportedFile}`,
      );
    }
  }

  const sourceMapFiles = packageRecord.files.filter(({ path }) =>
    path.endsWith(".js.map"),
  );
  if (sourceMapFiles.length === 0) {
    throw new Error(
      "Packed artifact has no JavaScript source maps for bundle-boundary verification",
    );
  }

  for (const { path } of sourceMapFiles) {
    const sourceMap = JSON.parse(
      await readFile(join(repositoryRoot, path), "utf8"),
    );
    const bundledRuntimeSource = sourceMap.sources?.find((source) =>
      /node_modules\/(?:react(?:-dom)?|@base-ui\/react|lucide-react)(?:\/|$)/.test(
        source,
      ),
    );

    if (bundledRuntimeSource) {
      throw new Error(
        `Packed JavaScript bundles consumer/runtime dependency ${bundledRuntimeSource}`,
      );
    }
  }

  for (const { path } of packageRecord.files) {
    if (/^(?:\.storybook|docs|scripts|src|stories|test)\//.test(path)) {
      throw new Error(
        `Packed artifact exposes private repository path ${path}`,
      );
    }
  }

  const packedReadme = await readFile(
    join(repositoryRoot, "README.md"),
    "utf8",
  );
  if (packedReadme.includes("](./docs/")) {
    throw new Error(
      "Packed README contains a relative link to documentation that is not shipped",
    );
  }

  await cp(fixtureRoot, consumerRoot, { recursive: true });
  const archivePath = join(packRoot, packageRecord.filename);
  run(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--no-package-lock",
      "--prefer-offline",
      archivePath,
    ],
    { cwd: consumerRoot, stdio: "inherit" },
  );
  run("npm", ["run", "typecheck"], { cwd: consumerRoot, stdio: "inherit" });
  run("npm", ["run", "build"], { cwd: consumerRoot, stdio: "inherit" });

  const privateImportProbe = run(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `
    try {
      await import('@taylorhuston/ui-foundations/src/components')
      process.exit(2)
    } catch (error) {
      if (error?.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') throw error
    }
  `,
    ],
    { cwd: consumerRoot },
  );

  if (privateImportProbe.trim()) {
    throw new Error("Private import probe produced unexpected output");
  }

  const publicImportProbe = run(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `
    for (const specifier of [
      '@taylorhuston/ui-foundations',
      '@taylorhuston/ui-foundations/components',
      '@taylorhuston/ui-foundations/patterns',
      '@taylorhuston/ui-foundations/theme-profiles',
    ]) {
      const imported = await import(specifier)
      if (Object.keys(imported).length === 0) {
        throw new Error(\`Public JavaScript export resolved without exports: \${specifier}\`)
      }
    }

    for (const specifier of [
      '@taylorhuston/ui-foundations/styles.css',
      '@taylorhuston/ui-foundations/components.css',
      '@taylorhuston/ui-foundations/fonts.css',
      '@taylorhuston/ui-foundations/global.css',
      '@taylorhuston/ui-foundations/primitives.css',
      '@taylorhuston/ui-foundations/tokens.css',
      '@taylorhuston/ui-foundations/package.json',
    ]) {
      import.meta.resolve(specifier)
    }
  `,
    ],
    { cwd: consumerRoot },
  );

  if (publicImportProbe.trim()) {
    throw new Error("Public import probe produced unexpected output");
  }

  const physicalDependencyPaths = run(
    "npm",
    ["ls", "--parseable", "--all", "react", "react-dom"],
    {
      cwd: consumerRoot,
    },
  );
  const reactPaths = collectPhysicalPackagePaths(
    physicalDependencyPaths,
    "react",
  );
  const reactDomPaths = collectPhysicalPackagePaths(
    physicalDependencyPaths,
    "react-dom",
  );

  if (reactPaths.length !== 1 || reactDomPaths.length !== 1) {
    throw new Error(
      `Expected one physical React runtime, found react=${reactPaths.length} react-dom=${reactDomPaths.length}`,
    );
  }

  const installedManifestPath = join(
    await realpath(
      join(consumerRoot, "node_modules/@taylorhuston/ui-foundations"),
    ),
    "package.json",
  );
  const installedManifest = JSON.parse(
    await readFile(installedManifestPath, "utf8"),
  );
  const reactVersion = JSON.parse(
    await readFile(join(reactPaths[0], "package.json"), "utf8"),
  ).version;
  const reactDomVersion = JSON.parse(
    await readFile(join(reactDomPaths[0], "package.json"), "utf8"),
  ).version;

  const expectedPeerDependencies = {
    react: "^19.0.0",
    "react-dom": "^19.0.0",
  };
  const expectedRuntimeDependencies = {
    "@base-ui/react": "^1.6.0",
    "lucide-react": "^1.24.0",
  };

  if (
    JSON.stringify(installedManifest.exports) !==
    JSON.stringify(expectedExports)
  ) {
    throw new Error(
      "Installed package export map does not match the supported public contract",
    );
  }

  for (const [packageName, expectedRange] of Object.entries(
    expectedPeerDependencies,
  )) {
    if (installedManifest.peerDependencies?.[packageName] !== expectedRange) {
      throw new Error(
        `Expected ${packageName}@${expectedRange} to remain a peer dependency`,
      );
    }
    if (installedManifest.dependencies?.[packageName]) {
      throw new Error(
        `${packageName} must not be owned as a runtime dependency`,
      );
    }
  }

  for (const [packageName, expectedRange] of Object.entries(
    expectedRuntimeDependencies,
  )) {
    if (installedManifest.dependencies?.[packageName] !== expectedRange) {
      throw new Error(
        `Expected ${packageName}@${expectedRange} to remain a runtime dependency`,
      );
    }
  }

  if (installedManifest.private !== true) {
    throw new Error(
      "Registry publication guard is missing; package must remain private until an authorized release",
    );
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        archive: packageRecord.filename,
        files: packageRecord.files.length,
        package: `${installedManifest.name}@${installedManifest.version}`,
        privateImportRejected: true,
        publicationGuarded: true,
        publicExportsResolved: Object.keys(expectedExports).length,
        react: reactVersion,
        reactDom: reactDomVersion,
        reactPhysicalInstallations: reactPaths.length,
        reactDomPhysicalInstallations: reactDomPaths.length,
        reactPeerOwnershipVerified: true,
        runtimeDependenciesVerified: Object.keys(expectedRuntimeDependencies)
          .length,
        runtimeBundlingSourceMapsInspected: sourceMapFiles.length,
        temporaryRoot: retainTemporaryRoot ? temporaryRoot : undefined,
        temporaryRootRetained: retainTemporaryRoot,
      },
      null,
      2,
    )}\n`,
  );
}

try {
  await verifyPackage();
} finally {
  if (!retainTemporaryRoot) {
    await rm(temporaryRoot, { force: true, recursive: true });
  }
}
