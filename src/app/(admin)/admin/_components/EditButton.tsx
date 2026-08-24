'use client'

import { Edit2 } from 'lucide-react'
import React from 'react'

interface EditButtonProps<T = undefined> {
	onEdit: (data?: T) => void
	data?: T
	isLoading?: boolean
	text?: string | null
	className?: string
	iconSize?: number
}

export default function EditButton<T>({
	onEdit,
	data,
	isLoading = false,
	text = 'Modify',
	className = '',
	iconSize = 14,
}: EditButtonProps<T>) {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onEdit(data)
	}

	return (
		<button
			type='button'
			disabled={isLoading}
			onClick={handleClick}
			className={`
        inline-flex items-center justify-center gap-1.5 rounded-xl shrink-0 h-9
        bg-primary/5 border border-primary/15 text-primary text-xs font-bold tracking-wide
        transition-colors duration-200 hover:bg-primary hover:text-white hover:border-primary
        disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
        cursor-pointer ${text ? 'px-3.5' : 'w-9'} ${className}
      `}
		>
			<Edit2 size={iconSize} />
			{text && <span>{text}</span>}
		</button>
	)
}
