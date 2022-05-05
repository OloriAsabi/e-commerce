/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'imgix',
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig
