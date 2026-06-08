'use client'

import { statusStyles } from '@/constants/orderStatusStyles'
import { ROLE_CONFIG } from '@/constants/roleConfig'
import Loading from '@/src/app/loading'
import { useAdminCategories } from '@/src/hooks/admin/useAdminCategories'
import { useAdminOrders } from '@/src/hooks/admin/useAdminOrders'
import { useAdminProducts } from '@/src/hooks/admin/useAdminProducts'
import { useAdminUsers } from '@/src/hooks/admin/useAdminUsers'
import { BASE_URL } from '@/src/lib/api'
import { OrderStatus } from '@/src/types/order'
import Image from 'next/image'

export default function AdminPage() {
	const {
		orders,
		isLoading: ordersLoading,
		isError: ordersError,
		error: oError,
	} = useAdminOrders()
	const {
		products,
		isLoading: productsLoading,
		isError: productsError,
		error: pError,
	} = useAdminProducts()
	const {
		categories,
		isLoading: categoriesLoading,
		isError: categoriesError,
		error: cError,
	} = useAdminCategories()
	const {
		users,
		isLoading: usersLoading,
		isError: usersError,
		error: uError,
	} = useAdminUsers()

	if (ordersLoading || productsLoading || categoriesLoading || usersLoading) {
		return <Loading />
	}

	if (ordersError || productsError || categoriesError || usersError) {
		throw (
			oError ||
			pError ||
			cError ||
			uError ||
			new Error('Failed to fetch dashboard data')
		)
	}

	const totalRevenue =
		orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0
	const pendingOrders =
		orders?.filter(o => o.status === OrderStatus.PENDING).length || 0
	const totalProducts = products?.length || 0
	const totalUsers = users?.length || 0

	const recentOrders = orders
		? [...orders]
				.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				)
				.slice(0, 5)
		: []

	const topCategories = categories?.slice(0, 4) || []

	const recentUsers = users
		? [...users]
				.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				)
				.slice(0, 4)
		: []

	const latestProducts = products
		? [...products]
				.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				)
				.slice(0, 4)
		: []

	return (
		<div className='p-6 space-y-8 bg-main-bg min-h-screen antialiased'>
			<div>
				<h1 className='text-3xl font-bold text-text-main tracking-tight'>
					Dashboard
				</h1>
				<p className='text-text-muted text-sm mt-1'>
					Welcome back! Here is your business overview.
				</p>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				<div className='bg-card-bg p-6 rounded-xl border border-border-main shadow-sm transition-all hover:border-border-main/80'>
					<p className='text-xs font-semibold text-text-muted uppercase tracking-wider'>
						Total Revenue
					</p>
					<p className='text-2xl font-bold text-text-main mt-2 font-mono'>
						${totalRevenue.toFixed(2)}
					</p>
				</div>

				<div
					className={`bg-card-bg p-6 rounded-xl border shadow-sm transition-all ${
						pendingOrders > 0
							? 'border-amber-500/40 bg-amber-500/2'
							: 'border-border-main'
					}`}
				>
					<p
						className={`text-xs font-semibold uppercase tracking-wider ${
							pendingOrders > 0 ? 'text-amber-500' : 'text-text-muted'
						}`}
					>
						Pending Orders
					</p>
					<p
						className={`text-2xl font-bold mt-2 font-mono ${
							pendingOrders > 0 ? 'text-amber-500' : 'text-text-main'
						}`}
					>
						{pendingOrders}
					</p>
				</div>

				<div className='bg-card-bg p-6 rounded-xl border border-border-main shadow-sm transition-all hover:border-border-main/80'>
					<p className='text-xs font-semibold text-text-muted uppercase tracking-wider'>
						Total Products
					</p>
					<p className='text-2xl font-bold text-text-main mt-2 font-mono'>
						{totalProducts}
					</p>
				</div>

				<div className='bg-card-bg p-6 rounded-xl border border-border-main shadow-sm transition-all hover:border-border-main/80'>
					<p className='text-xs font-semibold text-text-muted uppercase tracking-wider'>
						Total Users
					</p>
					<p className='text-2xl font-bold text-text-main mt-2 font-mono'>
						{totalUsers}
					</p>
				</div>
			</div>

			<div className='grid gap-6 lg:grid-cols-3 items-start'>
				<div className='lg:col-span-2 bg-card-bg rounded-xl border border-border-main shadow-sm overflow-hidden'>
					<div className='p-5 border-b border-border-main bg-card-bg/50'>
						<h2 className='text-base font-bold text-text-main'>
							Recent Orders
						</h2>
					</div>
					<div className='overflow-x-auto'>
						<table className='w-full text-left border-collapse align-middle'>
							<thead>
								<tr className='bg-main-bg text-text-muted text-xs font-semibold uppercase tracking-wider border-b border-border-main/80'>
									<th className='p-4 pl-6'>Order ID</th>
									<th className='p-4'>Phone</th>
									<th className='p-4'>Price</th>
									<th className='p-4 pr-6 text-right'>Status</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-border-main/40 text-sm text-text-muted transition-colors bg-card-bg'>
								{recentOrders.map(order => (
									<tr
										key={order._id}
										className='hover:bg-main-bg/40 transition-colors h-14'
									>
										<td className='p-4 pl-6 font-mono text-xs text-text-main align-middle'>
											...{order._id.slice(-8)}
										</td>
										<td className='p-4 font-medium align-middle'>
											{order.phoneNumber}
										</td>
										<td className='p-4 font-semibold text-text-main font-mono align-middle'>
											${order.totalPrice.toFixed(2)}
										</td>
										<td className='p-4 pr-6 text-right align-middle'>
											<span
												className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${
													statusStyles[order.status as OrderStatus] ||
													'bg-main-bg text-text-muted border-border-main'
												}`}
											>
												{order.status}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className='bg-card-bg rounded-xl border border-border-main shadow-sm p-5 space-y-4 self-stretch flex flex-col justify-between'>
					<div>
						<h2 className='text-base font-bold text-text-main mb-1'>
							Categories Items Count
						</h2>
						<p className='text-xs text-text-muted'>
							Distribution of products by category
						</p>
					</div>
					<div className='grid grid-cols-2 gap-3 flex-1 items-center'>
						{topCategories.map(category => (
							<div
								key={category._id}
								className='p-4 bg-main-bg/40 rounded-xl border border-border-main/60 flex flex-col justify-between h-24 hover:border-primary/40 hover:bg-main-bg/70 transition-all group'
							>
								<span className='text-xs font-semibold text-text-muted uppercase tracking-wider line-clamp-2 group-hover:text-text-main transition-colors'>
									{category.name}
								</span>
								<span className='text-xl font-bold text-text-main font-mono mt-2 flex items-baseline gap-1'>
									{category.count}
									<span className='text-[10px] font-medium uppercase tracking-wider text-text-muted'>
										items
									</span>
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<div className='bg-card-bg rounded-xl border border-border-main shadow-sm p-5 h-85 flex flex-col overflow-hidden'>
					<h2 className='text-base font-bold text-text-main mb-2 shrink-0'>
						Latest Registered Users
					</h2>
					<div className='divide-y divide-border-main/40 overflow-y-auto pr-1 flex-1'>
						{recentUsers.map(user => {
							const roleInfo = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
							const RoleIcon = roleInfo.icon

							return (
								<div
									key={user._id}
									className='flex items-center gap-4 py-3 first:pt-2 last:pb-0'
								>
									<div className='w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden shrink-0 flex items-center justify-center shadow-inner'>
										{user.avatarUrl ? (
											<Image
												src={`${BASE_URL}${user.avatarUrl}`}
												alt={user.firstName}
												width={40}
												height={40}
												unoptimized
												className='w-full h-full object-cover'
											/>
										) : (
											<div className='text-primary font-bold text-sm uppercase tracking-wide'>
												{user.firstName[0]}
											</div>
										)}
									</div>

									<div className='flex-1 min-w-0'>
										<p
											className={`text-sm font-semibold truncate ${roleInfo.nameColor}`}
										>
											{user.firstName} {user.lastName}
										</p>
										<p className='text-xs text-text-muted truncate mt-0.5'>
											{user.email}
										</p>
									</div>

									<span
										className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border shadow-sm shrink-0 ${roleInfo.bg}`}
									>
										<RoleIcon className='w-3 h-3' />
										{roleInfo.label}
									</span>
								</div>
							)
						})}
						{recentUsers.length === 0 && (
							<p className='text-xs text-text-muted py-4'>
								No users registered yet.
							</p>
						)}
					</div>
				</div>

				<div className='bg-card-bg rounded-xl border border-border-main shadow-sm p-5 h-85 flex flex-col overflow-hidden'>
					<h2 className='text-base font-bold text-text-main mb-2 shrink-0'>
						Recently Added Products
					</h2>
					<div className='divide-y divide-border-main/40 overflow-y-auto pr-1 flex-1'>
						{latestProducts.map(product => (
							<div
								key={product._id}
								className='flex items-center gap-4 py-3 first:pt-2 last:pb-0'
							>
								<div className='w-11 h-11 rounded-xl bg-ui-hover overflow-hidden shrink-0 border border-border-main/50 shadow-sm'>
									{product.imageUrl && (
										<Image
											src={`${BASE_URL}${product.imageUrl}`}
											alt={product.name}
											width={44}
											height={44}
											unoptimized
											className='w-full h-full object-cover'
										/>
									)}
								</div>
								<div className='flex-1 min-w-0'>
									<p className='text-sm font-bold text-text-main truncate'>
										{product.name}
									</p>
									<p className='text-xs text-text-muted truncate mt-0.5 font-medium'>
										{product.weight ? `${product.weight} • ` : ''}
										{product.calories} kcal
									</p>
								</div>
								<div className='text-right shrink-0 flex flex-col items-end justify-center'>
									<div className='flex items-baseline gap-1.5'>
										{product.oldPrice && (
											<span className='text-xs text-text-subtle line-through font-mono'>
												${product.oldPrice.toFixed(2)}
											</span>
										)}
										<span className='text-sm font-bold text-text-main font-mono'>
											${product.price.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						))}
						{latestProducts.length === 0 && (
							<p className='text-xs text-text-muted py-4'>
								No products added yet.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
