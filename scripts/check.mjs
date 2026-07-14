import { readFile } from "node:fs/promises";

const requiredFiles = [
  "src/tokens.css",
  "src/reset.css",
  "src/base.css",
  "src/accessibility.css",
];

const index = await readFile("src/index.css", "utf8");
const sources = await Promise.all(
  requiredFiles.map(async (path) => [path, await readFile(path, "utf8")]),
);

for (const path of requiredFiles) {
  const importPath = path.replace("src/", "./");
  if (!index.includes(`@import "${importPath}";`)) {
    throw new Error(`src/index.css does not import ${path}`);
  }
}

const combined = sources.map(([, source]) => source).join("\n");
if (/--[\w-]+:\s*;/.test(combined)) {
  throw new Error("A CSS custom property has an unresolved empty value");
}

for (const projectToken of ["--primary:", "--accent:"]) {
  if (combined.includes(projectToken)) {
    throw new Error(`${projectToken.slice(0, -1)} must remain project-owned`);
  }
}

for (const requiredToken of [
  "--background:",
  "--surface:",
  "--text-primary:",
  "--focus-ring:",
  "--radius-control:",
  "--space-2:",
  "--control-touch:",
]) {
  if (!combined.includes(requiredToken)) {
    throw new Error(`Missing required starter token ${requiredToken.slice(0, -1)}`);
  }
}

console.log("UI Foundations checks passed");
