'use client'

import { ROLE_CONFIG } from '@/constants/roleConfig'
import { useProductSearch } from '@/src/hooks/useProductSearch'
import { useUser } from '@/src/hooks/useUser'
import { BASE_URL } from '@/src/lib/api'
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
		totalResults,
		isDropdownOpen,
		setIsDropdownOpen,
		selectedCategory,
		setSelectedCategory,
		handleSearchSubmit,
		categories,
	} = useProductSearch()

	const { data: user } = useUser()

	const userRoleConfig = user
		? ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
		: null

	const userMenuItems = [
		{
			label: user
				? user.firstName || userRoleConfig?.label || 'Profile'
				: 'Account',
			href: '/account',
			icon: <User size={20} />,
			customColor: userRoleConfig
				? userRoleConfig.nameColor
				: 'text-text-main hover:text-primary',
		},
		{
			label: 'Wishlist',
			href: '/wishlist',
			icon: <Heart size={20} />,
			length: user?.wishlist?.length || null,
		},
		{
			label: 'Cart',
			href: '/cart',
			icon: <ShoppingCart size={20} />,
			length: user?.cart?.length || null,
		},
	]

	const currentCategoryName =
		selectedCategory === 'all'
			? 'All Categories'
			: categories.find(cat => cat._id === selectedCategory)?.name ||
				'All Categories'

	return (
		<div
			className='w-full px-4 xl:px-0 xl:w-2/3 h-full flex items-center justify-between relative gap-2 xl:gap-4 max-w-360 mx-auto'
			ref={searchRef}
		>
			<div className='flex items-center xl:hidden shrink-0'>
				<button
					type='button'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className='p-2 border border-border-main rounded-[5px] bg-card-bg active:bg-ui-active cursor-pointer'
				>
					<Menu className='w-5 h-5 text-text-main' />
				</button>
			</div>

			<Link
				href='/'
				className='hidden xl:flex flex-row select-none cursor-pointer shrink-0'
			>
				<Image
					src='/logo.png'
					alt='Logo'
					width={82}
					height={82}
					className='w-20.5 h-20.5 object-contain'
				/>
				<div className='flex flex-col justify-center -ml-2'>
					<h2 className='text-[24px] font-black leading-tight'>Foodzy</h2>
					<p className='text-[12px] font-semibold -mt-0.5 text-text-main'>
						A Treasure of Tastes
					</p>
				</div>
			</Link>

			<div className='flex flex-1 xl:flex-none 2xl:w-125 h-10 xl:h-11.25 rounded-[5px] border border-primary flex-row justify-between items-center relative bg-card-bg'>
				<div className='pl-3 xl:pl-4 py-2 flex-1 flex items-center gap-2'>
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
						className='focus:outline-none w-full text-sm text-text-main bg-transparent'
					/>
					{query && (
						<button
							type='button'
							onClick={() => setQuery('')}
							className='text-text-subtle hover:text-text-main mr-1 cursor-pointer'
						>
							<X size={16} />
						</button>
					)}
				</div>

				<div
					className='hidden 2xl:flex flex-row items-center justify-center border-l border-l-primary h-full p-3 cursor-pointer relative select-none'
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<p className='text-[13px] font-regular whitespace-nowrap mr-1 text-text-muted'>
						{currentCategoryName}
					</p>
					<ChevronDown
						className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
						size={18}
					/>
					{isDropdownOpen && (
						<ul className='absolute right-0 w-64 mt-1 top-full z-100 rounded-md border border-border-main bg-card-bg p-2 shadow-lg'>
							<li>
								<button
									type='button'
									onClick={e => {
										e.stopPropagation()
										setSelectedCategory('all')
										setIsDropdownOpen(false)
									}}
									className={`block w-full cursor-pointer text-left rounded-sm px-4 py-2 text-sm ${selectedCategory === 'all' ? 'bg-main-bg text-primary font-semibold' : 'text-text-muted hover:bg-ui-hover'}`}
								>
									All Categories
								</button>
							</li>
							<div className='h-px bg-ui-hover my-1' />
							{categories.map(category => (
								<li key={category._id} className='cursor-pointer'>
									<button
										type='button'
										onClick={e => {
											e.stopPropagation()
											setSelectedCategory(category._id)
											setIsDropdownOpen(false)
										}}
										className={`block w-full cursor-pointer text-left rounded-sm px-4 py-2 text-sm ${selectedCategory === category._id ? 'bg-main-bg text-primary font-semibold' : 'text-text-muted hover:bg-ui-hover'}`}
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
					className='w-10 h-10 xl:w-11.25 xl:h-11.25 rounded-r-sm bg-primary hover:bg-primary-hover flex items-center justify-center cursor-pointer border-none shrink-0 transition-colors'
				>
					<Search color='white' size={18} />
				</button>

				{isSearchOpen && query && (
					<div className='absolute left-0 mt-2 top-full w-full bg-card-bg border border-border-main rounded-md shadow-xl overflow-hidden z-50'>
						{searchResults.length > 0 ? (
							<>
								<ul className='max-h-80 overflow-y-auto divide-y divide-border-main/50'>
									{searchResults.slice(0, 5).map(product => (
										<li key={product._id}>
											<Link
												href={`/products/${product._id}`}
												onClick={() => setIsSearchOpen(false)}
												className='flex items-center gap-3 px-4 py-2.5 hover:bg-main-bg'
											>
												<div className='relative w-10 h-10 shrink-0 rounded-md overflow-hidden'>
													<Image
														src={`${BASE_URL}${product.imageUrl}`}
														alt={product.name}
														fill
														className='object-cover pointer-events-none'
														unoptimized
													/>
												</div>
												<div className='overflow-hidden flex-1'>
													<p className='text-sm font-medium text-text-main truncate'>
														{product.name}
													</p>
													<p className='text-xs text-text-muted truncate'>
														{product.description}
													</p>
												</div>
												<span className='text-sm font-bold text-primary'>
													${product.price}
												</span>
											</Link>
										</li>
									))}
								</ul>
								<button
									type='button'
									onClick={handleSearchSubmit}
									className='w-full text-center block bg-main-bg py-2.5 text-xs font-bold text-primary border-t border-border-main uppercase tracking-wider cursor-pointer'
								>
									View All Results ({totalResults})
								</button>
							</>
						) : (
							<div className='px-4 py-4 text-sm text-text-muted text-center'>
								No products found
							</div>
						)}
					</div>
				)}
			</div>

			<div className='shrink-0 h-full flex items-center'>
				<ul className='text-[15px] font-medium flex flex-row list-none gap-4 xl:gap-6 items-center h-full'>
					{userMenuItems.map((item, index) => {
						const isProfile = index === 0
						const displayLabel = isProfile ? 'Account' : item.label

						return (
							<li key={item.href} className='relative h-full flex items-center'>
								<Link
									href={item.href}
									className={`group relative flex items-center py-4 transition-colors duration-200 text-text-main hover:text-primary ${
										isProfile ? 'gap-1.5' : 'gap-2.5'
									}`}
								>
									<div
										className={`relative shrink-0 flex items-center justify-center ${
											isProfile ? '' : 'p-0.5'
										}`}
									>
										{item.icon}

										{item.length !== undefined &&
											item.length !== null &&
											item.length > 0 && (
												<span className='absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9.5px] font-black tabular-nums text-white bg-primary rounded-full ring-2 ring-card-bg select-none shadow-md dark:shadow-black/40'>
													{item.length}
												</span>
											)}
									</div>

									<span className='hidden xl:inline leading-none truncate'>
										{displayLabel}
									</span>
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
