// @ts-check

/** @type {import('next').NextConfig} **/
const NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'http://localhost:3000',
  ],
  output: 'standalone',
  compiler: {
    styledComponents: {
      minify: true,
    },
  },
}

module.exports = NextConfig
