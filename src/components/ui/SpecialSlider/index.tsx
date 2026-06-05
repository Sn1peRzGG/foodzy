'use client'

import { ProductType } from '@/src/types/product'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import SpecialCard from '../SpecialCard'

interface SpecialSliderProps {
	products: ProductType[]
}

interface SpecialSliderRef {
	next: () => void
	prev: () => void
}

const SpecialSlider = forwardRef<SpecialSliderRef, SpecialSliderProps>(
	(props, ref) => {
		const { products } = props
		const [currentIndex, setCurrentIndex] = useState(0)
		const [itemsPerPage, setItemsPerPage] = useState(3)

		useEffect(() => {
			const updateItemsPerPage = () => {
				if (window.innerWidth >= 1280) {
					setItemsPerPage(3)
				} else if (window.innerWidth >= 768) {
					setItemsPerPage(2)
				} else {
					setItemsPerPage(1)
				}
			}

			updateItemsPerPage()
			window.addEventListener('resize', updateItemsPerPage)
			return () => window.removeEventListener('resize', updateItemsPerPage)
		}, [])

		const maxIndex = Math.max(0, products.length - itemsPerPage)

		useEffect(() => {
			if (currentIndex > maxIndex) {
				setCurrentIndex(maxIndex)
			}
		}, [itemsPerPage, maxIndex, currentIndex])

		const next = () => {
			setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
		}

		const prev = () => {
			setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1))
		}

		useImperativeHandle(ref, () => ({
			next,
			prev,
		}))

		if (!products.length) return null

		return (
			<div className='w-full overflow-hidden px-1 py-4 box-border relative'>
				<div
					className='flex items-stretch transition-transform duration-500 ease-in-out box-border relative'
					style={{
						transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
					}}
				>
					{products.map(product => (
						<div
							key={product._id}
							style={{ width: `${100 / itemsPerPage}%` }}
							className='flex-none px-2 md:px-3 py-2 flex box-border relative transition-all duration-300 hover:z-30'
						>
							<div className='w-full h-full flex flex-col items-center'>
								<SpecialCard {...product} />
							</div>
						</div>
					))}
				</div>

				<div className='flex justify-center gap-2 mt-8 md:mt-10'>
					{Array.from({ length: maxIndex + 1 }).map((_, index) => (
						<button
							key={index}
							type='button'
							onClick={() => setCurrentIndex(index)}
							className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
								currentIndex === index ? 'w-7 bg-accent' : 'w-2.5 bg-gray-200'
							}`}
						/>
					))}
				</div>
			</div>
		)
	},
)

SpecialSlider.displayName = 'SpecialSlider'
export default SpecialSlider
