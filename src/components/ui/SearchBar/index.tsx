'use client'

import { useState } from 'react'
import { ChevronDown, Heart, Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchBar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('All Categories')

	const categories = ['All Categories', 'Main Dish', 'Break Fast', 'Dessert']

	const items = [
		{ label: 'Account', href: '/account', icon: <User /> },
		{ label: 'Wishlist', href: '/wishlist', icon: <Heart /> },
		{ label: 'Cart', href: '/cart', icon: <ShoppingCart /> },
	]

	return (
		<div className='w-2/3 h-3/5 flex items-center justify-between relative'>
			<Link href='/' className='flex flex-row select-none cursor-pointer'>
				<Image src='/logo.png' alt='Logo' width={82} height={82} />
				<div className='flex flex-col justify-center -ml-2'>
					<h2 className='text-[24px] font-black'>Foodzy</h2>
					<p className='text-[12px] font-semibold -mt-0.5'>
						A Treasure of Tastes
					</p>
				</div>
			</Link>

			<div className='w-125 h-11.25 rounded-[5px] border border-[#64B496] flex flex-row justify-between items-center relative'>
				<div className='pl-4 py-3 flex-1'>
					<input
						type='text'
						placeholder='Search for items...'
						className='focus:outline-none w-full'
					/>
				</div>
				<div
					className='flex flex-row items-center justify-center border-l border-l-[#64B496] h-full p-3 cursor-pointer relative'
					onMouseEnter={() => setIsDropdownOpen(true)}
					onMouseLeave={() => setIsDropdownOpen(false)}
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<p className='text-[13px] font-regular whitespace-nowrap mr-1'>
						{selectedCategory}
					</p>
					<ChevronDown
						className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
					/>

					{isDropdownOpen && (
						<ul className='absolute left-0 top-full z-50 min-w-full rounded-md border border-gray-100 bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2'>
							{categories.map(category => (
								<li key={category}>
									<button
										onClick={e => {
											e.stopPropagation()
											setSelectedCategory(category)
											setIsDropdownOpen(false)
										}}
										className='block w-full text-left rounded-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer'
									>
										{category}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className='w-11.25 h-11.25 rounded-r-[5px] bg-[#2B2B2D] flex items-center justify-center cursor-pointer hover:opacity-90 transition-colors duration-200'>
					<Search color='white' size={20} />
				</div>
			</div>

			<div>
				<ul className='text-[15px] font-medium flex flex-row list-none gap-6'>
					{items.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='flex items-center gap-2 hover:text-green-500 transition-colors duration-200'
							>
								{item.icon}
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
