import QueryProvider from '@/src/lib/QueryProvider'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Nunito, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
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
									'border border-border-main rounded-xl p-4 shadow-lg text-sm font-semibold transition-all duration-300 backdrop-blur-md',
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
