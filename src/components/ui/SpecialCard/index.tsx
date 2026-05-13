'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface SpecialCardProps {
	productId: number
	name: string
	description: string
	imageUrl: string
}

export default function SpecialCard(props: SpecialCardProps) {
	const [liked, setLiked] = useState(false)

	return (
		<div
			id={props.productId.toString()}
			className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md flex flex-col rounded-[21px] shadow-[2px_9px_42px_0px_rgba(0,0,0,0.08)] relative bg-white overflow-hidden transition-all duration-300 hover:shadow-[2px_9px_52px_0px_rgba(0,0,0,0.12)] cursor-pointer'
		>
			<button
				aria-label={liked ? 'Unlike' : 'Like'}
				onClick={() => setLiked(!liked)}
				className='absolute top-0 right-0 w-16 h-14 lg:w-21.75 lg:h-18.75 bg-[#F53E32] hover:bg-[#F53E32]/90 rounded-tr-[14px] rounded-bl-[42.5px] flex items-center justify-center text-white cursor-pointer transition-colors duration-200 z-10'
			>
				{liked ? (
					<Heart className='w-5 h-5 sm:w-5.5 md:w-6 lg:w-6' fill='white' />
				) : (
					<Heart className='w-5 h-5 sm:w-5.5 md:w-6 lg:w-6' />
				)}
			</button>

			<div className='flex flex-col flex-1 justify-start pt-5 sm:pt-6 md:pt-8 lg:pt-9 px-4 sm:px-5 md:px-6 lg:px-12 pb-5 sm:pb-6 md:pb-8 lg:pb-10 gap-2 md:gap-3 lg:gap-2'>
				<div className='flex justify-center w-full h-auto pointer-events-none mb-1 md:mb-2 lg:mb-0'>
					<Image
						src={props.imageUrl}
						loading='eager'
						alt={props.name}
						width={276}
						height={276}
						className='object-contain'
					/>
				</div>

				<h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mt-3 sm:mt-4 md:mt-5 lg:mt-6'>
					{props.name}
				</h3>

				<p className='text-gray-600 font-semibold text-xs sm:text-sm md:text-base lg:text-[22px] leading-[1.4] mt-2 md:mt-3 lg:mt-5'>
					{props.description}
				</p>
			</div>
		</div>
	)
}
