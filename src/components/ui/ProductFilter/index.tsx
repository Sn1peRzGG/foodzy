'use client'

import CategoryFilter from '../filters/CategoryFilter'
import PriceRangeFilter from '../filters/PriceRangeFilter'
import RatingFilter from '../filters/RatingFilter'
import StatusFilter from '../filters/StatusFilter'

export default function ProductFilter() {
	return (
		<div className='bg-card-bg p-5 rounded-lg border border-border-main shadow-sm w-full space-y-6'>
			<h3 className='text-lg font-bold text-text-main hidden md:block border-b border-border-main pb-2'>
				Filter Products
			</h3>

			<CategoryFilter />

			<PriceRangeFilter />

			<RatingFilter />

			<StatusFilter />
		</div>
	)
}
