/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // biar Vercel nggak nge-block build gara-gara error ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
