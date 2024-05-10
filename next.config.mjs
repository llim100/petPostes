/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'energized-echidna-940.convex.cloud',
      },
    ],
  },
};

export default nextConfig;
