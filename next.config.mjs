/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = { 
        ...config.resolve.fallback,
        fs: false 
      };
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    }
  };
  
  export default nextConfig;