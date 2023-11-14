/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
