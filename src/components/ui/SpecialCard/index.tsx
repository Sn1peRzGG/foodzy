'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface SpecialCardProps {
	productId: number
	name: string
	description: string
	imageUrl: string
}

export default function SpecialCard(product: SpecialCardProps) {
	const [liked, setLiked] = useState(false)

	const handleLike = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setLiked(!liked)
	}

	return (
		<div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md transition-all duration-300 hover:scale-105'>
			<button
				type='button'
				onClick={handleLike}
				className='absolute top-0 right-0 w-16 h-14 lg:w-20 lg:h-18 bg-[#F53E32] hover:bg-[#F53E32]/90 transition-colors duration-200 rounded-tr-[21px] rounded-bl-[42.5px] flex items-center justify-center text-white cursor-pointer z-20'
			>
				<Heart
					className='w-5 h-5 sm:w-6 lg:w-6 transition-transform duration-200'
					fill={liked ? 'white' : 'none'}
				/>
			</button>

			<Link
				href={`/products/${product.productId}`}
				className='flex flex-col rounded-[21px] shadow-[2px_9px_42px_0px_rgba(0,0,0,0.08)] bg-white overflow-hidden cursor-pointer h-full'
			>
				<div className='flex flex-col flex-1 justify-start pt-5 sm:pt-6 md:pt-8 lg:pt-9 px-4 sm:px-5 md:px-6 lg:px-12 pb-5 sm:pb-6 md:pb-8 lg:pb-10'>
					<div className='flex justify-center w-full pointer-events-none mb-4'>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
							alt={product.name}
							width={276}
							height={276}
							priority
							className='object-contain'
							unoptimized
						/>
					</div>

					<h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight'>
						{product.name}
					</h3>

					<p className='text-gray-600 font-semibold text-xs sm:text-sm md:text-base lg:text-[20px] leading-[1.4] mt-3'>
						{product.description}
					</p>
				</div>
			</Link>
		</div>
	)
}
