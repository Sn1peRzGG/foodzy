import QueryProvider from '@/src/lib/QueryProvider'
import type { Metadata } from 'next'
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
		<html lang='en' className='h-full'>
			<body
				className={`${poppins.variable} ${nunito.variable} min-h-screen flex flex-col antialiased`}
			>
				<QueryProvider>
					<Toaster
						position='top-right'
						toastOptions={{
							className:
								'border border-gray-100 rounded-xl p-4 bg-white shadow-md text-sm font-medium text-black transition-all duration-300',
							style: {
								background: '#ffffff',
								color: '#000000',
								border: '1px solid #f3f4f6',
								padding: '16px',
								borderRadius: '0.75rem',
								boxShadow:
									'0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
							},
							success: {
								iconTheme: {
									primary: 'var(--primary, #10B981)',
									secondary: '#ffffff',
								},
							},
							error: {
								iconTheme: {
									primary: '#ef4444',
									secondary: '#ffffff',
								},
							},
						}}
					/>
					{children}
				</QueryProvider>
			</body>
		</html>
	)
}
