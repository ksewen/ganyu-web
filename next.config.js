/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CURRENT_USER_CONTEXT_KEY: 'CURRENT_USER_CONTEXT',
    DEFAULT_LANGUAGE_KEY: 'DEFAULT_LANGUAGE',
    DEFAULT_SHOPPING_LIST_PAGE_SIZE: 9,
  },
};

module.exports = nextConfig;
