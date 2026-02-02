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
  // Enable API routes
  experimental: {
    appDir: true,
  },
  // Custom webpack configuration if needed
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
