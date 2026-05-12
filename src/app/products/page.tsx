'use client'

import products from '@/data/products.json'
import ProductCard from '@/src/components/ui/ProductCard'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
	const searchParams = useSearchParams()
	const searchQuery = searchParams.get('search')
	const searchCategory = searchParams.get('category') || 'All Categories'

	const [filteredProducts, setFilteredProducts] = useState(products)

	useEffect(() => {
		let baseProducts = products
		if (searchCategory !== 'All Categories') {
			baseProducts = products.filter(p => p.category === searchCategory)
		}

		if (searchQuery) {
			const fuse = new Fuse(baseProducts, {
				keys: ['name', 'description'],
				threshold: 0.4,
			})
			const results = fuse.search(searchQuery).map(res => res.item)
			setFilteredProducts(results)
		} else {
			setFilteredProducts(baseProducts)
		}
	}, [searchQuery, searchCategory])

	return (
		<div className='w-full flex flex-col items-center px-4 py-8'>
			<div className='w-full md:w-11/12 xl:w-4/5 3xl:w-2/3 4xl:w-1/2 max-w-400'>
				<div className='mb-8 border-b border-gray-100 pb-4'>
					<h1 className='text-3xl font-black text-black'>
						{searchQuery ? `Results for "${searchQuery}"` : 'Our Products'}
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Category:{' '}
						<span className='font-semibold text-[#64B496]'>
							{searchCategory}
						</span>{' '}
						– Found {filteredProducts.length} items
					</p>
				</div>

				{filteredProducts.length === 0 ? (
					<div className='text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200'>
						<p className='text-gray-500 text-lg'>
							We couldn't find anything matching your request.
						</p>
						<Link
							href='/'
							className='text-[#64B496] font-semibold mt-2 inline-block hover:underline'
						>
							Go back home
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 [screen-and-(min-width:1800px)]:grid-cols-5 gap-6'>
						{filteredProducts.map(product => (
							<ProductCard key={product.productId} {...product} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
