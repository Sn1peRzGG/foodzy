'use client'

import {
	ArrowLeftRight,
	FolderTree,
	LayoutDashboard,
	Package,
	ShoppingBag,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
		<aside className='fixed inset-y-0 left-0 z-20 flex flex-col w-64 h-screen bg-card-bg text-text-muted border-r border-border-main/80 shrink-0 select-none'>
			<div className='flex items-center gap-3 px-6 h-16 border-b border-border-main text-text-main'>
				<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0'>
					<LayoutDashboard size={18} strokeWidth={2.5} />
				</div>
				<span className='font-bold text-sm tracking-wider uppercase text-text-muted'>
					Admin Panel
				</span>
			</div>

			<nav className='flex-1 py-4 px-4 flex flex-col justify-between w-full'>
				<div className='space-y-1 w-full'>
					<div className='px-4 mb-2 text-[10px] font-bold text-text-subtle uppercase tracking-wider'>
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
										: 'text-text-muted hover:bg-main-bg hover:text-text-main'
								}`}
							>
								<Icon
									size={18}
									className={`shrink-0 transition-transform duration-200 group-hover:scale-102 ${
										isActive
											? 'text-primary'
											: 'text-text-subtle group-hover:text-text-muted'
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

				<div className='pt-4 border-t border-border-main w-full'>
					<Link
						href='/'
						className='flex items-center gap-3 px-4 h-10.5 rounded-xl font-semibold text-sm text-text-muted hover:bg-main-bg hover:text-text-main transition-all duration-200 group'
					>
						<ArrowLeftRight size={18} className='shrink-0' />
						<span className='tracking-wide'>Back to Website</span>
					</Link>
				</div>
			</nav>

			<div className='p-4 border-t border-border-main text-center text-[11px] text-text-subtle font-medium tracking-wide tabular-nums bg-main-bg/50'>
				v1.0.0 - Dashboard
			</div>
		</aside>
	)
}
