'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	limit: number
	onLimitChange?: (limit: number) => void
	limitOptions?: number[]
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	limit,
	onLimitChange,
	limitOptions = [12, 24, 48, 96],
}: PaginationProps) {
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

	if (totalPages <= 1 && !onLimitChange) return null

	const getPageNumbers = () => {
		const pages: (number | string)[] = []
		const range = 1

		pages.push(1)

		if (currentPage - range > 2) {
			pages.push('...')
		}

		const start = Math.max(2, currentPage - range)
		const end = Math.min(totalPages - 1, currentPage + range)

		for (let i = start; i <= end; i++) {
			pages.push(i)
		}

		if (currentPage + range < totalPages - 1) {
			pages.push('...')
		}

		if (totalPages > 1) {
			pages.push(totalPages)
		}

		return pages
	}

	return (
		<div className='flex flex-col sm:flex-row justify-between items-center gap-5 mt-12 pt-6 border-t border-border-main w-full select-none'>
			{onLimitChange ? (
				<div className='flex items-center gap-3 text-sm text-text-muted'>
					<span className='font-medium text-text-muted/80'>Show per page:</span>
					<div className='relative z-20' ref={dropdownRef}>
						<div
							onClick={() => setIsOpen(!isOpen)}
							className='flex flex-row items-center justify-between border border-border-strong rounded-lg h-10 px-3.5 cursor-pointer min-w-25 bg-card-bg text-text-main shadow-sm transition-all hover:bg-ui-hover hover:border-border-main'
						>
							<p className='text-sm font-semibold text-text-main flex items-center h-full leading-none mt-px'>
								{limit}
							</p>
							<ChevronDown
								className={`transition-transform duration-200 text-text-muted shrink-0 ${isOpen ? 'rotate-180 text-text-main' : ''}`}
								size={15}
							/>

							<ul
								className={`absolute left-0 w-full mt-1.5 top-full z-50 rounded-lg border border-border-main bg-card-bg p-1.5 shadow-xl origin-top transition-all duration-200 ease-out ${
									isOpen
										? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
										: 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
								}`}
							>
								{limitOptions.map(option => (
									<li key={option}>
										<button
											type='button'
											onClick={e => {
												e.stopPropagation()
												onLimitChange(option)
												setIsOpen(false)
											}}
											className={`block w-full cursor-pointer text-left rounded-md px-3 py-2 text-sm font-medium transition-colors ${
												limit === option
													? 'bg-main-bg text-primary font-bold'
													: 'text-text-muted hover:bg-ui-hover hover:text-text-main'
											}`}
										>
											{option}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			) : (
				<div className='hidden sm:block' />
			)}

			<div className='flex items-center gap-1.5 bg-main-bg/40 p-1 rounded-xl border border-border-main/60 shadow-sm'>
				<button
					type='button'
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
					className='p-2 border border-transparent rounded-lg text-text-muted hover:text-text-main hover:bg-ui-hover active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:transform-none disabled:text-text-muted cursor-pointer h-10 w-10 flex items-center justify-center'
					title='Previous page'
				>
					<ChevronLeft size={18} strokeWidth={2.2} />
				</button>

				<div className='flex items-center gap-1.5'>
					{getPageNumbers().map((pageNumber, index) => {
						if (pageNumber === '...') {
							return (
								<span
									key={`ellipsis-${index}`}
									className='w-10 h-10 flex items-end justify-center pb-2.5 text-text-subtle select-none text-sm font-bold tracking-tight'
								>
									...
								</span>
							)
						}

						const isActive = pageNumber === currentPage

						return (
							<button
								key={`page-${pageNumber}`}
								type='button'
								onClick={() => onPageChange(pageNumber as number)}
								className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all cursor-pointer ${
									isActive
										? 'bg-primary text-white font-bold shadow-md shadow-primary/10 border border-primary scale-100'
										: 'bg-transparent text-text-muted hover:bg-ui-hover hover:text-text-main border border-transparent active:scale-95'
								}`}
							>
								<span className='mt-px'>{pageNumber}</span>
							</button>
						)
					})}
				</div>

				<button
					type='button'
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
					className='p-2 border border-transparent rounded-lg text-text-muted hover:text-text-main hover:bg-ui-hover active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:transform-none disabled:text-text-muted cursor-pointer h-10 w-10 flex items-center justify-center'
					title='Next page'
				>
					<ChevronRight size={18} strokeWidth={2.2} />
				</button>
			</div>
		</div>
	)
}
