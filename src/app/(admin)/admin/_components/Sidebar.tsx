'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	ArrowLeftRight,
	Package,
	FolderTree,
	Users,
	ShoppingBag,
	LayoutDashboard,
} from 'lucide-react'

export default function Sidebar() {
	const pathname = usePathname()

	const adminMenuItems = [
		{ name: 'Home', href: '/admin', icon: LayoutDashboard },
		{ name: 'Products', href: '/admin/products', icon: Package },
		{ name: 'Categories', href: '/admin/categories', icon: FolderTree },
		{ name: 'Users', href: '/admin/users', icon: Users },
		{ name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
	]

	return (
		<aside className='fixed inset-y-0 left-0 z-20 flex flex-col w-64 h-screen bg-white text-gray-600 border-r border-gray-200/80 shrink-0 select-none'>
			<div className='flex items-center gap-3 px-6 h-16 border-b border-gray-100 text-gray-900'>
				<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0'>
					<LayoutDashboard size={18} strokeWidth={2.5} />
				</div>
				<span className='font-bold text-sm tracking-wider uppercase text-gray-800'>
					Admin Panel
				</span>
			</div>

			<nav className='flex-1 py-4 px-4 flex flex-col justify-between w-full'>
				<div className='space-y-1 w-full'>
					<div className='px-4 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider'>
						Management
					</div>

					{adminMenuItems.map(item => {
						const isActive =
							item.href === '/admin'
								? pathname === '/admin'
								: pathname.startsWith(item.href)

						const Icon = item.icon

						return (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center gap-3 px-4 h-10.5 rounded-xl font-semibold text-sm transition-all duration-200 group relative ${
									isActive
										? 'bg-primary/8 text-primary'
										: 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
								}`}
							>
								<Icon
									size={18}
									className={`shrink-0 transition-transform duration-200 group-hover:scale-102 ${
										isActive
											? 'text-primary'
											: 'text-gray-400 group-hover:text-gray-500'
									}`}
								/>
								<span className='tracking-wide'>{item.name}</span>

								{isActive && (
									<div className='absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-md' />
								)}
							</Link>
						)
					})}
				</div>

				<div className='pt-4 border-t border-gray-100 w-full'>
					<Link
						href='/'
						className='flex items-center gap-3 px-4 h-10.5 rounded-xl font-semibold text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-950 transition-all duration-200 group'
					>
						<ArrowLeftRight size={18} className='shrink-0' />
						<span className='tracking-wide'>Back to Website</span>
					</Link>
				</div>
			</nav>

			<div className='p-4 border-t border-gray-100 text-center text-[11px] text-gray-400 font-medium tracking-wide tabular-nums bg-gray-50/50'>
				v1.0.0 - Dashboard
			</div>
		</aside>
	)
}
