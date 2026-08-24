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
				<div className='overflow-x-auto rounded-xl border border-border-main shadow-sm bg-card-bg'>
					<table className='w-full text-text-muted border-collapse table-fixed min-w-150'>
						<thead>
							<tr className='bg-ui-hover text-[14px] font-semibold text-text-muted uppercase tracking-wider border-b border-border-main'>
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
						<tbody className='divide-y divide-border-main'>
							{user.wishlist.map(product => (
								<tr
									key={product._id}
									className='hover:bg-ui-hover/30 transition-colors'
								>
									<td className='py-5 px-6 flex flex-row items-center overflow-hidden'>
										<div className='relative w-16 h-16 border border-border-main rounded-lg overflow-hidden bg-main-bg shrink-0 shadow-sm'>
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
											className='ml-5 font-semibold text-text-main truncate hover:text-primary transition-colors'
										>
											{product.name}
										</Link>
									</td>

									<td className='py-5 text-center tabular-nums font-semibold text-text-main'>
										${product.price.toFixed(2)}
									</td>

									<td className='py-5 text-center'>
										{product.isAvailable ? (
											<span className='inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-500/10 dark:bg-green-500/20 px-3 py-1 rounded-md border border-green-500/20'>
												<span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
												In Stock
											</span>
										) : (
											<span className='inline-flex items-center gap-1.5 text-xs font-bold text-accent bg-accent/10 dark:bg-accent/20 px-3 py-1 rounded-md border border-accent/20'>
												<span className='w-1.5 h-1.5 rounded-full bg-accent' />
												Out of Stock
											</span>
										)}
									</td>

									<td className='py-5 text-center'>
										<div className='flex items-center justify-center gap-2.5'>
											<button
												disabled={!!loadingStates[product._id]}
												onClick={() =>
													addToCart(product._id, 1, product.isAvailable)
												}
												className={`p-2 rounded-lg border transition-all duration-200 ${
													loadingStates[product._id] === 'cart'
														? 'text-primary border-primary/20 bg-primary/10 opacity-70 cursor-not-allowed'
														: 'text-text-subtle border-border-main bg-card-bg hover:text-primary hover:border-primary/30 hover:bg-primary/5 cursor-pointer active:scale-95 shadow-sm'
												}`}
												title='Add to Cart'
											>
												{loadingStates[product._id] === 'cart' ? (
													<Loader2 size={16} className='animate-spin' />
												) : (
													<ShoppingCart size={16} />
												)}
											</button>

											<button
												disabled={!!loadingStates[product._id]}
												onClick={() => toggleWishlist(product._id)}
												className={`p-2 rounded-lg border transition-all duration-200 ${
													loadingStates[product._id] === 'wishlist'
														? 'text-accent border-accent/20 bg-accent/10 opacity-70 cursor-not-allowed'
														: 'text-text-subtle border-border-main bg-card-bg hover:text-accent hover:border-accent/30 hover:bg-accent/5 cursor-pointer active:scale-95 shadow-sm'
												}`}
												title='Remove from Wishlist'
											>
												{loadingStates[product._id] === 'wishlist' ? (
													<Loader2 size={16} className='animate-spin' />
												) : (
													<Trash2 size={16} />
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
				<div className='border-2 border-dashed border-border-main rounded-2xl py-24 px-4 text-center max-w-md mx-auto mt-12 bg-card-bg shadow-sm'>
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
						className='inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all shadow-sm active:scale-95'
					>
						Discover Products
					</Link>
				</div>
			)}
		</div>
	)
}
