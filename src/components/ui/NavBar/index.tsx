'use client'

import { ChevronDown, Phone, TextAlignJustify } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import menuItems from '../../../../data/menuItems.json'

export default function NavBar() {
	const pathname = usePathname()
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)

	return (
		<div className='w-full h-2/5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
			<div className='w-2/3 h-full flex items-center justify-between mx-auto'>
				<div className='w-8.75 h-8.75 border border-[#E9E9E9] rounded-[5px] flex items-center pl-1 cursor-pointer'>
					<TextAlignJustify className='w-5.5 h-5.5' />
				</div>

				<nav>
					<ul className='flex flex-row gap-6'>
						{menuItems.map(item => {
							const isActive =
								item.href === '/'
									? pathname === '/'
									: pathname.startsWith(item.href)

							const hasDropdown = item.hasDropdown && item.subItems

							return (
								<li
									key={item.href}
									className='relative py-2'
									onMouseEnter={() =>
										hasDropdown && setOpenDropdown(item.label)
									}
									onMouseLeave={() => setOpenDropdown(null)}
								>
									{hasDropdown ? (
										<div className='group relative flex cursor-pointer items-center gap-1 transition-colors duration-300'>
											<span
												className={isActive ? 'text-black' : 'text-gray-600'}
											>
												{item.label}
											</span>
											<ChevronDown
												className={`w-4 h-4 transition-all duration-300 ${
													openDropdown === item.label ? 'rotate-180' : ''
												} ${isActive ? 'text-black' : 'text-gray-600'}`}
											/>
											<span
												className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
													isActive ? 'w-full' : 'w-0'
												}`}
											/>
										</div>
									) : (
										<Link
											href={item.href}
											className='group relative flex items-center gap-1 transition-colors duration-300'
										>
											<span
												className={isActive ? 'text-black' : 'text-gray-600'}
											>
												{item.label}
											</span>
											<span
												className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
													isActive ? 'w-full' : 'w-0'
												}`}
											/>
										</Link>
									)}

									{hasDropdown && openDropdown === item.label && (
										<ul className='absolute left-0 top-full z-10 min-w-50 rounded-md border border-gray-100 bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2'>
											{item.subItems.map(sub => {
												const isSubActive = pathname === sub.href
												return (
													<li key={sub.href}>
														<Link
															href={sub.href}
															className={`block rounded-sm px-4 py-2 text-sm transition-colors ${
																isSubActive
																	? 'bg-gray-50 text-black font-semibold'
																	: 'text-gray-700 hover:bg-gray-100 hover:text-black'
															}`}
														>
															{sub.label}
														</Link>
													</li>
												)
											})}
										</ul>
									)}
								</li>
							)
						})}
					</ul>
				</nav>

				<div className='flex flex-row gap-1'>
					<Phone className='w-5 h-5' />
					<span className='text-[15px] font-normal'>+1 (555) 123-4567</span>
				</div>
			</div>
		</div>
	)
}
