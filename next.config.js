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
    ],
  },
};

module.exports = nextConfig;
