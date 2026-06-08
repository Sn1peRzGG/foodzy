import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://foodzy-wheat.vercel.app'

	const staticRoutes = [
		'',
		'/about',
		'/blog',
		'/faq',
		'/login',
		'/signup',
		'/products',
	]

	const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === '' || route === '/products' ? 'daily' : 'weekly',
		priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.7,
	}))

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
		if (res.ok) {
			const products = await res.json()
			if (Array.isArray(products)) {
				products.forEach((product: { id: string | number }) => {
					sitemapEntries.push({
						url: `${baseUrl}/products/${product.id}`,
						lastModified: new Date(),
						changeFrequency: 'weekly',
						priority: 0.8,
					})
				})
			}
		}
	} catch (error) {
		console.log(error)
	}

	return sitemapEntries
}
