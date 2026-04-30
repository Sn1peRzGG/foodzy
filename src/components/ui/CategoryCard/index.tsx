import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
	id: number
	name: string
	image: string
	count: number
}

export default function CategoryCard({
	id,
	name,
	image,
	count,
}: CategoryCardProps) {
	return (
		<Link
			href={`/category/${id}`}
			id={id.toString()}
			className='flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-70 h-auto aspect-square sm:h-56 md:h-60 lg:h-70 rounded-[20px] shadow-[2px_10px_30px_0px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[2px_10px_40px_0px_rgba(0,0,0,0.15)] bg-white gap-1.5 sm:gap-2 md:gap-3 lg:gap-2 px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6 lg:py-8'
		>
			<div className='w-16 h-16 sm:w-18 md:w-20 lg:w-29.25 lg:h-29.25 rounded-full bg-[#C0B263]/17 flex items-center justify-center shrink-0'>
				<Image
					src={image}
					alt={name}
					width={100}
					height={100}
					className='w-10 h-10 sm:w-11 md:w-12 lg:w-auto lg:h-auto object-contain'
					loading='lazy'
				/>
			</div>

			<h3 className='text-lg sm:text-xl md:text-2xl lg:text-[30px] font-semibold text-center leading-tight'>
				{name}
			</h3>

			<p className='text-gray-600 text-xs sm:text-sm md:text-base lg:text-[22px] font-medium text-center'>
				({count} dishes)
			</p>
		</Link>
	)
}
