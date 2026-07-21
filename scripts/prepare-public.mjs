import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp"]);

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });

for (const file of ["index.html", "empresas.html", "style.css", "script.js"]) {
  await cp(join(root, file), join(publicDir, file));
}

await cp(join(root, "assets"), join(publicDir, "assets"), { recursive: true });
await mkdir(join(publicDir, "Cleytao Vans"), { recursive: true });

for (const entry of await readdir(join(root, "Cleytao Vans"), { withFileTypes: true })) {
  if (!entry.isFile() || !imageExtensions.has(extname(entry.name).toLowerCase())) {
    continue;
  }

  await cp(
    join(root, "Cleytao Vans", entry.name),
    join(publicDir, "Cleytao Vans", entry.name),
  );
}
