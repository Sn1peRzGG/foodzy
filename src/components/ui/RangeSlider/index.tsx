'use client'

import * as Slider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'

interface RangeSliderProps {
	value: [number, number]
	min: number
	max: number
	step?: number
	type: 'price' | 'rating'
	onValueCommitted: (value: [number, number]) => void
}

export default function RangeSlider({
	value,
	min,
	max,
	step = 1,
	type,
	onValueCommitted,
}: RangeSliderProps) {
	const [localValue, setLocalValue] = useState<[number, number]>(value)

	useEffect(() => {
		setLocalValue(value)
	}, [value])

	return (
		<div className='relative flex w-full flex-col select-none touch-none pt-5'>
			<Slider.Root
				className='relative flex h-5 w-full items-center'
				value={localValue}
				min={min}
				max={max}
				step={step}
				onValueChange={val => setLocalValue(val as [number, number])}
				onValueCommit={val => onValueCommitted(val as [number, number])}
			>
				<Slider.Track className='relative h-1 w-full grow rounded-full bg-border-main/60'>
					<Slider.Range className='absolute h-full rounded-full bg-text-main' />
				</Slider.Track>

				<Slider.Thumb
					className='relative block size-4 rounded-full border border-border-strong bg-card-bg cursor-pointer outline-none transition-all focus-visible:ring-text-main'
					aria-label='Minimum value'
				>
					<span className='absolute left-1/2 -translate-x-1/2 -top-6 text-xs font-semibold text-text-main bg-card-bg px-1 whitespace-nowrap font-mono'>
						{type === 'price'
							? `$${localValue[0].toFixed(0)}`
							: `${localValue[0].toFixed(1)}`}
					</span>
				</Slider.Thumb>

				<Slider.Thumb
					className='relative block size-4 rounded-full border border-border-strong bg-card-bg cursor-pointer outline-none transition-all focus-visible:ring-text-main'
					aria-label='Maximum value'
				>
					<span className='absolute left-1/2 -translate-x-1/2 -top-6 text-xs font-semibold text-text-main bg-card-bg px-1 whitespace-nowrap font-mono'>
						{type === 'price'
							? `$${localValue[1].toFixed(0)}`
							: `${localValue[1].toFixed(1)}`}
					</span>
				</Slider.Thumb>
			</Slider.Root>

			<div className='mt-1.5 flex items-center justify-between text-xs text-text-subtle font-mono'>
				<span>{type === 'price' ? `$${min}` : `${min}`}</span>
				<span>{type === 'price' ? `$${max}` : `${max}`}</span>
			</div>
		</div>
	)
}
