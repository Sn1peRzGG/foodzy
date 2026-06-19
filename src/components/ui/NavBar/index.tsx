'use client'

import menuItems from '@/constants/menuItems.json'
import { Phone, TextAlignJustify, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface NavBarProps {
	isMenuOpen: boolean
	setIsMenuOpen: (open: boolean) => void
}

export default function NavBar({ isMenuOpen, setIsMenuOpen }: NavBarProps) {
	const pathname = usePathname()

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
			<div className='w-full h-full shadow-md dark:shadow-black/40 hidden xl:block'>
				<div className='w-full px-4 md:px-12 xl:px-0 xl:w-2/3 h-full flex items-center justify-between mx-auto max-w-360'>
					<div className='w-8.75 h-8.75 border border-border-main rounded-md flex items-center pl-1 cursor-pointer hover:bg-main-bg transition-colors'>
						<TextAlignJustify className='w-5.5 h-5.5' />
					</div>

					<nav className='hidden xl:block'>
						<ul className='flex flex-row gap-6'>
							{menuItems.map(item => {
								const isActive =
									item.href === '/'
										? pathname === '/'
										: pathname.startsWith(item.href)

								return (
									<li key={item.href} className='relative py-2'>
										<Link
											href={item.href}
											className='group relative flex items-center gap-1 transition-colors duration-200'
										>
											<span
												className={
													isActive ? 'text-text-main' : 'text-text-muted'
												}
											>
												{item.label}
											</span>
											<span
												className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-200 group-hover:w-full ${
													isActive ? 'w-full' : 'w-0'
												}`}
											/>
										</Link>
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
				className={`xl:hidden fixed top-0 left-0 h-full w-72 bg-card-bg z-200 shadow-2xl transform transition-transform duration-200 flex flex-col ${
					isMenuOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='p-4 border-b border-border-main flex items-center justify-between bg-main-bg'>
					<div className='flex items-center gap-2'>
						<div className='w-8.75 h-8.75 border border-border-main rounded-md flex items-center justify-center bg-card-bg'>
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

							return (
								<li
									key={item.href}
									className='border-b border-border-main pb-1 last:border-none'
								>
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
