/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['api.sharpapi.com', 'sharpapi.com'],
    },
    experimental: {
      serverActions: {}, // Correct format for experimental flags
      turbo: {}         // Correct format for Turbopack
    }
  };
  
  export default nextConfig;