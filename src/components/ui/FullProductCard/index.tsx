'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { ProductType } from '@/src/types/product'
import {
	Heart,
	ShoppingCart,
	Star,
	Loader2,
	ShieldCheck,
	Truck,
	Minus,
	Plus,
	Flame,
	Scale,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function FullProductCard(product: ProductType) {
	const [quantity, setQuantity] = useState(1)

	const {
		user,
		loadingStates,
		toggleWishlist,
		addToCart,
		removeFromCart,
		isInWishlist: checkWishlist,
		isInCart: checkCart,
	} = useUserActions()

	const targetId = String((product as any)._id || product.productId)

	const isInWishlist = checkWishlist(targetId)
	const isInCart = checkCart(targetId)

	const isWishlistLoading = loadingStates[targetId] === 'wishlist'
	const isCartLoading =
		loadingStates[targetId] === 'cart' || loadingStates[targetId] === 'remove'

	const handleCartAction = () => {
		if (isInCart) {
			removeFromCart(targetId)
		} else {
			addToCart(targetId, quantity, product.isAvailable)
		}
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
			<div className='relative aspect-square w-full bg-[#F7F7F8] border border-gray-200 rounded-2xl overflow-hidden group'>
				{!product.isAvailable && (
					<div className='absolute inset-0 bg-white/60 z-30 flex items-center justify-center'>
						<span className='bg-gray-800 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest'>
							Out of Stock
						</span>
					</div>
				)}

				{product.oldPrice && product.isAvailable && (
					<div className='absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-2 rounded-full z-20 shadow-lg'>
						-
						{Math.round(
							((product.oldPrice - product.price) / product.oldPrice) * 100,
						)}
						%
					</div>
				)}

				<Image
					src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
					alt={product.name}
					fill
					priority
					unoptimized
					className={`object-contain p-8 transform group-hover:scale-105 transition-transform duration-500 pointer-events-none ${!product.isAvailable && 'grayscale'}`}
				/>
			</div>

			<div className='flex flex-col'>
				<div className='flex items-center justify-between mb-4'>
					<span className='px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-md'>
						{product.category?.name}
					</span>
					<div className='flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full'>
						<Star size={18} fill='#F5885F' className='text-[#F5885F]' />
						<span className='font-bold text-[#F5885F]'>{product.rating}</span>
					</div>
				</div>

				<h1 className='text-3xl md:text-4xl font-black text-black mb-2 leading-tight'>
					{product.name}
				</h1>

				<div className='flex items-center gap-4 mb-6'>
					<div className='flex items-baseline gap-2'>
						<span className='text-4xl font-black text-primary'>
							${product.price}
						</span>
						{product.oldPrice && (
							<span className='text-xl font-bold text-gray-400 line-through'>
								${product.oldPrice}
							</span>
						)}
					</div>
					<div
						className={`text-sm font-bold ${product.isAvailable ? 'text-green-500' : 'text-red-500'}`}
					>
						● {product.isAvailable ? 'In Stock' : 'Unavailable'}
					</div>
				</div>

				<div className='flex gap-6 mb-8'>
					{product.weight && (
						<div className='flex items-center gap-2'>
							<div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500'>
								<Scale size={20} />
							</div>
							<div>
								<p className='text-[10px] text-gray-400 uppercase font-bold'>
									Weight
								</p>
								<p className='text-sm font-bold text-black'>{product.weight}</p>
							</div>
						</div>
					)}
					{product.calories && (
						<div className='flex items-center gap-2'>
							<div className='w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500'>
								<Flame size={20} />
							</div>
							<div>
								<p className='text-[10px] text-gray-400 uppercase font-bold'>
									Calories
								</p>
								<p className='text-sm font-bold text-black'>
									{product.calories} kcal
								</p>
							</div>
						</div>
					)}
				</div>

				<div className='bg-gray-50 rounded-xl p-5 mb-8'>
					<h3 className='font-bold text-black mb-2 text-sm uppercase tracking-wider'>
						Description
					</h3>
					<p className='text-gray-600 leading-relaxed italic text-sm'>
						{product.description || 'No description provided for this product.'}
					</p>
				</div>

				{product.isAvailable && !isInCart && (
					<div className='flex items-center gap-4 mb-8'>
						<span className='font-bold text-sm text-gray-500'>Quantity:</span>
						<div className='flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-white'>
							<button
								type='button'
								onClick={() => setQuantity(Math.max(1, quantity - 1))}
								className='p-3 hover:bg-gray-50 transition-colors text-gray-500 cursor-pointer disabled:opacity-30'
								disabled={quantity <= 1}
							>
								<Minus size={18} />
							</button>

							<input
								type='text'
								inputMode='numeric'
								value={quantity}
								onChange={e => {
									const val = e.target.value.replace(/\D/g, '')
									if (val === '') {
										setQuantity(1)
									} else {
										const num = parseInt(val)
										setQuantity(num > 100 ? 100 : num)
									}
								}}
								onBlur={e => {
									if (e.target.value === '') setQuantity(1)
								}}
								className='w-12 text-center font-black text-lg focus:outline-none bg-transparent tabular-nums'
							/>

							<button
								type='button'
								onClick={() => setQuantity(quantity + 1)}
								className='p-3 hover:bg-gray-50 transition-colors text-gray-500 cursor-pointer'
							>
								<Plus size={18} />
							</button>
						</div>
					</div>
				)}

				<div className='grid grid-cols-2 gap-4 mb-8 opacity-60'>
					<div className='flex items-center gap-3 p-3 border border-gray-100 rounded-lg'>
						<Truck size={18} />
						<span className='text-[11px] font-bold uppercase'>
							Fast Delivery
						</span>
					</div>
					<div className='flex items-center gap-3 p-3 border border-gray-100 rounded-lg'>
						<ShieldCheck size={18} />
						<span className='text-[11px] font-bold uppercase'>
							Quality Guarantee
						</span>
					</div>
				</div>

				<div className='flex gap-4 mt-auto'>
					<button
						onClick={handleCartAction}
						disabled={isCartLoading || !product.isAvailable}
						className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-lg active:scale-95 cursor-pointer ${
							!product.isAvailable
								? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
								: isInCart
									? 'bg-black text-white hover:bg-gray-800'
									: 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
						}`}
					>
						{isCartLoading ? (
							<Loader2 className='animate-spin' />
						) : (
							<>
								<ShoppingCart size={22} />
								{isInCart ? 'Remove from Cart' : 'Add to Cart'}
							</>
						)}
					</button>

					<button
						onClick={() => toggleWishlist(targetId)}
						disabled={isWishlistLoading}
						className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all border-2 active:scale-95 cursor-pointer ${
							isInWishlist
								? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
								: 'bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
						}`}
					>
						{isWishlistLoading ? (
							<Loader2 className='animate-spin' />
						) : (
							<Heart size={26} fill={isInWishlist ? 'currentColor' : 'none'} />
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
