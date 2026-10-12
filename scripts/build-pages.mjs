import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const result = spawnSync("pnpm", ["exec", "vite", "build"], {
  cwd: root,
  env: { ...process.env, GITHUB_PAGES: "true", PAGES_BASE_PATH: "/victorrobertbooksagency.kesug.com/" },
  stdio: "inherit",
});

if (result.status !== 0) process.exit(result.status ?? 1);

const output = resolve(root, "dist/public");
mkdirSync(output, { recursive: true });
copyFileSync(resolve(output, "index.html"), resolve(output, "404.html"));
writeFileSync(resolve(output, ".nojekyll"), "\n");
console.log("GitHub Pages output ready at dist/public");
