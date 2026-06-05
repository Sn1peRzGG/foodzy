'use client'

import { useProducts } from '@/src/hooks/useProducts'
import RangeSlider from '../RangeSlider'

const DEFAULT_MIN = 0
const DEFAULT_MAX = 1000

export default function PriceRangeFilter() {
	const { getParam, setMultipleParams, meta } = useProducts()

	const LIMIT_MIN =
		meta && 'minPrice' in meta && meta.minPrice !== undefined
			? Number(meta.minPrice)
			: DEFAULT_MIN
	const LIMIT_MAX =
		meta && 'maxPrice' in meta && meta.maxPrice !== undefined
			? Number(meta.maxPrice)
			: DEFAULT_MAX

	const rawMin = getParam('minPrice')
	const rawMax = getParam('maxPrice')

	let minPrice =
		rawMin !== null && !isNaN(Number(rawMin)) ? Number(rawMin) : LIMIT_MIN
	let maxPrice =
		rawMax !== null && !isNaN(Number(rawMax)) ? Number(rawMax) : LIMIT_MAX

	minPrice = Math.max(LIMIT_MIN, Math.min(minPrice, LIMIT_MAX))
	maxPrice = Math.max(LIMIT_MIN, Math.min(maxPrice, LIMIT_MAX))

	const isSliderDisabled = LIMIT_MIN === LIMIT_MAX

	const handleSliderCommit = ([minVal, maxVal]: [number, number]) => {
		setMultipleParams({
			minPrice: String(minVal),
			maxPrice: String(maxVal),
		})
	}

	return (
		<div className='border-b border-border-main pb-5 last:border-0 last:pb-0'>
			<h4 className='mb-3 select-none text-xs font-bold uppercase tracking-wider text-text-muted'>
				Price Range
			</h4>

			<div className='pb-2'>
				{isSliderDisabled ? (
					<div className='h-1 w-full rounded-full bg-gray-200 mt-2' />
				) : (
					<RangeSlider
						type='price'
						min={LIMIT_MIN}
						max={LIMIT_MAX}
						step={1}
						value={[minPrice, maxPrice]}
						onValueCommitted={handleSliderCommit}
					/>
				)}
			</div>
		</div>
	)
}
