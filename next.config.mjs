/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 🌟 FIX: Allow Next.js to process images hosted on your local computer's private IP
    dangerouslyAllowLocalIP: true, 
    
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/Images/**',
      },
      {
        protocol: 'https',
        hostname: 'api.yourdomain.com', 
        pathname: '/Images/**',
      },
    ],
  },
};

export default nextConfig;