/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/Images/**',
      },
      {
        protocol: 'https',
        hostname: 'institute-backend-production.up.railway.app',
        pathname: '/Images/**',
      },
    ],
  },
};

export default nextConfig;