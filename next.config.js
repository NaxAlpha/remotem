/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // Add specific configurations for Remotion HMR
    if (dev && !isServer) {
      // Improve HMR for Remotion components
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        realContentHash: false,
      };
      
      // Improve module resolution
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
