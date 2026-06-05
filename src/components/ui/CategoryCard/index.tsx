import { CategoryType } from '@/src/types/category'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoryCard(category: CategoryType) {
	return (
		<Link
			href={`/products?search=&category=${encodeURIComponent(category._id)}`}
			id={category._id}
			className='
        flex flex-col items-center justify-start 
        w-70 h-75 aspect-square 
        rounded-[20px] bg-card-bg 
        shadow-md dark:shadow-black/40(0,0,0,0.1)] 
        transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-black/60(0,0,0,0.15)] 
        cursor-pointer gap-3 px-5 pt-6 pb-8
      '
		>
			<div className='w-30 h-30 rounded-full bg-brand-gold/17 flex items-center justify-center shrink-0 overflow-hidden'>
				<div className='relative w-30 h-30'>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}${category.imageUrl}`}
						alt={category.name}
						fill
						sizes='120px'
						className='object-cover aspect-square'
						loading='lazy'
						unoptimized
					/>
				</div>
			</div>

			<h3 className='text-[26px] font-semibold text-center leading-tight'>
				{category.name}
			</h3>

			<p className='text-text-muted text-[22px] font-medium text-center'>
				({category.count} dishes)
			</p>
		</Link>
	)
}
