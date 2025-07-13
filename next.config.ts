import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000"],
  // [env.REPLIT_DOMAINS.split(",")[0]],
};

module.exports = nextConfig;
