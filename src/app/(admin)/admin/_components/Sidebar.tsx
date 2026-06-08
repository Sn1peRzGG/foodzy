'use client'

import {
	ArrowLeftRight,
	ChevronLeft,
	ChevronRight,
	FolderTree,
	LayoutDashboard,
	MessageSquare,
	Package,
	ShoppingBag,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
	isCollapsed: boolean
	setIsCollapsed: (value: boolean) => void
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
	const pathname = usePathname()

	const adminMenuItems = [
		{ name: 'Home', href: '/admin', icon: LayoutDashboard },
		{ name: 'Products', href: '/admin/products', icon: Package },
		{ name: 'Categories', href: '/admin/categories', icon: FolderTree },
		{ name: 'Users', href: '/admin/users', icon: Users },
		{ name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
		{ name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
	]

	return (
		<aside
			className={`fixed inset-y-0 left-0 z-20 flex flex-col h-screen bg-card-bg text-text-muted border-r border-border-main/80 shrink-0 select-none transition-all duration-300 ease-in-out ${
				isCollapsed ? 'w-20' : 'w-64'
			}`}
		>
			<div className='flex items-center justify-between px-4 h-16 border-b border-border-main text-text-main relative w-full'>
				<div
					className={`flex items-center transition-all duration-300 w-full ${
						isCollapsed ? 'justify-center' : 'gap-3 pl-2'
					}`}
				>
					<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0'>
						<LayoutDashboard size={18} strokeWidth={2.5} />
					</div>
					<span
						className={`font-bold text-sm tracking-wider uppercase text-text-muted transition-all duration-300 whitespace-nowrap ${
							isCollapsed
								? 'opacity-0 w-0 pointer-events-none'
								: 'opacity-100 w-auto'
						}`}
					>
						Admin Panel
					</span>
				</div>

				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className='p-1.5 rounded-lg border border-border-main bg-main-bg hover:bg-ui-hover text-text-muted transition-all duration-200 absolute -right-3.5 top-4.5 shadow-sm hover:text-text-main z-30 cursor-pointer'
				>
					{isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
				</button>
			</div>

			<nav className='flex-1 py-4 px-3 flex flex-col justify-between w-full overflow-x-hidden'>
				<div className='space-y-1 w-full'>
					<div
						className={`px-3 mb-2 text-[10px] font-bold text-text-subtle uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
							isCollapsed ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'
						}`}
					>
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
								title={isCollapsed ? item.name : undefined}
								className={`flex items-center h-10.5 rounded-xl font-semibold text-sm transition-all duration-200 group relative ${
									isActive
										? 'bg-primary/8 text-primary'
										: 'text-text-muted hover:bg-main-bg hover:text-text-main'
								} ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'}`}
							>
								<Icon
									size={18}
									className={`shrink-0 transition-transform duration-200 group-hover:scale-102 ${
										isActive
											? 'text-primary'
											: 'text-text-subtle group-hover:text-text-muted'
									}`}
								/>
								<span
									className={`tracking-wide transition-all duration-300 whitespace-nowrap ${
										isCollapsed
											? 'opacity-0 w-0 pointer-events-none'
											: 'opacity-100 w-auto'
									}`}
								>
									{item.name}
								</span>

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
						title={isCollapsed ? 'Back to Website' : undefined}
						className={`flex items-center h-10.5 rounded-xl font-semibold text-sm text-text-muted hover:bg-main-bg hover:text-text-main transition-all duration-200 group ${
							isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
						}`}
					>
						<ArrowLeftRight size={18} className='shrink-0' />
						<span
							className={`tracking-wide transition-all duration-300 whitespace-nowrap ${
								isCollapsed
									? 'opacity-0 w-0 pointer-events-none'
									: 'opacity-100 w-auto'
							}`}
						>
							Back to Website
						</span>
					</Link>
				</div>
			</nav>

			<div
				className={`p-4 border-t border-border-main text-center text-[11px] text-text-subtle font-medium tracking-wide tabular-nums bg-main-bg/50 transition-all duration-300 whitespace-nowrap ${
					isCollapsed
						? 'opacity-0 h-0 py-0 overflow-hidden border-t-0'
						: 'opacity-100'
				}`}
			>
				v1.0.0 - Dashboard
			</div>
		</aside>
	)
}
