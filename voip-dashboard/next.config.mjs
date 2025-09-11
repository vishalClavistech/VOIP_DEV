/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // enables static export build
  assetPrefix: '/voip/',
  images: {
    unoptimized: true // needed if you use <Image> component
  },
  basePath: '/voip',
  reactStrictMode: true,
  experimental: {
    instrumentationHook: false
  }
}

export default nextConfig