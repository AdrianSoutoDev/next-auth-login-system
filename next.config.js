/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const i18n ={
   locales: ['en-US', 'es-ES'],
   defaultLocale: 'en-US',
 }

module.exports = {
  nextConfig,
  i18n
}

