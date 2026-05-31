'use client'

import CategoryFilter from '../filters/CategoryFilter'
import PriceRangeFilter from '../filters/PriceRangeFilter'
import StatusFilter from '../filters/StatusFilter'

export default function ProductFilter() {
	return (
		<div className='bg-white p-5 rounded-lg border border-gray-200 shadow-sm w-full space-y-6'>
			<h3 className='text-lg font-bold text-gray-900 hidden md:block border-b border-gray-100 pb-2'>
				Filter Products
			</h3>

			<CategoryFilter />

			<PriceRangeFilter />

			<StatusFilter />
		</div>
	)
}
