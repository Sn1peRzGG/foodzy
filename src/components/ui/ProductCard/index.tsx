'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { ProductType } from '@/src/types/product'
import { Heart, Loader2, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductCard(product: ProductType) {
	const [mounted, setMounted] = useState(false)
	const { user, loadingStates, toggleWishlist, addToCart, removeFromCart } =
		useUserActions()

	useEffect(() => {
		setMounted(true)
	}, [])

	const targetId = (product as any)._id || String(product._id)

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

	return (
		<Link
			href={`/products/${product._id}`}
			className={`relative border border-gray-100 rounded-xl p-4 shadow-sm transition-all duration-300 flex flex-col justify-between bg-white group transform ${
				!product.isAvailable ? 'opacity-80' : 'hover:shadow-md hover:scale-105'
			}`}
		>
			{product.oldPrice && product.isAvailable && (
				<span className='absolute top-0 left-0 w-16 h-12 bg-red-600 text-white text-lg font-bold px-2 py-1 rounded-br-3xl rounded-tl-xl z-20 text-center flex items-center justify-center'>
					-
					{Math.round(
						((product.oldPrice - product.price) / product.oldPrice) * 100,
					)}
					%
				</span>
			)}

			<div className='w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 relative z-10'>
				{!product.isAvailable && (
					<div className='absolute inset-0 bg-white/40 z-20 flex items-center justify-center'>
						<span className='bg-gray-800 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-xl'>
							Out of Stock
						</span>
					</div>
				)}

				<Image
					src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
					alt={product.name}
					fill
					sizes='(max-width: 768px) 100vw, 33vw'
					className={`object-cover transition-all duration-500 ${
						!product.isAvailable ? 'grayscale scale-95 opacity-50' : ''
					}`}
					unoptimized
				/>
			</div>

			<div className='flex items-center justify-between mb-1'>
				<span className='text-xs text-primary font-bold uppercase tracking-wider'>
					{product.category.name}
				</span>
				<span className='text-[14px] font-semibold text-[#F5885F] flex items-center gap-1'>
					<Star size={18} fill='#F5885F' /> {product.rating}
				</span>
			</div>

			<h2
				className={`font-bold text-lg mb-1 ${!product.isAvailable ? 'text-gray-500' : 'text-black'}`}
			>
				{product.name}
			</h2>
			<p className='text-sm text-gray-500 line-clamp-2 mb-4 italic'>
				{product.description}
			</p>

			<div className='flex items-center justify-between border-t border-gray-100 pt-3 mt-auto'>
				<div className='flex items-baseline gap-2'>
					<span
						className={`text-xl font-black ${!product.isAvailable ? 'text-gray-400' : 'text-black'}`}
					>
						${product.price}
					</span>
					{product.oldPrice && product.isAvailable && (
						<span className='text-sm font-bold text-gray-400 line-through'>
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
								? 'bg-red-50 border-red-200 text-red-500'
								: 'bg-gray-50 border-gray-200 text-gray-400 hover:text-red-500'
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
								? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed shadow-none'
								: isInCart
									? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 cursor-pointer'
									: 'bg-gray-50 border-gray-200 text-gray-400 hover:text-primary cursor-pointer'
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
