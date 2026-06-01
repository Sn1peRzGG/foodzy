'use client'

import { useRef } from 'react'
import ControlButton from '@/src/components/ui/ControlButton'
import SpecialSlider from '../ui/SpecialSlider'
import { useSpecialProducts } from '@/src/hooks/useSpecialProducts'

export default function SpecialSection() {
	const { specialProducts, isLoading } = useSpecialProducts()

	const sliderRef = useRef<{ next: () => void; prev: () => void }>(null)

	if (isLoading) {
		return (
			<div className='w-full py-12 flex items-center justify-center'>
				<div className='text-sm font-medium text-gray-400 animate-pulse uppercase tracking-widest'>
					Loading Special Menu...
				</div>
			</div>
		)
	}

	if (specialProducts.length === 0) return null

	return (
		<div className='flex flex-col w-full gap-6 md:gap-8 lg:gap-10 relative mt-6 select-none'>
			<div className='flex flex-row justify-between items-start gap-4 md:gap-6 lg:gap-12 px-2'>
				<div className='flex flex-col justify-start gap-2 md:gap-3 lg:gap-10 flex-1'>
					<h2 className='text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-accent tracking-[0.175em] uppercase'>
						Special Dishes
					</h2>
					<p className='text-xl sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold leading-[1.315] max-w-[15ch]'>
						Standout Dishes From Our Menu
					</p>
				</div>

				<div className='flex gap-2 md:gap-3 lg:gap-4 shrink-0 my-auto xl:pr-8'>
					<div onClick={() => sliderRef.current?.prev()}>
						<ControlButton
							orientation='left'
							backgroundColor='#EFEFEF'
							textColor='#6F6E6E'
						/>
					</div>
					<div onClick={() => sliderRef.current?.next()}>
						<ControlButton
							orientation='right'
							backgroundColor='#F53E32'
							textColor='white'
						/>
					</div>
				</div>
			</div>

			<SpecialSlider products={specialProducts} ref={sliderRef} />
		</div>
	)
}
