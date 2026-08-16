import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export → deployable as a Render Static Site (no server needed).
  output: "export",
  images: { unoptimized: true },
  // Pin the workspace root to this project (a stray lockfile exists in the
  // parent home directory, which otherwise confuses Next's root inference).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
