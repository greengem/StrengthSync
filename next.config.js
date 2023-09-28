const { config } = require('dotenv');

config({ path: '.env.development.local' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
