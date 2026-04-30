import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import { Nunito, Poppins } from 'next/font/google'
import './globals.css'

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
	title: 'Foodzy',
	description: 'A Treasure of Tastes',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='h-full'>
			<body
				className={`${poppins.variable} ${nunito.variable} min-h-full flex flex-col antialiased`}
			>
				<Header />
				<main className='grow mt-36'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
