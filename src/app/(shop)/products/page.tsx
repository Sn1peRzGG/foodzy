'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import ProductCard from '@/src/components/ui/ProductCard'
import api from '@/src/lib/api'
import { ProductType } from '@/src/types/product'

export default function ProductsPage() {
	const searchParams = useSearchParams()

	const searchQuery = searchParams.get('search')
	const searchCategory = searchParams.get('category') || 'All Categories'

	const {
		data: products = [],
		isLoading,
		error,
	} = useQuery<ProductType[]>({
		queryKey: ['products', searchQuery, searchCategory],

		queryFn: async () => {
			const res = await api.get('/products/search', {
				params: {
					name: searchQuery || undefined,
					category:
						searchCategory === 'All Categories' ? undefined : searchCategory,
				},
			})

			return res.data
		},
	})

	if (error) {
		return (
			<div className='w-full flex items-center justify-center py-20'>
				<p className='text-red-500'>Failed to load products.</p>
			</div>
		)
	}

	return (
		<div className='container-responsive'>
			<div className='mb-8 border-b border-gray-100 pb-4'>
				<h1 className='text-3xl font-black text-black'>
					{searchQuery ? `Results for "${searchQuery}"` : 'Our Products'}
				</h1>

				<p className='text-sm text-gray-500 mt-1'>
					Category:{' '}
					<span className='font-semibold text-primary'>{searchCategory}</span> –
					Found {products.length} items
				</p>
			</div>

			{isLoading ? (
				<div className='text-center py-20 text-gray-500'>
					Loading products...
				</div>
			) : products.length === 0 ? (
				<div className='text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200'>
					<p className='text-gray-500 text-lg'>
						We couldn't find anything matching your request.
					</p>

					<Link
						href='/'
						className='text-primary font-semibold mt-2 inline-block hover:underline'
					>
						Go back home
					</Link>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 [screen-and-(min-width:1800px)]:grid-cols-5 gap-6'>
					{products.map(product => (
						<ProductCard key={product.productId} {...product} />
					))}
				</div>
			)}
		</div>
	)
}
