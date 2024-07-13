/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  // reactStrictMode:false,
  images: {
    domains: ["boring-avatars-api.vercel.app"]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    },
    urlImports: ["http://localhost:8080", "https://upload.cyber-luna.com"]
  }
};

export default nextConfig;