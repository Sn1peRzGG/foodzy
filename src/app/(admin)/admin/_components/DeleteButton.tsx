'use client'

import { Trash2 } from 'lucide-react'
import React from 'react'

interface DeleteButtonProps<T = undefined> {
	onDelete: (data?: T) => void
	data?: T
	isLoading?: boolean
	className?: string
	iconSize?: number
}

export default function DeleteButton<T>({
	onDelete,
	data,
	isLoading = false,
	className = '',
	iconSize = 15,
}: DeleteButtonProps<T>) {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onDelete(data)
	}

	return (
		<button
			type='button'
			disabled={isLoading}
			onClick={handleClick}
			className={`
        inline-flex items-center justify-center rounded-xl shrink-0 h-9 w-9
        bg-accent/5 border border-accent/10 text-accent transition-all duration-200
        hover:bg-accent hover:text-white hover:border-accent hover:shadow-md hover:shadow-accent/20
        active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
        cursor-pointer group ${className}
      `}
		>
			<Trash2
				size={iconSize}
				className='transition-transform duration-200 group-hover:scale-110'
			/>
		</button>
	)
}
