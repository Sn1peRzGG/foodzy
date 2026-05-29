'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/src/hooks/useUser'
import { UserType } from '@/src/types/user'
import { Trash2, ShoppingCart, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Loading from '../../loading'
import Link from 'next/link'
import { useUserActions } from '@/src/hooks/useUserActions'

export default function WishlistPage() {
	const [mounted, setMounted] = useState(false)
	const { user, isLoading, loadingStates, toggleWishlist, addToCart } =
		useUserActions()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	if (isLoading) return <Loading />

	return (
		<div className='container-responsive p-6'>
			<h1 className='text-2xl font-bold mb-6'>My Wishlist</h1>

			{user?.wishlist && user.wishlist.length > 0 ? (
				<table className='w-full text-[#444444] border-collapse table-fixed'>
					<thead>
						<tr className='bg-[#E9E9E9] text-[15px] font-semibold'>
							<th className='py-4 pl-4 text-left rounded-tl-[5px] w-[40%]'>
								Product
							</th>
							<th className='py-4 text-center w-[15%]'>Price</th>
							<th className='py-4 text-center w-[20%]'>Stock Status</th>
							<th className='py-4 text-center rounded-tr-[5px] w-[25%]'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-[#E9E9E9]'>
						{user.wishlist.map(product => (
							<tr key={product._id} className='bg-[#F7F7F8]'>
								<td className='py-4 px-4 flex flex-row items-center overflow-hidden'>
									<div className='relative w-15 h-15 border border-[#E9E9E9] rounded-[5px] overflow-hidden bg-white shrink-0'>
										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
											alt={product.name}
											fill
											className='object-contain p-1 pointer-events-none'
											unoptimized
										/>
									</div>
									<Link
										href={`/products/${product.productId}`}
										className='ml-5 font-medium truncate hover:text-primary'
									>
										{product.name}
									</Link>
								</td>

								<td className='py-6 text-center tabular-nums font-semibold text-black'>
									${product.price.toFixed(2)}
								</td>

								<td className='py-6 text-center'>
									{product.isAvailable ? (
										<span className='text-sm text-green-600 bg-green-50 px-2 py-1 rounded'>
											In Stock
										</span>
									) : (
										<span className='text-sm text-red-600 bg-red-50 px-2 py-1 rounded'>
											Out of Stock
										</span>
									)}
								</td>

								<td className='py-6 text-center'>
									<div className='flex items-center justify-center gap-2'>
										<button
											disabled={!!loadingStates[product._id]}
											onClick={() =>
												addToCart(product._id, 1, product.isAvailable)
											}
											className={`p-2 rounded-full transition-colors ${
												loadingStates[product._id] === 'cart'
													? 'text-primary bg-primary/10 opacity-70 cursor-not-allowed'
													: 'text-gray-400 hover:text-primary hover:bg-primary/10 cursor-pointer'
											}`}
										>
											{loadingStates[product._id] === 'cart' ? (
												<Loader2 size={18} className='animate-spin' />
											) : (
												<ShoppingCart size={18} />
											)}
										</button>
										<button
											disabled={!!loadingStates[product._id]}
											onClick={() => toggleWishlist(product._id)}
											className={`p-2 rounded-full transition-colors ${
												loadingStates[product._id] === 'wishlist'
													? 'text-red-500 bg-red-500/10 opacity-70 cursor-not-allowed'
													: 'text-gray-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer'
											}`}
										>
											{loadingStates[product._id] === 'wishlist' ? (
												<Loader2 size={18} className='animate-spin' />
											) : (
												<Trash2 size={18} />
											)}
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className='border border-dashed border-gray-200 rounded-xl py-20 text-center'>
					<p className='text-gray-500'>Your wishlist is currently empty.</p>
				</div>
			)}
		</div>
	)
}
