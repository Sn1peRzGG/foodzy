'use client'

import { Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/src/hooks/useDebounce'

interface Props {
	item: any
	isLoading: boolean
	onUpdate: (id: string, quantity: number) => void
}

const MIN = 1
const MAX = 100

export default function CartQuantityInput({
	item,
	isLoading,
	onUpdate,
}: Props) {
	const [localQuantity, setLocalQuantity] = useState(item.quantity)
	const [isDirty, setIsDirty] = useState(false)

	const debouncedQuantity = useDebounce(localQuantity, 200)

	useEffect(() => {
		if (!isDirty && localQuantity !== item.quantity) {
			setLocalQuantity(item.quantity)
		}
	}, [item.quantity, isDirty, localQuantity])

	useEffect(() => {
		if (
			isDirty &&
			debouncedQuantity >= MIN &&
			debouncedQuantity <= MAX &&
			debouncedQuantity !== item.quantity
		) {
			onUpdate(item.product._id, debouncedQuantity)
		}
	}, [debouncedQuantity, item.quantity, item.product._id, onUpdate, isDirty])

	useEffect(() => {
		if (item.quantity === debouncedQuantity) {
			setIsDirty(false)
		}
	}, [item.quantity, debouncedQuantity])

	const handleValueChange = (newValue: number) => {
		const clampedValue = Math.min(Math.max(newValue, MIN), MAX)
		setIsDirty(true)
		setLocalQuantity(clampedValue)
	}

	const isMin = localQuantity <= MIN
	const isMax = localQuantity >= MAX

	return (
		<div className='flex justify-center'>
			<div
				className={`inline-flex items-center rounded-[5px] bg-white border border-[#E9E9E9] h-8 overflow-hidden text-black transition-opacity ${
					isLoading ? 'opacity-70 pointer-events-none' : ''
				}`}
			>
				<div className='flex h-8 items-center'>
					<button
						type='button'
						disabled={isLoading || isMin}
						onClick={() => handleValueChange(localQuantity - 1)}
						className='h-full px-2.5 flex items-center justify-center border-r border-[#E9E9E9] disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-gray-100 cursor-pointer transition-colors'
					>
						<Minus size={14} />
					</button>

					<input
						type='text'
						value={localQuantity}
						onChange={e => {
							const val = parseInt(e.target.value)
							if (!isNaN(val)) handleValueChange(val)
						}}
						className='h-full w-12 text-center text-sm focus:outline-none bg-transparent tabular-nums font-medium'
					/>

					<button
						type='button'
						disabled={isLoading || isMax}
						onClick={() => handleValueChange(localQuantity + 1)}
						className='h-full px-2.5 flex items-center justify-center border-l border-[#E9E9E9] disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-gray-100 cursor-pointer transition-colors'
					>
						<Plus size={14} />
					</button>
				</div>
			</div>
		</div>
	)
}
