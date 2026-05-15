'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
	const pathname = usePathname()

	if (pathname === '/') return null

	const pathSegments = pathname.split('/').filter(segment => segment !== '')

	return (
		<div className='w-full bg-[#F7F7F8] border-b border-[#E9E9E9] py-3 select-none'>
			<div className='w-2/3 mx-auto flex items-center gap-2 text-sm font-medium max-w-360'>
				<Link
					href='/'
					className='text-gray-500 hover:text-primary transition-colors duration-200 flex items-center gap-1'
				>
					<Home size={16} />
					<span>Home</span>
				</Link>

				{pathSegments.map((segment, index) => {
					const href = `/${pathSegments.slice(0, index + 1).join('/')}`
					const isLast = index === pathSegments.length - 1

					const label = segment
						.replace(/-/g, ' ')
						.replace(/\b\w/g, char => char.toUpperCase())

					return (
						<div key={href} className='flex items-center gap-2'>
							<ChevronRight size={14} className='text-gray-400 shrink-0' />
							{isLast ? (
								<span className='text-primary font-semibold truncate max-w-50 sm:max-w-none'>
									{label}
								</span>
							) : (
								<Link
									href={href}
									className='text-gray-500 hover:text-primary transition-colors duration-200 truncate max-w-50 sm:max-w-none'
								>
									{label}
								</Link>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
