'use client'

import ProductCard from '@/src/components/ui/ProductCard'
import ProductFilter from '@/src/components/ui/ProductFilter'
import { SortOption, useProducts } from '@/src/hooks/useProducts'
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	LayoutGrid,
	Rows3,
	SlidersHorizontal,
	X,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ProductsPage() {
	const {
		products,
		meta,
		isLoading,
		error,
		page,
		setPage,
		sortBy,
		setSortBy,
		searchQuery,
		displayName,
	} = useProducts()

	const [isSortOpen, setIsSortOpen] = useState(false)
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
	const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false)

	const dropdownRef = useRef<HTMLDivElement>(null)
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

	const sortLabels: Record<SortOption, string> = {
		default: 'Default (High Rating)',
		'price-asc': 'Price: Low to High',
		'price-desc': 'Price: High to Low',
	}

	useEffect(() => {
		const savedState = window.sessionStorage.getItem('isDesktopFilterOpen')
		if (savedState !== null) {
			setIsDesktopFilterOpen(savedState === 'true')
		}
	}, [])

	useEffect(() => {
		const savedViewMode = window.sessionStorage.getItem('viewMode')
		if (savedViewMode === 'grid' || savedViewMode === 'list') {
			setViewMode(savedViewMode)
		}
	}, [])

	const toggleViewMode = (viewMode: 'grid' | 'list') => {
		setViewMode(prev => {
			const newMode = viewMode
			window.sessionStorage.setItem('viewMode', newMode)
			return newMode
		})
	}

	const toggleDesktopFilter = () => {
		setIsDesktopFilterOpen(prev => {
			const newState = !prev
			window.sessionStorage.setItem('isDesktopFilterOpen', String(newState))
			return newState
		})
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsSortOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (isMobileFilterOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMobileFilterOpen])

	if (error) {
		return (
			<div className='w-full flex items-center justify-center py-20'>
				<p className='text-red-500'>Failed to load products.</p>
			</div>
		)
	}

	return (
		<div className='container-responsive px-4 mx-auto max-w-7xl py-8'>
			<div
				className={`fixed inset-x-0 top-24 bottom-0 z-50 xl:hidden transition-opacity duration-300 backdrop-blur-md ${
					isMobileFilterOpen
						? 'pointer-events-auto opacity-100'
						: 'pointer-events-none opacity-0'
				}`}
			>
				<div
					className='absolute inset-0 bg-black/50'
					onClick={() => setIsMobileFilterOpen(false)}
				/>

				<aside
					className={`absolute left-0 top-0 h-full w-[85%] max-w-xs bg-white border-r border-gray-200 shadow-xl overflow-y-auto transition-transform duration-300 ease-out ${
						isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className='flex items-center justify-between px-4 py-4 border-b border-gray-100'>
						<h2 className='text-lg font-bold text-black'>Filters</h2>

						<button
							type='button'
							onClick={() => setIsMobileFilterOpen(false)}
							className='p-2 border border-gray-200 rounded-[5px] bg-white active:bg-gray-50 cursor-pointer'
						>
							<X className='w-5 h-5 text-black' />
						</button>
					</div>

					<div className='p-4'>
						<ProductFilter />
					</div>
				</aside>
			</div>

			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-100 pb-4'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-black text-black'>
						{searchQuery ? `Results for "${searchQuery}"` : 'Our Products'}
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Category:{' '}
						<span className='font-semibold text-primary'>{displayName}</span> –
						Found {meta?.total || 0} items
					</p>
				</div>

				<div className='flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end'>
					<button
						type='button'
						onClick={() => setIsMobileFilterOpen(true)}
						className='flex xl:hidden items-center gap-2 border border-gray-300 rounded-md h-10 px-4 py-2 bg-white text-black font-medium text-sm shadow-sm hover:bg-gray-100 transition-colors cursor-pointer'
					>
						<SlidersHorizontal size={16} />
						Filters
					</button>

					<div className='flex items-center gap-1 border border-gray-300 rounded-md h-10 px-1.5 bg-white shadow-sm select-none'>
						<button
							type='button'
							onClick={() => toggleViewMode('list')}
							className={`p-1.5 rounded-[5px] transition-all cursor-pointer ${
								viewMode === 'list'
									? 'bg-gray-100 text-primary font-semibold'
									: 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
							}`}
							title='List view'
						>
							<Rows3 size={18} />
						</button>

						<button
							type='button'
							onClick={() => toggleViewMode('grid')}
							className={`p-1.5 rounded-[5px] transition-all cursor-pointer ${
								viewMode === 'grid'
									? 'bg-gray-100 text-primary font-semibold'
									: 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
							}`}
							title='Grid view'
						>
							<LayoutGrid size={18} />
						</button>
					</div>

					<button
						type='button'
						onClick={toggleDesktopFilter}
						className='hidden xl:flex items-center justify-center gap-2 border border-gray-300 rounded-md h-10 w-fit px-4 py-2 bg-white text-black font-medium text-sm shadow-sm hover:bg-gray-100 transition-all select-none cursor-pointer'
					>
						<SlidersHorizontal
							size={16}
							className={`transition-colors duration-200 ${isDesktopFilterOpen ? 'text-primary' : 'text-gray-500'}`}
						/>
						<span className='w-24 text-center'>
							{isDesktopFilterOpen ? 'Hide Filters' : 'Show Filters'}
						</span>
					</button>

					<div
						className='flex items-center gap-2 relative z-30'
						ref={dropdownRef}
					>
						<div
							onClick={() => setIsSortOpen(!isSortOpen)}
							className='flex flex-row items-center justify-between border border-gray-300 rounded-md h-10 px-4 py-2 cursor-pointer relative select-none bg-white min-w-44 sm:min-w-56 text-black shadow-sm transition-all focus-within:border-primary hover:bg-gray-100'
						>
							<p className='text-[13px] font-medium whitespace-nowrap mr-2 text-gray-700'>
								{sortLabels[sortBy]}
							</p>
							<ChevronDown
								className={`transition-transform duration-300 text-gray-500 ${isSortOpen ? 'rotate-180' : ''}`}
								size={18}
							/>

							{isSortOpen && (
								<ul className='absolute right-0 w-full mt-1 top-full z-50 rounded-md border border-gray-100 bg-white p-1.5 shadow-lg left-0'>
									{(Object.keys(sortLabels) as SortOption[]).map(option => (
										<li key={option}>
											<button
												type='button'
												onClick={e => {
													e.stopPropagation()
													setSortBy(option)
													setIsSortOpen(false)
												}}
												className={`block w-full cursor-pointer text-left rounded-sm px-4 py-2 text-sm transition-colors ${
													sortBy === option
														? 'bg-gray-50 text-primary font-semibold'
														: 'text-gray-700 hover:bg-gray-100'
												}`}
											>
												{sortLabels[option]}
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-4 gap-8 items-start'>
				{isDesktopFilterOpen && (
					<aside className='hidden xl:block xl:col-span-1 sticky top-40 animate-in fade-in duration-200'>
						<ProductFilter />
					</aside>
				)}

				<main
					className={`w-full transition-all duration-300 ${
						isDesktopFilterOpen ? 'xl:col-span-3' : 'xl:col-span-4'
					}`}
				>
					{isLoading && products.length === 0 ? (
						<div className='text-center py-20 text-gray-500'>
							Loading products...
						</div>
					) : products.length === 0 ? (
						<div className='text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200'>
							<p className='text-gray-500 text-lg'>
								We couldn&apos;t find anything matching your request.
							</p>
							<Link
								href='/'
								className='text-primary font-semibold mt-2 inline-block hover:underline'
							>
								Go back home
							</Link>
						</div>
					) : (
						<>
							<div
								className={`transition-all duration-300 ${
									viewMode === 'grid'
										? `grid grid-cols-1 sm:grid-cols-2 gap-6 ${
												isDesktopFilterOpen
													? 'lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3'
													: 'lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
											}`
										: 'flex flex-col gap-4'
								}`}
							>
								{products.map(product => (
									<ProductCard
										key={product._id}
										viewMode={viewMode}
										{...product}
									/>
								))}
							</div>

							{meta && meta.pages > 1 && (
								<div className='flex justify-center items-center gap-3 mt-12'>
									<button
										type='button'
										onClick={() => setPage(prev => Math.max(1, prev - 1))}
										disabled={page === 1}
										className='p-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-200/75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
									>
										<ChevronLeft />
									</button>

									<span className='text-sm text-gray-700'>
										Page <strong className='font-semibold'>{page}</strong> of{' '}
										<strong className='font-semibold'>{meta.pages}</strong>
									</span>

									<button
										type='button'
										onClick={() =>
											setPage(prev => Math.min(meta.pages, prev + 1))
										}
										disabled={page === meta.pages}
										className='p-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-200/75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
									>
										<ChevronRight />
									</button>
								</div>
							)}
						</>
					)}
				</main>
			</div>
		</div>
	)
}
