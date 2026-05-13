import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import Breadcrumbs from '@/src/components/ui/Breadcrumbs'
import type { Metadata } from 'next'
import { Nunito, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '../lib/QueryProvider'
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
				className={`${poppins.variable} ${nunito.variable} min-h-screen flex flex-col antialiased `}
			>
				<QueryProvider>
					<Toaster position='top-center' />
					<Header />
					<main className='flex-1 mt-24 xl:mt-36 bg-[#f8fafc]'>
						<Breadcrumbs />
						{children}
					</main>
					<Footer />
				</QueryProvider>
			</body>
		</html>
	)
}
