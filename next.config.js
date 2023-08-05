/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  compress: false,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'i1.wp.com',
    }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
