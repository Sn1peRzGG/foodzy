'use client'

import Loading from '@/src/app/loading'
import { useAdminOrders } from '@/src/hooks/admin/useAdminOrders'
import { OrderStatus } from '@/src/types/order'
import {
	Calendar,
	DollarSign,
	Hash,
	Mail,
	MapPin,
	Package,
	Phone,
	User,
} from 'lucide-react'
import Image from 'next/image'
import AdminDropdown from '../_components/AdminDropdown'

const statusStyles: Record<OrderStatus, string> = {
	[OrderStatus.PENDING]: 'bg-amber-50 text-amber-700 border-amber-200',
	[OrderStatus.PROCESSING]: 'bg-blue-50 text-blue-700 border-blue-200',
	[OrderStatus.SHIPPED]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
	[OrderStatus.DELIVERED]: 'bg-green-50 text-green-700 border-green-200',
	[OrderStatus.CANCELLED]: 'bg-red-50 text-red-700 border-red-200',
}

export default function OrdersAdminPage() {
	const { orders, isLoading, isError, error, updateOrder, isUpdating } =
		useAdminOrders()

	const handleStatusChange = async (
		orderId: string,
		newStatus: OrderStatus,
	) => {
		updateOrder({
			id: orderId,
			dto: { status: newStatus },
		})
	}

	if (isLoading) return <Loading />
	if (isError) throw error || new Error('Failed to fetch orders')

	if (!orders || orders.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-2'>
					<Package className='w-8 h-8 text-gray-400' />
				</div>
				<p className='text-gray-900 font-bold text-lg'>No active orders</p>
				<p className='text-sm text-gray-500 text-center'>
					System has recorded zero inbound marketplace transitions.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-gray-50/50 min-h-screen w-full overflow-x-hidden'>
			<div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
						Global Order Workflow
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Track real-time logistical transactions, manage execution workflows,
						and update fulfillment lifecycles.
					</p>
				</div>
			</div>

			<div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-gray-50/80 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100'>
								<th className='py-4 px-6'>Order Entity</th>
								<th className='py-4 px-6'>Client Logistics</th>
								<th className='py-4 px-6'>Purchased Manifest</th>
								<th className='py-4 px-6'>Financials</th>
								<th className='py-4 px-6 text-right'>Lifecycle State</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100 text-sm text-gray-600 font-medium'>
							{orders.map((order: any) => {
								const isUserPopulated =
									typeof order.user === 'object' && order.user !== null
								const userId = isUserPopulated ? order.user._id : order.user
								const userName = isUserPopulated
									? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim()
									: 'Guest Client'
								const userEmail = isUserPopulated
									? order.user.email
									: 'No email address'

								return (
									<tr
										key={order._id}
										className='hover:bg-gray-50/50 transition-colors'
									>
										<td className='py-4 px-6 space-y-2'>
											<div className='font-bold text-gray-900 text-sm font-sans tracking-tight'>
												#{order._id.slice(0, 8).toUpperCase()}
											</div>
											<div className='flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-gray-500 text-[11px] font-mono w-max'>
												<Hash className='w-3 h-3 shrink-0' />
												<span>ID: {order._id}</span>
											</div>
											<div className='flex items-center gap-1.5 text-gray-400 text-[11px] font-mono'>
												<User className='w-3 h-3 shrink-0' />
												<span>UID: {userId}</span>
											</div>
										</td>

										<td className='py-4 px-6 space-y-3'>
											<div className='space-y-1'>
												<div className='flex items-center gap-2 text-sm font-bold text-gray-900'>
													<div className='w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[10px] border border-gray-200 shrink-0'>
														{userName.charAt(0).toUpperCase()}
													</div>
													<span>{userName}</span>
												</div>
												<div className='flex items-center gap-1.5 text-xs text-gray-500 font-mono pl-8'>
													<Mail className='w-3.5 h-3.5' />
													<span>{userEmail}</span>
												</div>
											</div>

											<div className='space-y-2 pl-8 border-l-2 border-gray-100 ml-3 py-1'>
												<div className='flex items-center gap-2 text-xs font-medium text-gray-500'>
													<Phone className='w-3.5 h-3.5 text-gray-400 shrink-0' />
													<span>{order.phoneNumber}</span>
												</div>
												<div className='flex items-center gap-2 text-xs font-medium text-gray-500'>
													<MapPin className='w-3.5 h-3.5 text-gray-400 shrink-0' />
													<span className='truncate max-w-50'>
														{order.deliveryAddress}
													</span>
												</div>
												<div className='flex items-center gap-2 text-xs font-medium text-gray-500'>
													<Calendar className='w-3.5 h-3.5 text-gray-400 shrink-0' />
													<span>
														{new Date(order.updatedAt).toLocaleString()}
													</span>
												</div>
											</div>
										</td>

										<td className='py-4 px-6'>
											<div className='flex flex-col gap-2 py-2 max-h-44 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
												{order.items?.map((item: any, index: number) => {
													const name = item.product?.name || 'Deleted Product'
													const img = item.product?.imageUrl

													return (
														<div
															key={index}
															className='flex gap-3 items-center text-xs text-gray-600 bg-white p-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors shadow-sm'
														>
															<div className='w-10 h-10 rounded-lg bg-gray-50 overflow-hidden border border-gray-200 shrink-0 relative'>
																{img && (
																	<Image
																		src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
																		alt={name}
																		fill
																		unoptimized
																		className='object-cover'
																	/>
																)}
															</div>
															<div className='flex-1 space-y-0.5'>
																<p className='font-bold text-gray-900 tracking-tight'>
																	{name}
																</p>
																<p className='text-[11px] text-gray-500 font-mono'>
																	Rate: $
																	{(item.priceAtPurchase || 0).toFixed(2)}
																</p>
															</div>
															<span className='font-bold px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-mono shrink-0'>
																x{item.quantity}
															</span>
														</div>
													)
												})}
											</div>
										</td>

										<td className='py-4 px-6'>
											<div className='inline-flex items-center text-lg font-black text-gray-900 font-mono'>
												<DollarSign className='w-5 h-5 text-gray-400 -mr-0.5 shrink-0' />
												{(order.totalPrice || 0).toFixed(2)}
											</div>
										</td>

										<td className='py-4 px-6 text-right'>
											<div className='flex items-center justify-end gap-3'>
												<span
													className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm shrink-0 ${statusStyles[order.status as OrderStatus] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
												>
													<span className='w-1.5 h-1.5 rounded-full bg-current mr-2 shrink-0 animate-pulse' />
													{order.status}
												</span>

												<AdminDropdown
													value={order.status}
													disabled={isUpdating}
													options={Object.values(OrderStatus).map(status => ({
														value: status,
														label: status,
														badgeStyle: statusStyles[status as OrderStatus],
													}))}
													onChange={newValue =>
														handleStatusChange(
															order._id,
															newValue as OrderStatus,
														)
													}
												/>
											</div>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
