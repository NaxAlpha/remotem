import { enableTailwind } from "@remotion/tailwind-v4";

/**
 *  @param {import('webpack').Configuration} currentConfig
 */
export const webpackOverride = (currentConfig) => {
  // Apply Tailwind
  const withTailwind = enableTailwind(currentConfig);
  
  // Enhance HMR configuration
  return {
    ...withTailwind,
    optimization: {
      ...withTailwind.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      realContentHash: false,
    },
    cache: {
      ...withTailwind.cache,
      type: 'filesystem',
      buildDependencies: {
        ...(withTailwind.cache?.buildDependencies || {}),
        config: [import.meta.url],
      },
    },
    // Improve module resolution
    resolve: {
      ...withTailwind.resolve,
      fallback: {
        ...(withTailwind.resolve?.fallback || {}),
        fs: false,
        path: false,
      },
    },
  };
};
