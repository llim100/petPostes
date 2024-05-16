/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'energized-echidna-940.convex.cloud',
        port: '',
      },
    ],
  },
};

export default nextConfig;

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         hostname: 'energized-echidna-940.convex.cloud',
//       },
//     ],
//   },
// };
