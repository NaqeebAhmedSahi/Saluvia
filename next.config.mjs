/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // disables double render in dev

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // your dev server port
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
