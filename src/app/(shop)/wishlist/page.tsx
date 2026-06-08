'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { Heart, Loader2, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '../../loading'
import { BASE_URL } from '@/src/lib/api'

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
		<div className='container-responsive p-6 max-w-5xl mx-auto'>
			<h1 className='text-3xl font-extrabold mb-8 tracking-tight text-text-main'>
				My Wishlist
			</h1>

			{user?.wishlist && user.wishlist.length > 0 ? (
				<div className='overflow-x-auto rounded-xl border border-border-main shadow-sm'>
					<table className='w-full text-text-muted border-collapse table-fixed min-w-150'>
						<thead>
							<tr className='bg-ui-hover text-[15px] font-semibold text-text-muted'>
								<th className='py-4 pl-6 text-left rounded-tl-xl w-[40%]'>
									Product
								</th>
								<th className='py-4 text-center w-[15%]'>Price</th>
								<th className='py-4 text-center w-[20%]'>Stock Status</th>
								<th className='py-4 text-center rounded-tr-xl w-[25%]'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-[#E9E9E9]'>
							{user.wishlist.map(product => (
								<tr
									key={product._id}
									className='bg-main-bg hover:bg-main-bg transition-colors'
								>
									<td className='py-5 px-6 flex flex-row items-center overflow-hidden'>
										<div className='relative w-16 h-16 border border-border-main rounded-lg overflow-hidden bg-card-bg shrink-0 shadow-sm'>
											<Image
												src={`${BASE_URL}${product.imageUrl}`}
												alt={product.name}
												fill
												className='object-contain p-1 pointer-events-none'
												unoptimized
											/>
										</div>
										<Link
											href={`/products/${product._id}`}
											className='ml-5 font-semibold text-text-muted truncate hover:text-primary transition-colors'
										>
											{product.name}
										</Link>
									</td>

									<td className='py-5 text-center tabular-nums font-semibold text-text-main'>
										${product.price.toFixed(2)}
									</td>

									<td className='py-5 text-center'>
										{product.isAvailable ? (
											<span className='inline-flex items-center text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full'>
												In Stock
											</span>
										) : (
											<span className='inline-flex items-center text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full'>
												Out of Stock
											</span>
										)}
									</td>

									<td className='py-5 text-center'>
										<div className='flex items-center justify-center gap-3'>
											<button
												disabled={!!loadingStates[product._id]}
												onClick={() =>
													addToCart(product._id, 1, product.isAvailable)
												}
												className={`p-2.5 rounded-full transition-all duration-200 ${
													loadingStates[product._id] === 'cart'
														? 'text-primary bg-primary/10 opacity-70 cursor-not-allowed'
														: 'text-text-subtle hover:text-primary hover:bg-primary/10 cursor-pointer active:scale-95'
												}`}
												title='Add to Cart'
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
												className={`p-2.5 rounded-full transition-all duration-200 ${
													loadingStates[product._id] === 'wishlist'
														? 'text-red-500 bg-red-50 opacity-70 cursor-not-allowed'
														: 'text-text-subtle hover:text-red-600 hover:bg-red-50 cursor-pointer active:scale-95'
												}`}
												title='Remove from Wishlist'
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
				</div>
			) : (
				<div className='border-2 border-dashed border-border-main rounded-2xl py-24 px-4 text-center max-w-md mx-auto mt-12 bg-main-bg/50'>
					<div className='mx-auto w-16 h-16 bg-ui-hover rounded-full flex items-center justify-center text-text-subtle mb-4 shadow-sm'>
						<Heart size={28} />
					</div>
					<h3 className='text-lg font-bold text-text-main mb-1'>
						Your wishlist is empty
					</h3>
					<p className='text-text-muted text-sm mb-6 max-w-xs mx-auto'>
						Explore our collection and save your favorite items here.
					</p>
					<Link
						href='/products'
						className='inline-flex items-center justify-center bg-main-bg hover:bg-main-bg text-text-main font-medium text-sm py-2.5 px-6 rounded-xl transition-colors shadow-sm'
					>
						Discover Products
					</Link>
				</div>
			)}
		</div>
	)
}
