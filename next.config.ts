import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		qualities: [25, 50, 75, 90],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				port: '',
				pathname: '/api/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5555',
				pathname: '/**',
			},
		],
	},
	allowedDevOrigins: ['192.168.0.93'],
}

export default nextConfig
