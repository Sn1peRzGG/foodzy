import categories from '@/data/categories.json'
import CategoryCard from '@/src/components/ui/CategoryCard'

export default function CategorySection() {
	return (
		<div className='w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 2xl:mt-32'>
			<div className='flex flex-col items-center gap-2 md:gap-3 lg:gap-7 mb-8 md:mb-12 lg:mb-16'>
				<h2 className='text-xs sm:text-sm md:text-base lg:text-[20px] font-bold text-[#FF6868] tracking-[0.175em] uppercase'>
					Customer Favorites
				</h2>
				<p className='text-lg sm:text-xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-center'>
					Popular Categories
				</p>
			</div>

			<div className='flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 2xl:gap-12 w-full'>
				{categories.map(category => (
					<CategoryCard key={category.categoryId} {...category} />
				))}
			</div>
		</div>
	)
}
