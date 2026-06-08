'use client'

import { useProducts } from '@/src/hooks/useProducts'
import { RotateCcw } from 'lucide-react'
import CategoryFilter from '../filters/CategoryFilter'
import PriceRangeFilter from '../filters/PriceRangeFilter'
import RatingFilter from '../filters/RatingFilter'
import StatusFilter from '../filters/StatusFilter'

export default function ProductFilter() {
	const { resetFilters } = useProducts()

	return (
		<div className='bg-card-bg p-5 rounded-lg border border-border-main shadow-sm w-full space-y-6'>
			<div className='flex items-center justify-between border-b border-border-main pb-2'>
				<h3 className='text-lg font-bold text-text-main'>Filter Products</h3>

				<button
					type='button'
					onClick={resetFilters}
					className='text-text-muted hover:text-primary hover:bg-ui-hover transition-colors duration-200 cursor-pointer p-2 rounded-md'
					title='Reset all filters'
				>
					<RotateCcw size={18} />
				</button>
			</div>

			<CategoryFilter />

			<PriceRangeFilter />

			<RatingFilter />

			<StatusFilter />
		</div>
	)
}
