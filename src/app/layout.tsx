import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import type { Metadata } from 'next'
import { Nunito, Poppins } from 'next/font/google'
import './globals.css'
import Breadcrumbs from '@/src/components/ui/Breadcrumbs'
import { prisma } from '@/prisma/prisma'

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const products = await prisma.product.findMany()
	const categories = await prisma.category.findMany()

	return (
		<html lang='en' className='h-full'>
			<body
				className={`${poppins.variable} ${nunito.variable} min-h-full flex flex-col antialiased`}
			>
				<Header products={products} categories={categories} />
				<main className='grow mt-24 xl:mt-36 flex flex-col min-h-screen'>
					<Breadcrumbs />
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}
