'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { BASE_URL } from '@/src/lib/api'
import { ProductType } from '@/src/types/product'
import { Heart, Loader2, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProductCardProps {
	product: ProductType
	viewMode?: 'grid' | 'list'
}

export default function ProductCard({
	product,
	viewMode = 'grid',
}: ProductCardProps) {
	const [mounted, setMounted] = useState(false)
	const { user, loadingStates, toggleWishlist, addToCart, removeFromCart } =
		useUserActions()

	useEffect(() => {
		setMounted(true)
	}, [])

	const targetId = String(product._id)

	const isInWishlist = user?.wishlist?.some(
		item => String(item._id) === targetId,
	)
	const isInCart = user?.cart?.some(
		item => String(item.product._id) === targetId,
	)

	const handleToggleWishlist = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		toggleWishlist(targetId)
	}

	const handleToggleCart = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (!product.isAvailable) return

		if (isInCart) {
			removeFromCart(targetId)
		} else {
			addToCart(targetId)
		}
	}

	if (!mounted) return null

	const discountPercent =
		product.oldPrice && product.isAvailable
			? Math.round(
					((product.oldPrice - product.price) / product.oldPrice) * 100,
				)
			: null

	if (viewMode === 'list') {
		return (
			<Link
				href={`/products/${product._id}`}
				className={`relative border border-border-main rounded-xl p-4 shadow-sm transition-all duration-200 flex flex-row items-center gap-5 bg-card-bg group ${
					!product.isAvailable ? 'opacity-80' : 'hover:shadow-md'
				}`}
			>
				<div className='w-32 h-32 sm:w-40 sm:h-40 bg-main-bg rounded-lg overflow-hidden relative shrink-0 z-10'>
					{discountPercent && (
						<span className='absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md z-20 shadow-sm'>
							-{discountPercent}%
						</span>
					)}

					{!product.isAvailable && (
						<div className='absolute inset-0 bg-card-bg/40 z-20 flex items-center justify-center'>
							<span className='bg-main-bg text-text-main text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest shadow-xl'>
								Out of Stock
							</span>
						</div>
					)}

					<Image
						src={`${BASE_URL}${product.imageUrl}`}
						alt={product.name}
						fill
						sizes='160px'
						className={`object-cover transition-all duration-500 group-hover:scale-105 ${
							!product.isAvailable ? 'grayscale scale-95 opacity-50' : ''
						}`}
						unoptimized
					/>
				</div>

				<div className='flex flex-col grow h-full py-1'>
					<div className='flex items-center justify-between gap-2 mb-1'>
						<span className='text-xs text-primary font-bold uppercase tracking-wider'>
							{product.category.name}
						</span>
						<span className='text-[14px] font-semibold text-amber-500 flex items-center gap-1'>
							<Star size={16} fill='currentColor' className='text-amber-500' />
							{product.rating}
						</span>
					</div>

					<h2
						className={`font-bold text-base sm:text-lg mb-1 line-clamp-1 ${!product.isAvailable ? 'text-text-muted' : 'text-text-main'}`}
					>
						{product.name}
					</h2>

					<p className='text-xs sm:text-sm text-text-muted line-clamp-2 mb-3 italic max-w-xl'>
						{product.description}
					</p>

					<div className='flex items-center justify-between border-t border-border-main pt-3 mt-auto'>
						<div className='flex items-baseline gap-2'>
							<span
								className={`text-lg sm:text-xl font-black ${!product.isAvailable ? 'text-text-subtle' : 'text-text-main'}`}
							>
								${product.price}
							</span>
							{product.oldPrice && product.isAvailable && (
								<span className='text-xs sm:text-sm font-bold text-text-subtle line-through'>
									${product.oldPrice}
								</span>
							)}
						</div>

						<div className='flex gap-2'>
							<button
								type='button'
								disabled={loadingStates[targetId] === 'wishlist'}
								onClick={handleToggleWishlist}
								className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 cursor-pointer ${
									isInWishlist
										? 'bg-red-500/10 border-red-500/30 text-red-500 dark:bg-red-500/20'
										: 'bg-main-bg border-border-main text-text-subtle hover:text-red-500'
								}`}
							>
								{loadingStates[targetId] === 'wishlist' ? (
									<Loader2 size={16} className='animate-spin' />
								) : (
									<Heart
										size={18}
										fill={isInWishlist ? 'currentColor' : 'none'}
									/>
								)}
							</button>

							<button
								type='button'
								disabled={!product.isAvailable || !!loadingStates[targetId]}
								onClick={handleToggleCart}
								className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 ${
									!product.isAvailable
										? 'bg-ui-hover border-border-main text-text-subtle cursor-not-allowed'
										: isInCart
											? 'bg-primary border-primary text-white shadow-md shadow-primary/20 dark:shadow-none cursor-pointer'
											: 'bg-main-bg border-border-main text-text-subtle hover:text-primary cursor-pointer'
								}`}
							>
								{loadingStates[targetId] === 'cart' ||
								loadingStates[targetId] === 'remove' ? (
									<Loader2 size={16} className='animate-spin' />
								) : (
									<ShoppingCart
										size={18}
										fill={isInCart ? 'currentColor' : 'none'}
									/>
								)}
							</button>
						</div>
					</div>
				</div>
			</Link>
		)
	}

	return (
		<Link
			href={`/products/${product._id}`}
			className={`relative border border-border-main rounded-xl p-4 shadow-sm transition-all duration-200 flex flex-col justify-between bg-card-bg group transform ${
				!product.isAvailable
					? 'opacity-80'
					: 'hover:shadow-md hover:scale-[1.02]'
			}`}
		>
			{discountPercent && (
				<span className='absolute top-0 left-0 w-16 h-12 bg-red-600 text-white text-lg font-bold px-2 py-1 rounded-br-3xl rounded-tl-xl z-20 text-center flex items-center justify-center'>
					-{discountPercent}%
				</span>
			)}

			<div className='w-full aspect-square bg-main-bg rounded-lg overflow-hidden mb-4 relative z-10'>
				{!product.isAvailable && (
					<div className='absolute inset-0 bg-card-bg/40 z-20 flex items-center justify-center'>
						<span className='bg-main-bg text-text-main text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-xl'>
							Out of Stock
						</span>
					</div>
				)}

				<Image
					src={`${BASE_URL}${product.imageUrl}`}
					alt={product.name}
					fill
					sizes='(max-width: 768px) 100vw, 33vw'
					className={`object-cover transition-all duration-500 ${
						!product.isAvailable ? 'grayscale scale-95 opacity-50' : ''
					}`}
					unoptimized
				/>
			</div>

			<div className='flex items-center justify-between gap-2 mb-1'>
				<span className='text-xs text-primary font-bold uppercase tracking-wider'>
					{product.category.name}
				</span>
				<span className='text-[14px] font-semibold text-amber-500 flex items-center gap-1'>
					<Star size={16} fill='currentColor' className='text-amber-500' />
					{product.rating}
				</span>
			</div>

			<h2
				className={`font-bold text-lg mb-1 ${!product.isAvailable ? 'text-text-muted' : 'text-text-main'}`}
			>
				{product.name}
			</h2>
			<p className='text-sm text-text-muted line-clamp-2 mb-4 italic'>
				{product.description}
			</p>

			<div className='flex items-center justify-between border-t border-border-main pt-3 mt-auto'>
				<div className='flex items-baseline gap-2'>
					<span
						className={`text-xl font-black ${!product.isAvailable ? 'text-text-subtle' : 'text-text-main'}`}
					>
						${product.price}
					</span>
					{product.oldPrice && product.isAvailable && (
						<span className='text-sm font-bold text-text-subtle line-through'>
							${product.oldPrice}
						</span>
					)}
				</div>

				<div className='flex gap-2'>
					<button
						type='button'
						disabled={loadingStates[targetId] === 'wishlist'}
						onClick={handleToggleWishlist}
						className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 cursor-pointer ${
							isInWishlist
								? 'bg-red-500/10 border-red-500/30 text-red-500 dark:bg-red-500/20'
								: 'bg-main-bg border-border-main text-text-subtle hover:text-red-500'
						}`}
					>
						{loadingStates[targetId] === 'wishlist' ? (
							<Loader2 size={18} className='animate-spin' />
						) : (
							<Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
						)}
					</button>

					<button
						type='button'
						disabled={!product.isAvailable || !!loadingStates[targetId]}
						onClick={handleToggleCart}
						className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 ${
							!product.isAvailable
								? 'bg-ui-hover border-border-main text-text-subtle cursor-not-allowed'
								: isInCart
									? 'bg-primary border-primary text-white shadow-md shadow-primary/20 dark:shadow-none cursor-pointer'
									: 'bg-main-bg border-border-main text-text-subtle hover:text-primary cursor-pointer'
						}`}
					>
						{loadingStates[targetId] === 'cart' ||
						loadingStates[targetId] === 'remove' ? (
							<Loader2 size={18} className='animate-spin' />
						) : (
							<ShoppingCart
								size={20}
								fill={isInCart ? 'currentColor' : 'none'}
							/>
						)}
					</button>
				</div>
			</div>
		</Link>
	)
}
