/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.imgur.com", "i.scdn.co", "mosaic.scdn.co"],
  },
};

module.exports = nextConfig;
