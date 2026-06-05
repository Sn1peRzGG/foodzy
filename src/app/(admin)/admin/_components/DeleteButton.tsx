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
	iconSize = 16,
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
        inline-flex items-center justify-center p-1.5 
        bg-card-bg border border-border-main rounded-lg text-text-subtle shadow-sm 
        hover:text-red-600 hover:border-red-200 hover:bg-red-50 
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed 
        shrink-0 cursor-pointer h-8.5 w-8.5 ${className}
      `}
		>
			<Trash2 size={iconSize} />
		</button>
	)
}
