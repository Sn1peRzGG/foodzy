'use client'

import { useProducts } from '@/src/hooks/useProducts'
import RangeSlider from '../RangeSlider'

const DEFAULT_MIN = 0
const DEFAULT_MAX = 5

export default function RatingFilter() {
	const { getParam, setMultipleParams, meta } = useProducts()

	const LIMIT_MIN =
		meta && 'minRating' in meta && meta.minRating !== undefined
			? Number(meta.minRating)
			: DEFAULT_MIN
	const LIMIT_MAX =
		meta && 'maxRating' in meta && meta.maxRating !== undefined
			? Number(meta.maxRating)
			: DEFAULT_MAX

	const rawMin = getParam('minRating')
	const rawMax = getParam('maxRating')

	let minRating =
		rawMin !== null && !isNaN(Number(rawMin)) ? Number(rawMin) : LIMIT_MIN
	let maxRating =
		rawMax !== null && !isNaN(Number(rawMax)) ? Number(rawMax) : LIMIT_MAX

	minRating = Math.max(LIMIT_MIN, Math.min(minRating, LIMIT_MAX))
	maxRating = Math.max(LIMIT_MIN, Math.min(maxRating, LIMIT_MAX))

	const isSliderDisabled = LIMIT_MIN === LIMIT_MAX

	const handleSliderCommit = ([minVal, maxVal]: [number, number]) => {
		setMultipleParams({
			minRating: String(minVal),
			maxRating: String(maxVal),
		})
	}

	return (
		<div className='border-b border-gray-100 pb-5 last:border-0 last:pb-0'>
			<h4 className='mb-3 select-none text-xs font-bold uppercase tracking-wider text-gray-700'>
				Rating Range
			</h4>

			<div className='pb-2'>
				{isSliderDisabled ? (
					<div className='h-1 w-full rounded-full bg-gray-200 mt-2' />
				) : (
					<RangeSlider
						type='rating'
						min={LIMIT_MIN}
						max={LIMIT_MAX}
						step={0.5}
						value={[minRating, maxRating]}
						onValueCommitted={handleSliderCommit}
					/>
				)}
			</div>
		</div>
	)
}
