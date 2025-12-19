/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ytimg.com'],
    unoptimized: true,
  },
  // Ensure Tailwind CSS is processed
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig
