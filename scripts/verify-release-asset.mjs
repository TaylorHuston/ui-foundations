import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = resolve(repositoryRoot, "test/fixtures/package-consumer");
const candidateArchive = process.env.UI_FOUNDATIONS_CANDIDATE_ARCHIVE;
const releaseAssetUrl = process.env.UI_FOUNDATIONS_RELEASE_ASSET_URL;

if (!candidateArchive || !releaseAssetUrl) {
  throw new Error(
    "Set UI_FOUNDATIONS_CANDIDATE_ARCHIVE and UI_FOUNDATIONS_RELEASE_ASSET_URL to verify a released archive.",
  );
}

const assetUrl = new URL(releaseAssetUrl);
if (assetUrl.protocol !== "https:") {
  throw new Error("Release assets must use an HTTPS URL.");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: process.env,
    ...options,
  });

  if (result.error) {
    throw new Error(`${command} ${args.join(" ")} could not start`, {
      cause: result.error,
    });
  }

  if (result.status !== 0) {
    process.stderr.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

const temporaryRoot = await mkdtemp(join(tmpdir(), "ui-foundations-release-asset-"));
const consumerRoot = join(temporaryRoot, "consumer");
const downloadedArchive = join(temporaryRoot, "release-asset.tgz");

try {
  const candidateBytes = await readFile(resolve(candidateArchive));
  const response = await fetch(assetUrl);
  if (!response.ok) {
    throw new Error(`Release asset download failed with HTTP ${response.status}.`);
  }

  const assetBytes = Buffer.from(await response.arrayBuffer());
  const candidateSha256 = sha256(candidateBytes);
  const assetSha256 = sha256(assetBytes);
  if (assetSha256 !== candidateSha256) {
    throw new Error(
      `Release asset SHA-256 ${assetSha256} does not match candidate ${candidateSha256}.`,
    );
  }
  await writeFile(downloadedArchive, assetBytes);

  await cp(fixtureRoot, consumerRoot, { recursive: true });
  run(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--prefer-offline",
      assetUrl.href,
    ],
    { cwd: consumerRoot, stdio: "inherit" },
  );
  run("npm", ["run", "typecheck"], { cwd: consumerRoot, stdio: "inherit" });
  run("npm", ["run", "build"], { cwd: consumerRoot, stdio: "inherit" });

  const lockfile = JSON.parse(
    await readFile(join(consumerRoot, "package-lock.json"), "utf8"),
  );
  const packageLockEntry = lockfile.packages?.[
    "node_modules/@taylorhuston/ui-foundations"
  ];
  if (
    packageLockEntry?.resolved !== assetUrl.href ||
    typeof packageLockEntry.integrity !== "string" ||
    !packageLockEntry.integrity.startsWith("sha512-")
  ) {
    throw new Error(
      "Clean URL consumer did not record the release URL and SHA-512 integrity in package-lock.json.",
    );
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        assetUrl: assetUrl.href,
        candidateArchive: resolve(candidateArchive),
        candidateSha256,
        assetSha256,
        byteIdentical: true,
        downloadedArchive,
        lockfileIntegrity: packageLockEntry.integrity,
        package: "@taylorhuston/ui-foundations",
        urlConsumerTypecheck: true,
        urlConsumerProductionBuild: true,
      },
      null,
      2,
    )}\n`,
  );
} finally {
  await rm(temporaryRoot, { force: true, recursive: true });
}
