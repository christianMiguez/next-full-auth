/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverActions: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/tasks",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
