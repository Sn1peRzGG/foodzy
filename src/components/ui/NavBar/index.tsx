'use client'

import menuItems from '@/constants/menuItems.json'
import { ChevronDown, Phone, TextAlignJustify, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavBarProps {
	isMenuOpen: boolean
	setIsMenuOpen: (open: boolean) => void
}

export default function NavBar({ isMenuOpen, setIsMenuOpen }: NavBarProps) {
	const pathname = usePathname()
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuOpen])

	return (
		<>
			<div className='w-full h-full shadow-md dark:shadow-black/40(0,0,0,0.1)] hidden xl:block'>
				<div className='w-full px-4 md:px-12 xl:px-0 xl:w-2/3 h-full flex items-center justify-between mx-auto max-w-360'>
					<div className='w-8.75 h-8.75 border border-border-main rounded-[5px] flex items-center pl-1 cursor-pointer hover:bg-main-bg transition-colors'>
						<TextAlignJustify className='w-5.5 h-5.5' />
					</div>

					<nav className='hidden xl:block'>
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
													className={
														isActive ? 'text-text-main' : 'text-text-muted'
													}
												>
													{item.label}
												</span>
												<ChevronDown
													className={`w-4 h-4 transition-all duration-300 ${
														openDropdown === item.label ? 'rotate-180' : ''
													} ${isActive ? 'text-text-main' : 'text-text-muted'}`}
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
													className={
														isActive ? 'text-text-main' : 'text-text-muted'
													}
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
											<ul className='absolute left-0 top-full z-10 min-w-50 rounded-md border border-border-main bg-card-bg p-2 shadow-lg animate-in fade-in slide-in-from-top-2'>
												{item.subItems.map(sub => {
													const isSubActive = pathname === sub.href
													return (
														<li key={sub.href}>
															<Link
																href={sub.href}
																className={`block rounded-sm px-4 py-2 text-sm transition-colors ${
																	isSubActive
																		? 'bg-main-bg text-text-main font-semibold'
																		: 'text-text-muted hover:bg-ui-hover hover:text-text-main'
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

					<div className='flex flex-row gap-1 items-center'>
						<Phone className='w-5 h-5' />
						<span className='text-[15px] font-normal whitespace-nowrap'>
							<a href='tel:+15551234567'>+1 (555) 123-4567</a>
						</span>
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div
					className='xl:hidden fixed inset-0 bg-main-bg/40 z-150 animate-in fade-in duration-200'
					onClick={() => setIsMenuOpen(false)}
				/>
			)}

			<div
				className={`xl:hidden fixed top-0 left-0 h-full w-72 bg-card-bg z-200 shadow-2xl transform transition-transform duration-300 flex flex-col ${
					isMenuOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='p-4 border-b border-border-main flex items-center justify-between bg-main-bg'>
					<div className='flex items-center gap-2'>
						<div className='w-8.75 h-8.75 border border-border-main rounded-[5px] flex items-center justify-center bg-card-bg'>
							<TextAlignJustify className='w-4 h-4' />
						</div>
						<span className='font-bold text-text-muted text-base'>
							Navigation
						</span>
					</div>
					<button
						onClick={() => setIsMenuOpen(false)}
						className='p-1 hover:bg-ui-hover rounded-md transition-colors cursor-pointer'
					>
						<X className='w-5 h-5 text-text-muted' />
					</button>
				</div>

				<Link
					href='/'
					className='flex flex-row select-none cursor-pointer shrink-0 px-2 mt-4'
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
						<p className='text-[10px] xl:text-[12px] font-semibold -mt-0.5 text-text-main'>
							A Treasure of Tastes
						</p>
					</div>
				</Link>

				<nav className='flex-1 overflow-y-auto p-4'>
					<ul className='flex flex-col gap-1'>
						{menuItems.map(item => {
							const isActive =
								item.href === '/'
									? pathname === '/'
									: pathname.startsWith(item.href)

							const hasDropdown = item.hasDropdown && item.subItems
							const isDropdownToggled = openDropdown === item.label

							return (
								<li
									key={item.href}
									className='border-b border-border-main pb-1 last:border-none'
								>
									{hasDropdown ? (
										<div>
											<button
												onClick={() =>
													setOpenDropdown(isDropdownToggled ? null : item.label)
												}
												className={`w-full flex items-center justify-between py-2.5 px-2 rounded-md transition-colors cursor-pointer ${
													isActive
														? 'bg-main-bg text-primary font-semibold'
														: 'text-text-muted active:bg-ui-active'
												}`}
											>
												<span>{item.label}</span>
												<ChevronDown
													className={`w-4 h-4 transition-transform duration-200 ${isDropdownToggled ? 'rotate-180' : ''}`}
												/>
											</button>

											{isDropdownToggled && (
												<ul className='mt-1 ml-4 border-l-2 border-border-main pl-2 flex flex-col gap-0.5 bg-main-bg/50 rounded-r-md p-1'>
													{item.subItems.map(sub => {
														const isSubActive = pathname === sub.href
														return (
															<li key={sub.href}>
																<Link
																	href={sub.href}
																	onClick={() => setIsMenuOpen(false)}
																	className={`block rounded-md px-3 py-2 text-sm transition-colors ${
																		isSubActive
																			? 'text-primary font-semibold bg-card-bg shadow-sm'
																			: 'text-text-muted active:bg-ui-active'
																	}`}
																>
																	{sub.label}
																</Link>
															</li>
														)
													})}
												</ul>
											)}
										</div>
									) : (
										<Link
											href={item.href}
											onClick={() => setIsMenuOpen(false)}
											className={`block py-2.5 px-2 rounded-md transition-colors ${
												isActive
													? 'bg-main-bg text-primary font-semibold'
													: 'text-text-muted active:bg-ui-active'
											}`}
										>
											{item.label}
										</Link>
									)}
								</li>
							)
						})}
					</ul>
				</nav>

				<div className='p-4 border-t border-border-main bg-main-bg flex items-center gap-2 justify-center text-text-muted'>
					<Phone className='w-4 h-4' />
					<span className='text-sm font-semibold'>
						<a href='tel:+15551234567'>+1 (555) 123-4567</a>
					</span>
				</div>
			</div>
		</>
	)
}
