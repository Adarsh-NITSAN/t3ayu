/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "https://t3ayu.thebetaspace.com/",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "https://t3-reva.t3planet.com/",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/t3-ayu/:path*",
        destination: "/:path*",
        permanent: false,
      },
      //   {
      //     source: "/t3-ayu",
      //     destination: "/",
      //     permanent: false,
      //   },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
