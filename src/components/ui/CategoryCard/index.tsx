import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
	categoryId: number
	name: string
	imageUrl: string
	count: number
}

export default function CategoryCard(category: CategoryCardProps) {
	return (
		<Link
			href={`/products?search=&category=${encodeURIComponent(category.name)}`}
			id={category.categoryId.toString()}
			className='
        flex flex-col items-center justify-start 
        w-70 h-75 aspect-square 
        rounded-[20px] bg-white 
        shadow-[2px_10px_30px_0px_rgba(0,0,0,0.1)] 
        transition-all duration-300 hover:scale-105 hover:shadow-[2px_10px_40px_0px_rgba(0,0,0,0.15)] 
        cursor-pointer gap-3 px-5 pt-6 pb-8
      '
		>
			<div className='w-30 h-30 rounded-full bg-[#C0B263]/17 flex items-center justify-center shrink-0 overflow-hidden'>
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

			<p className='text-gray-600 text-[22px] font-medium text-center'>
				({category.count} dishes)
			</p>
		</Link>
	)
}
