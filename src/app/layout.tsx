import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Nunito, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import QueryProvider from '../lib/QueryProvider'

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const nunito = Nunito({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
	variable: '--font-nunito',
})

export const metadata: Metadata = {
	title: {
		default: 'Foodzy | A Treasure of Tastes - Online Food Delivery',
		template: '%s | Foodzy',
	},
	description:
		'Order super delicious meals, premium products, and fresh groceries online from Foodzy. Fast delivery, wishlist, and best tastes in town!',
	keywords: [
		'food delivery',
		'online shop',
		'order food',
		'grocery store',
		'delicious meals',
		'Foodzy',
	],
	authors: [{ name: 'Foodzy Team' }],
	metadataBase: new URL('https://foodzy-wheat.vercel.app'),
	openGraph: {
		title: 'Foodzy | A Treasure of Tastes',
		description:
			'Order super delicious meals, premium products, and fresh groceries online.',
		url: 'https://foodzy-wheat.vercel.app',
		siteName: 'Foodzy',
		images: [
			{
				url: '/banner2.png',
				width: 1200,
				height: 630,
				alt: 'Foodzy - Online Food Store',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='h-full' suppressHydrationWarning>
			<body
				className={`${poppins.variable} ${nunito.variable} min-h-screen flex flex-col antialiased`}
			>
				<QueryProvider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<Toaster
							position='top-right'
							toastOptions={{
								className:
									'border border-border-main rounded-xl p-4 shadow-lg text-sm font-semibold transition-all duration-200 backdrop-blur-md',
								style: {
									background: 'var(--color-card-bg)',
									color: 'var(--color-text-main)',
								},
								success: {
									iconTheme: {
										primary: 'var(--color-primary)',
										secondary: 'var(--color-card-bg)',
									},
								},
								error: {
									iconTheme: {
										primary: 'var(--color-accent)',
										secondary: 'var(--color-card-bg)',
									},
								},
							}}
						/>
						{children}
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
