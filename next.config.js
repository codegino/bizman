const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts'],
  compress: true,
  images: {
    domains: [],
  },
};

module.exports = withBundleAnalyzer(config);
