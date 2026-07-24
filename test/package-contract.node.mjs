import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function verifierTemporaryRoots() {
  return readdirSync(tmpdir())
    .filter((name) => name.startsWith("ui-foundations-package-"))
    .sort();
}

test("verifies the exact packed package contract in an isolated consumer", () => {
  const temporaryRootsBefore = verifierTemporaryRoots();
  const result = spawnSync(process.execPath, ["scripts/verify-package.mjs"], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: process.env,
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  if (process.env.UI_FOUNDATIONS_KEEP_PACKAGE_TEMP !== "1") {
    assert.deepEqual(verifierTemporaryRoots(), temporaryRootsBefore);
  }
  process.stdout.write(result.stdout);
});

test("retains and identifies an exact release-candidate archive on request", () => {
  const candidateRoot = mkdtempSync(join(tmpdir(), "ui-foundations-candidate-"));
  const outputDirectory = join(candidateRoot, "archive");

  try {
    const result = spawnSync(process.execPath, ["scripts/verify-package.mjs"], {
      cwd: repositoryRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        UI_FOUNDATIONS_PACKAGE_OUTPUT_DIRECTORY: outputDirectory,
      },
    });

    assert.equal(result.status, 0, result.stderr || result.stdout);
    const record = JSON.parse(
      result.stdout.slice(result.stdout.lastIndexOf("\n{") + 1),
    );
    assert.equal(record.archiveRetained, true);
    assert.equal(record.archivePath, join(outputDirectory, record.archive));
    assert.match(record.archiveSha256, /^[a-f0-9]{64}$/);
    assert.match(record.archiveIntegrity, /^sha512-/);
    assert.equal(existsSync(record.archivePath), true);
    assert.ok(statSync(record.archivePath).size > 0);
  } finally {
    rmSync(candidateRoot, { force: true, recursive: true });
  }
});

test("requires explicit candidate and HTTPS release asset inputs", () => {
  const { UI_FOUNDATIONS_CANDIDATE_ARCHIVE, UI_FOUNDATIONS_RELEASE_ASSET_URL, ...env } =
    process.env;
  const result = spawnSync(process.execPath, ["scripts/verify-release-asset.mjs"], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env,
  });

  assert.notEqual(result.status, 0);
  assert.match(
    result.stderr,
    /Set UI_FOUNDATIONS_CANDIDATE_ARCHIVE and UI_FOUNDATIONS_RELEASE_ASSET_URL/,
  );
});

test("rejects a packed artifact with a missing exported target", () => {
  const result = spawnSync(process.execPath, ["scripts/verify-package.mjs"], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      UI_FOUNDATIONS_KEEP_PACKAGE_TEMP: "0",
      UI_FOUNDATIONS_VERIFY_INJECT_MISSING_EXPORT: "dist/fonts.css",
    },
  });

  assert.notEqual(result.status, 0);
  assert.match(
    result.stderr,
    /Packed artifact is missing exported file dist\/fonts\.css/,
  );
});
