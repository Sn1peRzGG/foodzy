'use client'

import { useProductSearch } from '@/src/hooks/useProductSearch'
import {
	ChevronDown,
	Heart,
	Menu,
	Search,
	ShoppingCart,
	User,
	X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SearchBarProps {
	isMenuOpen: boolean
	setIsMenuOpen: (open: boolean) => void
}

export default function SearchBar({
	isMenuOpen,
	setIsMenuOpen,
}: SearchBarProps) {
	const {
		searchRef,
		query,
		setQuery,
		isSearchOpen,
		setIsSearchOpen,
		searchResults,
		isDropdownOpen,
		setIsDropdownOpen,
		selectedCategory,
		setSelectedCategory,
		handleSearchSubmit,
		categories,
	} = useProductSearch()

	const userMenuItems = [
		{ label: 'Account', href: '/account', icon: <User size={20} /> },
		{ label: 'Wishlist', href: '/wishlist', icon: <Heart size={20} /> },
		{ label: 'Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
	]

	return (
		<div
			className='w-full px-4 md:px-12 xl:px-0 xl:w-2/3 h-full flex items-center justify-between relative gap-2 md:gap-4 max-w-360 mx-auto'
			ref={searchRef}
		>
			<div className='flex items-center xl:hidden shrink-0'>
				<button
					type='button'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className='p-2 border border-gray-200 rounded-[5px] bg-white active:bg-gray-50 cursor-pointer'
				>
					<Menu className='w-5 h-5 text-black' />
				</button>
			</div>

			<Link
				href='/'
				className='hidden sm:flex flex-row select-none cursor-pointer shrink-0'
			>
				<Image
					src='/logo.png'
					alt='Logo'
					width={82}
					height={82}
					className='w-14 h-14 xl:w-20.5 xl:h-20.5 object-contain'
				/>
				<div className='flex flex-col justify-center -ml-2'>
					<h2 className='text-lg xl:text-[24px] font-black leading-tight'>
						Foodzy
					</h2>
					<p className='text-[10px] xl:text-[12px] font-semibold -mt-0.5 text-black'>
						A Treasure of Tastes
					</p>
				</div>
			</Link>

			<div className='flex flex-1 xl:flex-none xl:w-125 h-10 md:h-11.25 rounded-[5px] border border-[#64B496] flex-row justify-between items-center relative bg-white'>
				<div className='pl-3 md:pl-4 py-2 flex-1 flex items-center gap-2'>
					<input
						type='text'
						placeholder='Search...'
						value={query}
						onChange={e => {
							setQuery(e.target.value)
							setIsSearchOpen(true)
						}}
						onFocus={() => setIsSearchOpen(true)}
						onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
						className='focus:outline-none w-full text-sm text-black bg-transparent'
					/>
					{query && (
						<button
							type='button'
							onClick={() => setQuery('')}
							className='text-gray-400 hover:text-black mr-1 cursor-pointer'
						>
							<X size={16} />
						</button>
					)}
				</div>

				<div
					className='hidden lg:flex flex-row items-center justify-center border-l border-l-[#64B496] h-full p-3 cursor-pointer relative select-none'
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<p className='text-[13px] font-regular whitespace-nowrap mr-1 text-gray-700'>
						{selectedCategory}
					</p>
					<ChevronDown
						className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
						size={18}
					/>
					{isDropdownOpen && (
						<ul className='absolute right-0 w-64 mt-1 top-full z-100 rounded-md border border-gray-100 bg-white p-2 shadow-lg'>
							<li>
								<button
									type='button'
									onClick={e => {
										e.stopPropagation()
										setSelectedCategory('All Categories')
										setIsDropdownOpen(false)
									}}
									className={`block w-full cursor-pointer text-left rounded-sm px-4 py-2 text-sm ${selectedCategory === 'All Categories' ? 'bg-gray-50 text-[#64B496] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
								>
									All Categories
								</button>
							</li>
							<div className='h-px bg-gray-100 my-1' />
							{categories.map(category => (
								<li key={category.categoryId} className='cursor-pointer'>
									<button
										type='button'
										onClick={e => {
											e.stopPropagation()
											setSelectedCategory(category.name)
											setIsDropdownOpen(false)
										}}
										className={`block w-full cursor-pointer text-left rounded-sm px-4 py-2 text-sm ${selectedCategory === category.name ? 'bg-gray-50 text-[#64B496] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
									>
										{category.name}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>

				<button
					type='button'
					onClick={handleSearchSubmit}
					className='w-10 h-10 md:w-11.25 md:h-11.25 rounded-r-sm bg-[#2B2B2D] flex items-center justify-center cursor-pointer hover:opacity-90 border-none shrink-0'
				>
					<Search color='white' size={18} />
				</button>

				{isSearchOpen && query && (
					<div className='absolute left-0 mt-2 top-full w-full bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden z-50'>
						{searchResults.length > 0 ? (
							<>
								<ul className='max-h-80 overflow-y-auto divide-y divide-gray-100'>
									{searchResults.slice(0, 5).map(product => (
										<li key={product.productId}>
											<Link
												href={`/products/${product.productId}`}
												onClick={() => setIsSearchOpen(false)}
												className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50'
											>
												<div className='relative w-10 h-10 shrink-0 bg-gray-50 rounded-md overflow-hidden'>
													<Image
														src={product.imageUrl}
														alt={product.name}
														fill
														className='object-cover'
													/>
												</div>
												<div className='overflow-hidden flex-1'>
													<p className='text-sm font-medium text-black truncate'>
														{product.name}
													</p>
													<p className='text-xs text-gray-500 truncate'>
														{product.description}
													</p>
												</div>
												<span className='text-sm font-bold text-[#64B496]'>
													${product.price}
												</span>
											</Link>
										</li>
									))}
								</ul>
								<button
									type='button'
									onClick={handleSearchSubmit}
									className='w-full text-center block bg-gray-50 py-2.5 text-xs font-bold text-[#64B496] border-t border-gray-100 uppercase tracking-wider cursor-pointer'
								>
									View All Results ({searchResults.length})
								</button>
							</>
						) : (
							<div className='px-4 py-4 text-sm text-gray-500 text-center'>
								No products found
							</div>
						)}
					</div>
				)}
			</div>

			<div className='shrink-0'>
				<ul className='text-[15px] font-medium flex flex-row list-none gap-3 md:gap-6'>
					{userMenuItems.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='flex items-center gap-2 hover:text-[#64B496] text-black'
							>
								{item.icon}
								<span className='hidden md:inline'>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
