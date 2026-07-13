import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";

const [archiveDirectoryArg, basePathArg] = process.argv.slice(2);

if (!archiveDirectoryArg || !basePathArg) {
  console.error(
    "Usage: node scripts/verify-static-archive.mjs <archive-directory> </base-path>",
  );
  process.exit(1);
}

const archiveDirectory = resolve(archiveDirectoryArg);
const basePath = `/${basePathArg.replace(/^\/+|\/+$/g, "")}`;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function targetFor(reference) {
  const withoutQuery = reference.split(/[?#]/, 1)[0];
  const archiveRelative = decodeURI(withoutQuery.slice(basePath.length)).replace(
    /^\/+/,
    "",
  );

  if (!archiveRelative || archiveRelative.endsWith("/")) {
    return join(archiveDirectory, archiveRelative, "index.html");
  }

  return join(archiveDirectory, archiveRelative);
}

const checkedFiles = walk(archiveDirectory).filter((filePath) =>
  new Set([".css", ".html", ".webmanifest"]).has(
    extname(filePath).toLowerCase(),
  ),
);

const localReferences = [];

for (const filePath of checkedFiles) {
  const contents = readFileSync(filePath, "utf8");
  const patterns = [
    /(?:href|src)=["']([^"']+)["']/g,
    /url\(["']?([^)'"\s]+)["']?\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of contents.matchAll(pattern)) {
      const reference = match[1];

      if (reference.startsWith("/")) {
        localReferences.push({
          file: relative(archiveDirectory, filePath).split(sep).join("/"),
          reference,
        });
      }
    }
  }
}

const escapedReferences = localReferences.filter(
  ({ reference }) =>
    reference !== basePath && !reference.startsWith(`${basePath}/`),
);

const missingTargets = localReferences
  .filter(
    ({ reference }) =>
      reference === basePath || reference.startsWith(`${basePath}/`),
  )
  .map((entry) => ({ ...entry, target: targetFor(entry.reference) }))
  .filter(({ target }) => !existsSync(target));

if (escapedReferences.length || missingTargets.length) {
  console.error(
    JSON.stringify({ escapedReferences, missingTargets }, null, 2),
  );
  process.exit(1);
}

console.log(
  `Verified ${localReferences.length} local references across ${checkedFiles.length} archive files.`,
);
