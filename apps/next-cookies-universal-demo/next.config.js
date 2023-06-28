/* eslint-disable no-undef */
/* @ts-check */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @see https://nextjs.org/docs/api-reference/next.config.js/introduction */
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-cookies-universal'],
  experimental: {
    serverActions: true
  }
};
