import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://bhb-frontend.bhbcdn.com/**')],
  },
};

export default nextConfig;
