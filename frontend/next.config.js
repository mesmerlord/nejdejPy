/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @type {import('next').NextConfig}
 */
/* eslint-env es6 */
const nextTranslate = require('next-translate');
module.exports = nextTranslate({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputStandalone: true,
  },
});
