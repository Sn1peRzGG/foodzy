'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { ProductType } from '@/src/types/product'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SpecialCard(product: ProductType) {
	const [mounted, setMounted] = useState(false)
	const { user, toggleWishlist } = useUserActions()

	useEffect(() => {
		setMounted(true)
	}, [])

	const targetId = (product as any)._id || String(product._id)

	const isInWishlist = user?.wishlist?.some(
		item => String(item._id) === targetId,
	)

	const handleToggleWishlist = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		toggleWishlist(targetId)
	}

	if (!mounted) return null

	return (
		<div className='relative w-full h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md flex flex-col group'>
			<button
				type='button'
				onClick={handleToggleWishlist}
				className='absolute top-0 right-0 w-16 h-14 lg:w-20 lg:h-18 bg-[#F53E32] hover:bg-[#F53E32]/90 text-white flex items-center justify-center cursor-pointer z-20 rounded-tr-[21px] rounded-bl-[42.5px] shadow-sm active:scale-95 transition-transform duration-150'
			>
				<Heart
					className='w-5 h-5 sm:w-6 lg:w-6'
					fill={isInWishlist ? 'white' : 'none'}
				/>
			</button>

			<Link
				href={`/products/${product._id}`}
				className='flex flex-col justify-between rounded-[21px] shadow-[2px_9px_42px_0px_rgba(0,0,0,0.08)] bg-white overflow-hidden cursor-pointer h-full w-full'
			>
				<div className='flex flex-col flex-1 justify-start pt-5 sm:pt-6 md:pt-8 lg:pt-9 px-4 sm:px-5 md:px-6 lg:px-12 pb-5 sm:pb-6 md:pb-8 lg:pb-10'>
					<div className='flex justify-center w-full pointer-events-none mb-4 overflow-hidden rounded-lg'>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
							alt={product.name}
							width={276}
							height={276}
							priority
							className='object-contain transition-transform duration-500 ease-out group-hover:scale-105'
							unoptimized
						/>
					</div>

					<h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight transition-colors duration-300 group-hover:text-[#F53E32]'>
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
