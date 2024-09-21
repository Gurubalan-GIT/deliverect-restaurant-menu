/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Extend Webpack config to handle SVGs
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // For SVG files
      use: ["@svgr/webpack"], // Use SVGR to transform SVGs into React components
    });

    return config;
  },

  // Add image domain configuration
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_CHATFOOD_CDN_URL).hostname],
  },
};

export default nextConfig;
