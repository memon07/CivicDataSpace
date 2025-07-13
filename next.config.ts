import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000"],
};

module.exports = nextConfig;
