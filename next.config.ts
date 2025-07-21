import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devServer: {
    // This is necessary to allow the Next.js dev server to be accessed from the Firebase Studio preview.
    // In a future version of Next.js, this will be required.
    allowedHosts: "all",
  }
};

export default nextConfig;
