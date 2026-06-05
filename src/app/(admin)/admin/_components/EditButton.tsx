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
        inline-flex items-center justify-center gap-2 
        bg-card-bg border border-border-main rounded-lg text-text-muted shadow-sm 
        text-xs font-bold hover:bg-main-bg transition-colors 
        disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer h-8.5
        ${text ? 'px-3 py-1.5' : 'p-1.5'} 
        ${className}
      `}
		>
			<Edit2 size={iconSize} className='text-text-subtle' />
			{text && <span>{text}</span>}
		</button>
	)
}
