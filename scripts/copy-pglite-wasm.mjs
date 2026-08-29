import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

/** Sandbox production preview has no DATABASE_URL, so PGLite must find its wasm. */
const dist = join("node_modules/@electric-sql/pglite/dist");
const dests = [
  join(".vercel/output/functions/__server.func/_libs"),
  join(".vercel/output/functions/__server.func"),
];
const files = ["pglite.data", "pglite.wasm", "initdb.wasm"];

for (const dest of dests) {
  if (!existsSync(dest)) continue;
  mkdirSync(dest, { recursive: true });
  for (const f of files) {
    const src = join(dist, f);
    if (existsSync(src)) copyFileSync(src, join(dest, f));
  }
}
