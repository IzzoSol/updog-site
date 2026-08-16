#!/usr/bin/env node
/**
 * bg-remove.mjs — remove the background from a local image via fal.ai, save PNG
 * with transparency to public/assets/brand/. Reads FAL_KEY from .env.local.
 *
 * Usage: node scripts/bg-remove.mjs --in public/assets/brand/updog-banner.png --out updog-wordmark
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

async function loadEnv() {
  const p = join(ROOT, ".env.local");
  if (!existsSync(p)) return;
  for (const line of (await readFile(p, "utf8")).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
function parseArgs(a) { const o = {}; for (let i = 0; i < a.length; i++) if (a[i].startsWith("--")) o[a[i].slice(2)] = a[++i]; return o; }

async function main() {
  await loadEnv();
  const key = process.env.FAL_KEY;
  const args = parseArgs(process.argv.slice(2));
  if (!key) throw new Error("FAL_KEY missing");
  if (!args.in || !args.out) throw new Error("need --in <path> --out <basename>");

  const buf = await readFile(join(ROOT, args.in));
  const dataUri = `data:image/png;base64,${buf.toString("base64")}`;
  console.log("▲ removing background via fal…");
  const res = await fetch("https://fal.run/fal-ai/imageutils/rembg", {
    method: "POST",
    headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: dataUri }),
  });
  if (!res.ok) throw new Error(`fal ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const url = data.image?.url || data.images?.[0]?.url;
  if (!url) throw new Error("no image url in response: " + JSON.stringify(data).slice(0, 200));

  const outDir = join(ROOT, "public", "assets", "brand");
  await mkdir(outDir, { recursive: true });
  const out = join(outDir, `${args.out}.png`);
  const bin = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(out, bin);
  console.log(`✓ Saved ${out} (${(bin.length / 1024).toFixed(0)} KB)`);
}
main().catch((e) => { console.error("✗", e.message); process.exit(1); });
