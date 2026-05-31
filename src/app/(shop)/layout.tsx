import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import Breadcrumbs from '@/src/components/ui/Breadcrumbs'
import ConfigButton from '@/src/components/ui/ConfigButton'
import ScrollToTop from '@/src/components/ui/ScrollToTop'
import { BreadcrumbsProvider } from '@/src/context/BreadcrumbsContext'

export default function ShopLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			<main className='flex-1 mt-24 xl:mt-36 bg-main-bg'>
				<BreadcrumbsProvider>
					<Breadcrumbs />
					{children}
					<ConfigButton />
					<ScrollToTop />
				</BreadcrumbsProvider>
			</main>
			<Footer />
		</>
	)
}
