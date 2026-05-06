'use client'

import {
	ChevronDown,
	Heart,
	Search,
	ShoppingCart,
	User,
	X,
	Menu,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useProductSearch } from '@/src/hooks/useProductSearch'

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
		categories,
		handleSearchSubmit,
	} = useProductSearch()

	const userMenuItems = [
		{ label: 'Account', href: '/account', icon: <User size={20} /> },
		{ label: 'Wishlist', href: '/wishlist', icon: <Heart size={20} /> },
		{ label: 'Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
	]

	return (
		<div
			className='w-full px-4 md:px-12 xl:px-0 xl:w-2/3 h-full xl:h-3/5 flex items-center justify-between relative gap-4 max-w-360'
			ref={searchRef}
		>
			<div className='flex items-center xl:hidden'>
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className='p-2 border border-gray-200 rounded-[5px] bg-white active:bg-gray-50 cursor-pointer'
				>
					<Menu className='w-5 h-5 text-black' />
				</button>
			</div>

			<Link
				href='/'
				className='flex flex-row select-none cursor-pointer shrink-0'
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

			<div className='hidden sm:flex flex-1 xl:flex-none xl:w-125 h-11.25 rounded-[5px] border border-[#64B496] flex-row justify-between items-center relative bg-white'>
				<div className='pl-4 py-3 flex-1 flex items-center gap-2'>
					<input
						type='text'
						placeholder='Search for items...'
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
							onClick={() => setQuery('')}
							className='text-gray-400 hover:text-black mr-2 cursor-pointer transition-colors duration-200'
						>
							<X size={16} />
						</button>
					)}
				</div>

				<div
					className='flex flex-row items-center justify-center border-l border-l-[#64B496] h-full p-3 cursor-pointer relative select-none'
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
						<ul className='absolute right-0 w-64 mt-1 top-full z-100 rounded-md border border-gray-100 bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2'>
							<li>
								<button
									onClick={e => {
										e.stopPropagation()
										setSelectedCategory('All Categories')
										setIsDropdownOpen(false)
									}}
									className={`block w-full text-left rounded-sm px-4 py-2 text-sm transition-colors cursor-pointer font-semibold ${
										selectedCategory === 'All Categories'
											? 'bg-gray-50 text-[#64B496] font-semibold'
											: 'text-gray-700 hover:bg-gray-100'
									}`}
								>
									All Categories
								</button>
							</li>
							<div className='h-px bg-gray-100 my-1' />
							{categories.map(category => (
								<li key={category.id}>
									<button
										onClick={e => {
											e.stopPropagation()
											setSelectedCategory(category.name)
											setIsDropdownOpen(false)
										}}
										className={`block w-full text-left rounded-sm px-4 py-2 text-sm transition-colors cursor-pointer ${
											selectedCategory === category.name
												? 'bg-gray-50 text-[#64B496] font-semibold'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										{category.name}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>

				<button
					onClick={handleSearchSubmit}
					className='w-11.25 h-11.25 rounded-r-sm bg-[#2B2B2D] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-200 border-none shrink-0'
				>
					<Search color='white' size={20} />
				</button>

				{isSearchOpen && query && (
					<div className='absolute left-0 mt-2 top-full w-full bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2'>
						{searchResults.length > 0 ? (
							<>
								<ul className='max-h-80 overflow-y-auto divide-y divide-gray-100'>
									{searchResults.slice(0, 5).map(product => (
										<li key={product.id}>
											<Link
												href={`/products/${product.id}`}
												onClick={() => setIsSearchOpen(false)}
												className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors'
											>
												<div className='relative w-10 h-10 shrink-0 bg-gray-50 rounded-md overflow-hidden'>
													<Image
														src={product.image}
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
									onClick={handleSearchSubmit}
									className='w-full text-center block bg-gray-50 hover:bg-gray-100 py-2.5 text-xs font-bold text-[#64B496] border-t border-gray-100 transition-colors uppercase tracking-wider cursor-pointer'
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
				<ul className='text-[15px] font-medium flex flex-row list-none gap-4 md:gap-6'>
					{userMenuItems.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='flex items-center gap-2 hover:text-[#64B496] transition-colors duration-200 text-black'
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
