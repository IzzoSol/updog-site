#!/usr/bin/env node
/**
 * meshy-generate.mjs — server-side Meshy text-to-3D asset generator for UPDOG.
 *
 * Generates a GLB (preview → refine with PBR) and saves it to
 * public/assets/models/<name>.glb so it can be dropped into an R3F scene
 * (e.g. 3D clouds, cinematic props, or the dog mascot's `glbUrl`).
 *
 * The API key is read from .env.local (MESHY_API_KEY) and used server-side only.
 * Nothing here ever ships to the browser.
 *
 * Usage:
 *   node scripts/meshy-generate.mjs --name cloud-01 --prompt "a fluffy stylized
 *     cartoon cloud, soft rounded volumes, clean low-poly, bright white with soft
 *     blue underside, game-ready, pastel sky aesthetic"
 *   node scripts/meshy-generate.mjs --name updog-dog --style realistic --prompt "..."
 *
 * Flags:
 *   --name    output basename (required)         --prompt  text prompt (required)
 *   --style   realistic | sculpture (def realistic)
 *   --poly    target polycount (def 30000)       --no-refine  skip the refine pass
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.meshy.ai/openapi/v2/text-to-3d";

/** Minimal .env.local loader (avoids a dotenv dependency). */
async function loadEnv() {
  const p = join(ROOT, ".env.local");
  if (!existsSync(p)) return;
  const text = await readFile(p, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--no-refine") args.refine = false;
    else if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function meshy(path, opts, key) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Meshy ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function poll(id, key, label) {
  const start = Date.now();
  for (;;) {
    const t = await meshy(`/${id}`, { method: "GET" }, key);
    process.stdout.write(`\r  ${label}: ${t.status} ${t.progress ?? 0}%   `);
    if (t.status === "SUCCEEDED") { process.stdout.write("\n"); return t; }
    if (t.status === "FAILED" || t.status === "EXPIRED") throw new Error(`${label} ${t.status}: ${t.task_error?.message || ""}`);
    if (Date.now() - start > 10 * 60 * 1000) throw new Error(`${label} timed out`);
    await sleep(5000);
  }
}

async function main() {
  await loadEnv();
  const key = process.env.MESHY_API_KEY;
  const args = parseArgs(process.argv.slice(2));

  if (!key) {
    console.error("✗ MESHY_API_KEY is not set. Add it to .env.local first (and rotate any key that was shared in chat).");
    process.exit(1);
  }
  if (!args.name || !args.prompt) {
    console.error("✗ Missing --name and/or --prompt. See the header of this file for usage.");
    process.exit(1);
  }

  console.log(`▲ Generating "${args.name}" …`);
  const preview = await meshy("", {
    method: "POST",
    body: JSON.stringify({
      mode: "preview",
      prompt: args.prompt,
      art_style: args.style || "realistic",
      should_remesh: true,
      target_polycount: Number(args.poly) || 30000,
    }),
  }, key);
  const previewId = preview.result;
  await poll(previewId, key, "preview");

  let finalId = previewId;
  if (args.refine !== false) {
    const refine = await meshy("", {
      method: "POST",
      body: JSON.stringify({ mode: "refine", preview_task_id: previewId, enable_pbr: true }),
    }, key);
    finalId = refine.result;
    await poll(finalId, key, "refine");
  }

  const done = await meshy(`/${finalId}`, { method: "GET" }, key);
  const glbUrl = done.model_urls?.glb;
  if (!glbUrl) throw new Error("No GLB in model_urls");

  const outDir = join(ROOT, "public", "assets", "models");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, `${args.name}.glb`);
  const bin = Buffer.from(await (await fetch(glbUrl)).arrayBuffer());
  await writeFile(outPath, bin);

  console.log(`✓ Saved ${outPath} (${(bin.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`  Use it via /assets/models/${args.name}.glb in an R3F scene or MascotPlaceholder glbUrl.`);
}

main().catch((e) => { console.error("\n✗", e.message); process.exit(1); });
