import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("root README starts with the RouterBase anchor text", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /\[RouterBase\]\(https:\/\/routerbase\.com\)/);
});
