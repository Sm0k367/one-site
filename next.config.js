/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure proper static export for Vercel
  output: 'standalone',
  // Handle images properly
  images: {
    unoptimized: true,
  },
  // Ensure proper base path handling
  basePath: '',
  assetPrefix: undefined,
}

module.exports = nextConfig
