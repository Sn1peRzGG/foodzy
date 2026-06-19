'use client'

import Pagination from '@/src/components/ui/Pagination'
import ProductCard from '@/src/components/ui/ProductCard'
import ProductCardSkeleton from '@/src/components/ui/ProductCardSkeleton'
import ProductFilter from '@/src/components/ui/ProductFilter'
import SortDropdown from '@/src/components/ui/SortDropdown'
import { SortOption, useProducts } from '@/src/hooks/useProducts'
import { LayoutGrid, Rows3, SlidersHorizontal, X } from 'lucide-react'
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
		limit,
		setLimit,
		sortBy,
		setSortBy,
		searchQuery,
		displayName,
	} = useProducts()

	const [isSortOpen, setIsSortOpen] = useState(false)
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
	const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

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

		const savedViewMode = window.sessionStorage.getItem('productsViewMode')
		if (savedViewMode === 'grid' || savedViewMode === 'list') {
			setViewMode(savedViewMode)
		}

		setIsMounted(true)
	}, [])

	const toggleViewMode = (viewMode: 'grid' | 'list') => {
		setViewMode(prev => {
			const newMode = viewMode
			window.sessionStorage.setItem('productsViewMode', newMode)
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

	if (!isMounted) {
		return (
			<div className='w-full flex items-center justify-center py-20'>
				<div className='text-text-muted animate-pulse'>Loading...</div>
			</div>
		)
	}

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
				className={`fixed inset-x-0 top-24 bottom-0 z-50 xl:hidden transition-opacity duration-200 backdrop-blur-md ${
					isMobileFilterOpen
						? 'pointer-events-auto opacity-100'
						: 'pointer-events-none opacity-0'
				}`}
			>
				<div
					className='absolute inset-0 bg-main-bg/50'
					onClick={() => setIsMobileFilterOpen(false)}
				/>

				<aside
					className={`absolute left-0 top-0 h-full w-[85%] max-w-xs bg-card-bg border-r border-border-main shadow-xl overflow-y-auto transition-transform duration-200 ease-out ${
						isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className='flex items-center justify-between px-4 py-4 border-b border-border-main'>
						<h2 className='text-lg font-bold text-text-main'>Filters</h2>

						<button
							type='button'
							onClick={() => setIsMobileFilterOpen(false)}
							className='p-2 border border-border-main rounded-md bg-card-bg active:bg-ui-active cursor-pointer'
						>
							<X className='w-5 h-5 text-text-main' />
						</button>
					</div>

					<div className='p-4'>
						<ProductFilter />
					</div>
				</aside>
			</div>

			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-border-main pb-4'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-black text-text-main'>
						{searchQuery ? `Results for "${searchQuery}"` : 'Our Products'}
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Category:{' '}
						<span className='font-semibold text-primary'>{displayName}</span> –
						Found {meta?.total || 0} items
					</p>
				</div>

				<div className='flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end'>
					<button
						type='button'
						onClick={() => setIsMobileFilterOpen(true)}
						className='flex xl:hidden items-center gap-2 border border-border-strong rounded-md h-10 px-4 py-2 bg-card-bg text-text-main font-medium text-sm shadow-sm hover:bg-ui-hover transition-colors cursor-pointer'
					>
						<SlidersHorizontal size={16} />
						Filters
					</button>

					<div className='flex items-center gap-1 border border-border-strong rounded-md h-10 px-1.5 bg-card-bg shadow-sm select-none'>
						<button
							type='button'
							onClick={() => toggleViewMode('list')}
							className={`p-1.5 rounded-md transition-all cursor-pointer ${
								viewMode === 'list'
									? 'bg-ui-hover text-primary font-semibold'
									: 'text-text-subtle hover:text-text-muted hover:bg-main-bg'
							}`}
							title='List view'
						>
							<Rows3 size={18} />
						</button>

						<button
							type='button'
							onClick={() => toggleViewMode('grid')}
							className={`p-1.5 rounded-md transition-all cursor-pointer ${
								viewMode === 'grid'
									? 'bg-ui-hover text-primary font-semibold'
									: 'text-text-subtle hover:text-text-muted hover:bg-main-bg'
							}`}
							title='Grid view'
						>
							<LayoutGrid size={18} />
						</button>
					</div>

					<button
						type='button'
						onClick={toggleDesktopFilter}
						className='hidden xl:flex items-center justify-center gap-2 border border-border-strong rounded-md h-10 w-fit px-4 py-2 bg-card-bg text-text-main font-medium text-sm shadow-sm hover:bg-ui-hover transition-all select-none cursor-pointer'
					>
						<SlidersHorizontal
							size={16}
							className={`transition-colors duration-200 ${isDesktopFilterOpen ? 'text-primary' : 'text-text-muted'}`}
						/>
						<span className='w-24 text-center'>
							{isDesktopFilterOpen ? 'Hide Filters' : 'Show Filters'}
						</span>
					</button>

					<SortDropdown
						value={sortBy}
						onChange={setSortBy}
						options={sortLabels}
						className='min-w-44 sm:min-w-56'
					/>
				</div>
			</div>

			<div className='flex flex-col xl:flex-row gap-8 items-start'>
				<aside
					className={`hidden xl:block sticky top-40 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
						isDesktopFilterOpen
							? 'w-64 opacity-100 translate-x-0 blur-none mr-0 visible'
							: 'w-0 opacity-0 -translate-x-10 blur-sm -mr-8 invisible pointer-events-none'
					}`}
				>
					<div className='w-64'>
						<ProductFilter />
					</div>
				</aside>

				<div className='w-full transition-all duration-200 ease-in-out'>
					{isLoading && products.length === 0 ? (
						<div
							className={`transition-all duration-200 ${
								viewMode === 'grid'
									? `grid grid-cols-1 sm:grid-cols-2 gap-6 ${
											isDesktopFilterOpen
												? 'lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3'
												: 'lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
										}`
									: 'flex flex-col gap-4'
							}`}
						>
							{Array.from({ length: viewMode === 'grid' ? 8 : 4 }).map(
								(_, index) => (
									<ProductCardSkeleton key={index} viewMode={viewMode} />
								),
							)}
						</div>
					) : products.length === 0 ? (
						<div className='text-center py-20 bg-main-bg rounded-xl border border-dashed border-border-main'>
							<p className='text-text-muted text-lg'>
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
								className={`transition-all duration-200 ${
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
										product={product}
									/>
								))}
							</div>

							{meta && (
								<Pagination
									currentPage={page}
									totalPages={meta.pages}
									onPageChange={setPage}
									limit={limit}
									onLimitChange={setLimit}
									limitOptions={[12, 24, 48, 72]}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
