'use client'

import { Heart, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
	id: number
	name: string
	description: string
	image: string
	category: string
	price: number
	oldPrice?: number
	rating: number
}

export default function ProductCard(product: ProductCardProps) {
	return (
		<Link
			href={`/products/${product.id}`}
			className='relative border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between bg-white group hover:scale-105 transform'
		>
			{product.oldPrice && (
				<span className='absolute top-0 left-0 w-16 h-12 bg-red-600 text-white text-lg font-bold px-2 py-1 rounded-br-3xl rounded-tl-xl z-20 text-center flex items-center justify-center'>
					-
					{Math.round(
						((product.oldPrice - product.price) / product.oldPrice) * 100,
					)}
					%
				</span>
			)}

			<div className='w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 relative z-10'>
				<Image
					src={product.image}
					alt={product.name}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='object-cover'
				/>
			</div>

			<div className='flex items-center justify-between mb-1'>
				<span className='text-xs text-[#64B496] font-bold uppercase tracking-wider'>
					{product.category}
				</span>
				<span className='text-[14px] font-semibold text-[#F5885F] flex items-center justify-center gap-1'>
					<Star size={20} fill='#F5885F' /> {product.rating}
				</span>
			</div>

			<h2 className='font-bold text-lg text-black mb-2'>{product.name}</h2>
			<p className='text-sm text-gray-600 line-clamp-2 mb-4'>
				{product.description}
			</p>

			<div className='flex items-center justify-between border-t border-gray-400 pt-3 mt-auto'>
				<div className='flex flex-row items-center justify-center gap-2'>
					<span className='text-xl font-black text-black'>
						${product.price}
					</span>
					{product.oldPrice && (
						<span className='text-lg font-bold text-red-500 line-through'>
							${product.oldPrice}
						</span>
					)}
				</div>

				<div className='flex flex-row items-center gap-2'>
					<button
						type='button'
						className='w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center hover:bg-gray-100 hover:text-[#64B496] transition-colors cursor-pointer border border-gray-300'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							console.log('Heart clicked:', product.id)
						}}
					>
						<Heart />
					</button>

					<button
						type='button'
						className='w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center hover:bg-gray-100 hover:text-[#64B496] transition-colors cursor-pointer border border-gray-300'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							console.log('Cart clicked:', product.id)
						}}
					>
						<ShoppingCart />
					</button>
				</div>
			</div>
		</Link>
	)
}
