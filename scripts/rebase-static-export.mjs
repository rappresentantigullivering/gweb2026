import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";

const [exportDirectoryArg, publicDirectoryArg, basePathArg] = process.argv.slice(2);

if (!exportDirectoryArg || !publicDirectoryArg || !basePathArg) {
  console.error(
    "Usage: node scripts/rebase-static-export.mjs <export-directory> <public-directory> </base-path>",
  );
  process.exit(1);
}

const exportDirectory = resolve(exportDirectoryArg);
const publicDirectory = resolve(publicDirectoryArg);
const basePath = `/${basePathArg.replace(/^\/+|\/+$/g, "")}`;

if (!existsSync(exportDirectory) || !existsSync(publicDirectory)) {
  console.error("Export or public directory does not exist.");
  process.exit(1);
}

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

const assetPaths = walk(publicDirectory)
  .map((filePath) => relative(publicDirectory, filePath).split(sep).join("/"))
  .sort((left, right) => right.length - left.length);

const exportedTextFiles = walk(exportDirectory).filter((filePath) =>
  textExtensions.has(extname(filePath).toLowerCase()),
);

const delimiters = ['"', "'", "`", "(", "="];
let changedFiles = 0;
let replacements = 0;

for (const filePath of exportedTextFiles) {
  const original = readFileSync(filePath, "utf8");
  let updated = original;

  for (const assetPath of assetPaths) {
    const variants = new Set([assetPath, encodeURI(assetPath)]);

    for (const variant of variants) {
      for (const delimiter of delimiters) {
        const search = `${delimiter}/${variant}`;
        const replacement = `${delimiter}${basePath}/${variant}`;
        const occurrences = updated.split(search).length - 1;

        if (occurrences > 0) {
          updated = updated.split(search).join(replacement);
          replacements += occurrences;
        }
      }
    }
  }

  if (updated !== original) {
    writeFileSync(filePath, updated);
    changedFiles += 1;
  }
}

console.log(
  `Rebased ${replacements} static asset references across ${changedFiles} files to ${basePath}.`,
);
