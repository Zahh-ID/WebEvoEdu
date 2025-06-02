
import type {NextConfig} from 'next';

const repoName = process.env.GITHUB_PAGES_REPO_NAME || 'WebEvoEdu';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  output: 'export', // Mengaktifkan static HTML export
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
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
    unoptimized: true, // Penting untuk static export agar next/image berfungsi
  },
};

export default nextConfig;
