#!/usr/bin/env node
/**
 * gen-image.mjs — text-to-image for UPDOG art (clouds, arrows, backgrounds).
 * Tries Hugging Face FLUX first (rotating HF_TOKENS), falls back to fal.ai FLUX.
 * Saves a PNG to public/assets/gen/<name>.png. Keys read from .env.local (server-side).
 *
 * Usage:
 *   node scripts/gen-image.mjs --name hero-sky --ratio landscape_16_9 --prompt "…"
 *   --ratio: landscape_16_9 | portrait_9_16 | square_hd (fal names)  (def landscape_16_9)
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

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith("--")) a[argv[i].slice(2)] = argv[++i];
  return a;
}

const RATIO_DIMS = {
  landscape_16_9: [1216, 684],
  portrait_9_16: [684, 1216],
  square_hd: [1024, 1024],
};

async function tryHF(prompt, ratio) {
  const tokens = (process.env.HF_TOKENS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const [width, height] = RATIO_DIMS[ratio] || RATIO_DIMS.landscape_16_9;
  for (const token of tokens) {
    try {
      const res = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "image/png" },
        body: JSON.stringify({ inputs: prompt, parameters: { width, height } }),
      });
      if (res.ok) {
        const ct = res.headers.get("content-type") || "";
        if (ct.startsWith("image/")) return Buffer.from(await res.arrayBuffer());
      }
      console.log(`  HF token …${token.slice(-4)} → ${res.status}, trying next`);
    } catch (e) {
      console.log(`  HF token …${token.slice(-4)} error: ${e.message}`);
    }
  }
  return null;
}

async function tryFal(prompt, ratio, w, h) {
  const key = process.env.FAL_KEY;
  if (!key) return null;
  const image_size = w && h ? { width: Number(w), height: Number(h) } : ratio || "landscape_16_9";
  const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, image_size, num_inference_steps: 4, num_images: 1 }),
  });
  if (!res.ok) throw new Error(`fal ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const url = data.images?.[0]?.url;
  if (!url) throw new Error("fal: no image url");
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

async function main() {
  await loadEnv();
  const args = parseArgs(process.argv.slice(2));
  if (!args.name || !args.prompt) {
    console.error("✗ Missing --name and/or --prompt");
    process.exit(1);
  }
  const ratio = args.ratio || "landscape_16_9";
  console.log(`▲ Generating image "${args.name}" (${ratio})…`);

  let bin = await tryHF(args.prompt, ratio);
  let via = "HF FLUX.1-schnell";
  if (!bin) {
    console.log("  HF unavailable — falling back to fal.ai");
    bin = await tryFal(args.prompt, ratio, args.width, args.height);
    via = "fal.ai FLUX schnell";
  }
  if (!bin) throw new Error("No image produced by any provider");

  const outDir = join(ROOT, "public", "assets", "gen");
  await mkdir(outDir, { recursive: true });
  const out = join(outDir, `${args.name}.png`);
  await writeFile(out, bin);
  console.log(`✓ Saved ${out} (${(bin.length / 1024).toFixed(0)} KB) via ${via}`);
}

main().catch((e) => { console.error("✗", e.message); process.exit(1); });
