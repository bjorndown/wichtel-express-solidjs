import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";

const config = process.env.VERCEL ? { adapter: vercel() } : undefined;

export default defineConfig({
  plugins: [solid({ ssr: false, ...config })],
});
