'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { ProductType } from '@/src/types/product'
import {
	Flame,
	Heart,
	Loader2,
	Minus,
	Plus,
	Scale,
	ShieldCheck,
	ShoppingCart,
	Star,
	Truck,
	MessageSquare,
	FileText,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ProductReviews from '../ProductReviews'

export default function FullProductCard(product: ProductType) {
	const [quantity, setQuantity] = useState(1)
	const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
		'description',
	)

	const {
		user,
		loadingStates,
		toggleWishlist,
		addToCart,
		removeFromCart,
		isInWishlist: checkWishlist,
		isInCart: checkCart,
	} = useUserActions()

	const targetId = String((product as any)._id || product._id)

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
		<div className='flex flex-col gap-8 max-w-6xl mx-auto w-full'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm'>
				<div className='relative aspect-square w-full bg-main-bg border border-border-main rounded-2xl overflow-hidden group'>
					{!product.isAvailable && (
						<div className='absolute inset-0 bg-card-bg/60 z-30 flex items-center justify-center'>
							<span className='bg-main-bg text-text-main px-6 py-2 rounded-full font-bold uppercase tracking-widest'>
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

				<div className='flex flex-col justify-between'>
					<div>
						<div className='flex items-center justify-between mb-4'>
							<span className='px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-md'>
								{product.category?.name}
							</span>
							<div className='flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 dark:bg-amber-500/15 rounded-full border border-amber-500/20 shadow-sm'>
								<Star
									size={18}
									fill='currentColor'
									className='text-amber-500'
								/>
								<span className='font-bold text-amber-500 font-mono'>
									{product.rating ? product.rating.toFixed(1) : '0.0'}
								</span>
							</div>
						</div>

						<h1 className='text-3xl md:text-4xl font-black text-text-main mb-2 leading-tight'>
							{product.name}
						</h1>

						<div className='flex items-center gap-4 mb-6'>
							<div className='flex items-baseline gap-2'>
								<span className='text-4xl font-black text-primary'>
									${product.price}
								</span>
								{product.oldPrice && (
									<span className='text-xl font-bold text-text-subtle line-through'>
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

						<div className='flex gap-6 mb-6'>
							{product.weight && (
								<div className='flex items-center gap-2'>
									<div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500'>
										<Scale size={20} />
									</div>
									<div>
										<p className='text-[10px] text-text-subtle uppercase font-bold'>
											Weight
										</p>
										<p className='text-sm font-bold text-text-main'>
											{product.weight}
										</p>
									</div>
								</div>
							)}
							{product.calories && (
								<div className='flex items-center gap-2'>
									<div className='w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-orange-500'>
										<Flame size={20} />
									</div>
									<div>
										<p className='text-[10px] text-text-subtle uppercase font-bold'>
											Calories
										</p>
										<p className='text-sm font-bold text-text-main'>
											{product.calories} kcal
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					<div>
						{product.isAvailable && !isInCart && (
							<div className='flex items-center gap-4 mb-6'>
								<span className='font-bold text-sm text-text-muted'>
									Quantity:
								</span>
								<div className='flex items-center border-2 border-border-main rounded-xl overflow-hidden bg-card-bg'>
									<button
										type='button'
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className='p-2.5 hover:bg-main-bg transition-colors text-text-muted cursor-pointer disabled:opacity-30'
										disabled={quantity <= 1}
									>
										<Minus size={16} />
									</button>

									<input
										type='text'
										inputMode='numeric'
										value={quantity}
										onChange={e => {
											const val = e.target.value.replace(/\D/g, '')
											if (val === '') setQuantity(1)
											else {
												const num = parseInt(val)
												setQuantity(num > 100 ? 100 : num)
											}
										}}
										className='w-12 text-center font-black text-base focus:outline-none bg-transparent tabular-nums'
									/>

									<button
										type='button'
										onClick={() => setQuantity(quantity + 1)}
										className='p-2.5 hover:bg-main-bg transition-colors text-text-muted cursor-pointer'
									>
										<Plus size={16} />
									</button>
								</div>
							</div>
						)}

						<div className='grid grid-cols-2 gap-4 mb-6 opacity-60'>
							<div className='flex items-center gap-3 p-2.5 border border-border-main rounded-lg text-xs'>
								<Truck size={16} />
								<span className='font-bold uppercase tracking-wider'>
									Fast Delivery
								</span>
							</div>
							<div className='flex items-center gap-3 p-2.5 border border-border-main rounded-lg text-xs'>
								<ShieldCheck size={16} />
								<span className='font-bold uppercase tracking-wider'>
									Guarantee
								</span>
							</div>
						</div>

						<div className='flex gap-4'>
							<button
								onClick={handleCartAction}
								disabled={isCartLoading || !product.isAvailable}
								className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-lg active:scale-95 cursor-pointer ${
									!product.isAvailable
										? 'bg-gray-200 text-text-subtle cursor-not-allowed shadow-md'
										: isInCart
											? 'bg-main-bg text-text-main border border-border-main hover:bg-main-bg/80'
											: 'bg-primary text-text-main hover:bg-primary/90'
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
										: 'bg-card-bg border-border-main text-text-subtle hover:border-red-200 hover:text-red-500'
								}`}
							>
								{isWishlistLoading ? (
									<Loader2 className='animate-spin' />
								) : (
									<Heart
										size={26}
										fill={isInWishlist ? 'currentColor' : 'none'}
									/>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='flex border-b border-border-main bg-main-bg/40'>
					<button
						onClick={() => setActiveTab('description')}
						className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
							activeTab === 'description'
								? 'border-primary text-primary bg-card-bg'
								: 'border-transparent text-text-muted hover:text-text-main'
						}`}
					>
						<FileText size={16} />
						Description
					</button>
					<button
						onClick={() => setActiveTab('reviews')}
						className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
							activeTab === 'reviews'
								? 'border-primary text-primary bg-card-bg'
								: 'border-transparent text-text-muted hover:text-text-main'
						}`}
					>
						<MessageSquare size={16} />
						Reviews
					</button>
				</div>

				<div className='p-6'>
					{activeTab === 'description' ? (
						<div className='max-w-3xl animate-fadeIn'>
							<h3 className='text-xl font-black text-text-main mb-3'>
								Product Overview
							</h3>
							<p className='text-text-muted leading-relaxed text-sm whitespace-pre-line'>
								{product.description ||
									'No description provided for this product.'}
							</p>
						</div>
					) : (
						<div className='animate-fadeIn w-full'>
							<ProductReviews productId={targetId} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
