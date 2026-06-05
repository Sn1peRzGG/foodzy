'use client'

import { useProducts } from '@/src/hooks/useProducts'

export default function StatusFilter() {
	const { getParam, setCheckboxParam } = useProducts()

	const isAvailable = getParam('isAvailable') === 'true'
	const isOnSale = getParam('onSale') === 'true'

	return (
		<div className='border-b border-border-main pb-5 last:border-0 last:pb-0'>
			<h4 className='text-xs font-bold uppercase tracking-wider text-text-muted mb-3 select-none'>
				Status
			</h4>

			<div className='space-y-2.5 text-sm'>
				<label className='flex items-center gap-3 cursor-pointer group select-none'>
					<div className='relative flex items-center justify-center'>
						<input
							type='checkbox'
							checked={isAvailable}
							onChange={e => setCheckboxParam('isAvailable', e.target.checked)}
							className='peer sr-only'
						/>
						<div
							className='w-4 h-4 rounded border border-border-strong bg-card-bg transition-all duration-200 
              peer-checked:bg-primary peer-checked:border-primary
              group-hover:border-border-strong peer-focus-visible:ring-2 peer-focus-visible:ring-text-main/20'
						/>
						<svg
							className='absolute w-2.5 h-2.5 text-white scale-0 transition-transform duration-200 peer-checked:scale-100 pointer-events-none'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={3.5}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.5 12.75l6 6 9-13.5'
							/>
						</svg>
					</div>
					<span
						className={`text-sm transition-colors duration-200 group-hover:text-text-main ${
							isAvailable ? 'font-semibold text-text-main' : 'text-text-muted'
						}`}
					>
						In Stock
					</span>
				</label>

				<label className='flex items-center gap-3 cursor-pointer group select-none'>
					<div className='relative flex items-center justify-center'>
						<input
							type='checkbox'
							checked={isOnSale}
							onChange={e => setCheckboxParam('onSale', e.target.checked)}
							className='peer sr-only'
						/>
						<div
							className='w-4 h-4 rounded border border-border-strong bg-card-bg transition-all duration-200 
              peer-checked:bg-primary peer-checked:border-primary
              group-hover:border-border-strong peer-focus-visible:ring-2 peer-focus-visible:ring-text-main/20'
						/>
						<svg
							className='absolute w-2.5 h-2.5 text-white scale-0 transition-transform duration-200 peer-checked:scale-100 pointer-events-none'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={3.5}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.5 12.75l6 6 9-13.5'
							/>
						</svg>
					</div>
					<span
						className={`text-sm transition-colors duration-200 group-hover:text-text-main ${
							isOnSale ? 'font-semibold text-text-main' : 'text-text-muted'
						}`}
					>
						On Sale
					</span>
				</label>
			</div>
		</div>
	)
}
