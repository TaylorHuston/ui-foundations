import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
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
