import { readFile } from "node:fs/promises";

const requiredFiles = [
  "README.md",
  "packages/python-routerbase/README.md",
  "packages/jsr-routerbase/README.md",
  "examples/docker/README.md"
];

const requiredAnchor = "[RouterBase](https://routerbase.com)";

for (const file of requiredFiles) {
  const text = await readFile(new URL(`../${file}`, import.meta.url), "utf8");

  if (!text.includes(requiredAnchor)) {
    throw new Error(`${file} is missing ${requiredAnchor}`);
  }
}

console.log(`Verified ${requiredFiles.length} RouterBase links.`);
