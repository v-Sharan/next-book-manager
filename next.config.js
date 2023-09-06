const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mysql2"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imageio.forbes.com",
      },
      {
        protocol: "https",
        hostname: "d3i5mgdwi2ze58.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
