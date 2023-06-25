/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CURRENT_USER_CONTEXT_KEY: 'CURRENT_USER_CONTEXT',
    DEFAULT_LANGUAGE_KEY: 'DEFAULT_LANGUAGE',
  },
};

module.exports = nextConfig;
