/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Proper output for Vercel
  output: 'standalone',
  // Handle images properly
  images: {
    unoptimized: true,
  },
  // Ensure proper base path handling
  basePath: '',
  assetPrefix: undefined,
  // Remove deprecated experimental.appDir - it's default in Next.js 14
  // webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  }
}

module.exports = nextConfig