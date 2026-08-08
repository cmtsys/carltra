import type { NextConfig } from "next";
import { execSync } from "child_process";

function git(command: string) {
  try {
    return execSync(command).toString().trim();
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_VERSION: "v0.8.7",
    NEXT_PUBLIC_COMMIT_HASH: git("git rev-parse --short HEAD"),
    NEXT_PUBLIC_COMMIT_DATE: git("git log -1 --format=%cI"),
  },
};

export default nextConfig;