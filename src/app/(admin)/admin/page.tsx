'use client'

import { statusStyles } from '@/constants/orderStatusStyles'
import { ROLE_CONFIG } from '@/constants/roleConfig'
import Loading from '@/src/app/loading'
import { useAdminCategories } from '@/src/hooks/admin/useAdminCategories'
import { useAdminOrders } from '@/src/hooks/admin/useAdminOrders'
import { useAdminProducts } from '@/src/hooks/admin/useAdminProducts'
import { useAdminUsers } from '@/src/hooks/admin/useAdminUsers'
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

	const recentOrders = orders?.slice(-5).reverse() || []
	const topCategories = categories?.slice(0, 4) || []
	const recentUsers = users?.slice(-4).reverse() || []
	const latestProducts = products?.slice(-4).reverse() || []

	return (
		<div className='p-6 space-y-8 bg-gray-50 min-h-screen'>
			<div>
				<h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
					Dashboard
				</h1>
				<p className='text-gray-500 text-sm'>
					Welcome back! Here is your business overview.
				</p>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				<div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider'>
						Total Revenue
					</p>
					<p className='text-2xl font-bold text-gray-900 mt-2'>
						${totalRevenue.toFixed(2)}
					</p>
				</div>

				<div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider'>
						Pending Orders
					</p>
					<p className='text-2xl font-bold text-amber-600 mt-2'>
						{pendingOrders}
					</p>
				</div>

				<div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider'>
						Total Products
					</p>
					<p className='text-2xl font-bold text-gray-900 mt-2'>
						{totalProducts}
					</p>
				</div>

				<div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider'>
						Total Users
					</p>
					<p className='text-2xl font-bold text-gray-900 mt-2'>{totalUsers}</p>
				</div>
			</div>

			<div className='grid gap-6 lg:grid-cols-3'>
				<div className='lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
					<div className='p-6 border-b border-gray-100'>
						<h2 className='text-lg font-bold text-gray-900'>Recent Orders</h2>
					</div>
					<div className='overflow-x-auto'>
						<table className='w-full text-left border-collapse align-middle'>
							<thead>
								<tr className='bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100'>
									<th className='p-4 font-medium'>Order ID</th>
									<th className='p-4 font-medium'>Phone</th>
									<th className='p-4 font-medium'>Price</th>
									<th className='p-4 font-medium'>Status</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-100 text-sm text-gray-700'>
								{recentOrders.map(order => (
									<tr
										key={order._id}
										className='hover:bg-gray-50/70 transition-colors h-14'
									>
										<td className='p-4 font-mono text-xs text-gray-500 align-middle'>
											...{order._id.slice(-8)}
										</td>
										<td className='p-4 align-middle'>{order.phoneNumber}</td>
										<td className='p-4 font-medium align-middle'>
											${order.totalPrice.toFixed(2)}
										</td>
										<td className='p-4 align-middle'>
											<span
												className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
													statusStyles[order.status as OrderStatus] ||
													'bg-gray-50 text-gray-700'
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

				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6'>
					<div>
						<h2 className='text-lg font-bold text-gray-900'>
							Categories Items Count
						</h2>
					</div>
					<div className='space-y-4'>
						{topCategories.map(category => (
							<div key={category._id} className='space-y-2'>
								<div className='flex justify-between text-sm'>
									<span className='font-medium text-gray-700'>
										{category.name}
									</span>
									<span className='text-gray-500 font-mono'>
										{category.count} items
									</span>
								</div>
								<div className='w-full bg-gray-100 h-2 rounded-full overflow-hidden'>
									<div
										className='bg-primary h-full rounded-full'
										style={{
											width: `${Math.min((category.count / 20) * 100, 100)}%`,
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
					<h2 className='text-lg font-bold text-gray-900 mb-4'>
						Latest Registered Users
					</h2>
					<div className='divide-y divide-gray-100'>
						{recentUsers.map(user => {
							const roleInfo = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
							const RoleIcon = roleInfo.icon

							return (
								<div
									key={user._id}
									className='flex items-center gap-4 py-3 first:pt-0 last:pb-0'
								>
									<div className='w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0'>
										{user.avatarUrl ? (
											<Image
												src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`}
												alt={user.firstName}
												width={40}
												height={40}
												unoptimized
												className='w-full h-full object-cover'
											/>
										) : (
											<div className='w-full h-full flex items-center justify-center text-gray-500 font-bold'>
												{user.firstName[0]}
											</div>
										)}
									</div>

									<div className='flex-1 min-w-0'>
										<p className={`text-sm truncate ${roleInfo.nameColor}`}>
											{user.firstName} {user.lastName}
										</p>
										<p className='text-xs text-gray-500 truncate'>
											{user.email}
										</p>
									</div>

									<span
										className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs uppercase font-mono tracking-wider border-2 shadow-sm shrink-0 ${roleInfo.bg}`}
									>
										<RoleIcon className='w-3.5 h-3.5' />
										{roleInfo.label}
									</span>
								</div>
							)
						})}
					</div>
				</div>

				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
					<h2 className='text-lg font-bold text-gray-900 mb-4'>
						Recently Added Products
					</h2>
					<div className='divide-y divide-gray-100'>
						{latestProducts.map(product => (
							<div
								key={product._id}
								className='flex items-center gap-4 py-3 first:pt-0 last:pb-0'
							>
								<div className='w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0'>
									{product.imageUrl && (
										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
											alt={product.name}
											width={40}
											height={40}
											unoptimized
											className='w-full h-full object-cover'
										/>
									)}
								</div>
								<div className='flex-1 min-w-0'>
									<p className='text-sm font-semibold text-gray-900 truncate'>
										{product.name}
									</p>
									<p className='text-xs text-gray-500 truncate'>
										{product.weight} • {product.calories} kcal
									</p>
								</div>
								<div className='text-right shrink-0'>
									<p className='text-sm font-bold text-gray-900'>
										${product.price}
									</p>
									{product.oldPrice && (
										<p className='text-xs text-gray-400 line-through'>
											${product.oldPrice}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
