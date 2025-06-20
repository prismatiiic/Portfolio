/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Portfolio' : undefined,
  assetPrefix: isProd ? '/Portfolio' : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/Portfolio' : '',
  },
};

export default nextConfig; 