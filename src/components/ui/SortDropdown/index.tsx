'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SortDropdownProps<T extends string> {
	value: T
	onChange: (value: T) => void
	options: Record<T, string>
	className?: string
}

export default function SortDropdown<T extends string>({
	value,
	onChange,
	options,
	className = 'min-w-44 sm:min-w-56',
}: SortDropdownProps<T>) {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className='flex items-center gap-2 relative z-30' ref={dropdownRef}>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className={`flex flex-row items-center justify-between border border-border-strong rounded-md h-10 px-4 cursor-pointer relative select-none bg-card-bg text-text-main shadow-sm transition-all focus-within:border-primary hover:bg-ui-hover ${className}`}
			>
				<p className='text-sm font-medium whitespace-nowrap mr-2 text-text-main flex items-center h-full leading-none'>
					{options[value]}
				</p>
				<ChevronDown
					className={`transition-transform duration-200 text-text-muted shrink-0 ${isOpen ? 'rotate-180' : ''}`}
					size={16}
				/>

				<ul
					className={`absolute right-0 w-full mt-1 top-full z-50 rounded-md border border-border-main bg-card-bg p-1.5 shadow-lg left-0 origin-top transition-all duration-200 ease-out ${
						isOpen
							? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
							: 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
					}`}
				>
					{(Object.keys(options) as T[]).map(option => (
						<li key={option}>
							<button
								type='button'
								onClick={e => {
									e.stopPropagation()
									onChange(option)
									setIsOpen(false)
								}}
								className={`block w-full cursor-pointer text-left rounded-sm px-4 py-2 text-sm transition-colors ${
									value === option
										? 'bg-main-bg text-primary font-semibold'
										: 'text-text-muted hover:bg-ui-hover'
								}`}
							>
								{options[option]}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
