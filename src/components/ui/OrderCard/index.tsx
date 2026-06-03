'use client'

import { useState } from 'react'
import {
	Calendar,
	ChevronDown,
	MapPin,
	Phone,
	CreditCard,
	ShoppingBag,
	XCircle,
} from 'lucide-react'
import { OrderStatus, OrderType, OrderItem } from '@/src/types/order'

interface OrderCardProps {
	order: OrderType
	statusStyles: Record<OrderStatus, string>
	isCancelling: boolean
	setOrderToCancel: (id: string) => void
	OrderItemRow: React.ComponentType<{ item: OrderItem }>
}

export default function OrderCard({
	order,
	statusStyles,
	isCancelling,
	setOrderToCancel,
	OrderItemRow,
}: OrderCardProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const orderTotal =
		order.totalPrice ||
		order.items?.reduce(
			(sum: number, item: OrderItem) =>
				sum +
				(item.priceAtPurchase || item.product?.price || 0) * item.quantity,
			0,
		) ||
		0

	const totalItemsCount =
		order.items?.reduce(
			(sum: number, item: OrderItem) => sum + item.quantity,
			0,
		) || 0

	const getPrettyId = (id: string) => {
		return id ? id.slice(0, 8).toUpperCase() : 'UNKNOWN'
	}

	const prettyId = getPrettyId(order._id)
	const orderStatus = order.status || OrderStatus.PENDING
	const canCancel = orderStatus === OrderStatus.PENDING

	return (
		<div className='bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden transition-all duration-200 w-full'>
			<div
				onClick={() => setIsExpanded(!isExpanded)}
				className='flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-gray-50/50 select-none transition-colors w-full'
			>
				<div className='flex items-center gap-4 sm:gap-6 min-w-0 flex-1 sm:flex-initial'>
					<span className='font-bold text-gray-900 text-sm md:text-base tabular-nums shrink-0 w-24 sm:w-28'>
						№ {prettyId}
					</span>

					<span className='text-xs md:text-sm text-gray-500 tabular-nums flex items-center gap-1.5 shrink-0 w-24 sm:w-28'>
						<Calendar size={15} className='text-gray-400 shrink-0' />
						{order.createdAt
							? new Date(order.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})
							: '-'}
					</span>

					<span
						className={`inline-flex items-center text-[11px] md:text-xs font-semibold px-2.5 py-0.5 rounded-full border shrink-0 tracking-wider uppercase ${statusStyles[orderStatus]}`}
					>
						{orderStatus}
					</span>
				</div>

				<div className='flex items-center gap-4 shrink-0 pl-2'>
					<span className='font-extrabold text-gray-950 text-sm md:text-base tabular-nums'>
						${orderTotal.toFixed(2)}
					</span>
					<div
						className={`text-gray-400 transition-transform duration-200 ${
							isExpanded ? 'rotate-180' : ''
						}`}
					>
						<ChevronDown size={18} />
					</div>
				</div>
			</div>

			<div
				className={`grid transition-all duration-300 ease-in-out ${
					isExpanded
						? 'grid-rows-[1fr] opacity-100'
						: 'grid-rows-[0fr] opacity-0'
				}`}
			>
				<div className='overflow-hidden'>
					<div className='border-t border-gray-100 bg-white p-5 md:p-6 space-y-6 w-full'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch w-full'>
							<div className='flex flex-col space-y-2 h-full'>
								<h4 className='text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1'>
									Delivery Address
								</h4>
								<div className='text-sm text-gray-700 bg-[#F8F9FA] p-4 rounded-xl border border-gray-200/60 flex-1 flex flex-col justify-between gap-3'>
									<div className='flex items-start gap-2.5 min-w-0'>
										<MapPin
											size={16}
											className='text-gray-400 shrink-0 mt-0.5'
										/>
										<span className='line-clamp-2 text-gray-800 font-medium'>
											{order.deliveryAddress}
										</span>
									</div>
									<div className='flex items-center gap-2.5 tabular-nums border-t border-gray-200/50 pt-3'>
										<Phone size={16} className='text-gray-400 shrink-0' />
										<span className='text-gray-800 font-medium'>
											{order.phoneNumber || '-'}
										</span>
									</div>
								</div>
							</div>

							<div className='flex flex-col space-y-2 h-full'>
								<h4 className='text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1'>
									Payment info
								</h4>
								<div className='text-sm text-gray-700 bg-[#F8F9FA] p-4 rounded-xl border border-gray-200/60 flex-1 flex flex-col justify-between gap-3'>
									<div className='flex items-center justify-between'>
										<span className='text-gray-500 flex items-center gap-2.5'>
											<CreditCard size={16} className='text-gray-400' />
											Method:
										</span>
										<span className='text-gray-800 font-medium'>
											Cash on Delivery
										</span>
									</div>
									<div className='flex items-center justify-between border-t border-gray-200/50 pt-3'>
										<span className='text-gray-500 flex items-center gap-2.5'>
											<ShoppingBag size={16} className='text-gray-400' />
											Total items:
										</span>
										<span className='font-bold text-gray-800 tabular-nums bg-gray-200/50 px-2 py-0.5 rounded-md text-xs'>
											{totalItemsCount} pcs.
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className='space-y-2 w-full'>
							<h4 className='text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1'>
								Ordered Items
							</h4>
							<div className='border border-gray-200 rounded-xl overflow-hidden bg-white divide-y divide-gray-100 w-full'>
								{order.items?.map((item: OrderItem, idx: number) => (
									<OrderItemRow
										key={`${item.product?._id || idx}-${idx}`}
										item={item}
									/>
								))}
							</div>
						</div>

						{canCancel && (
							<div className='flex justify-end pt-2 border-t border-gray-100 w-full'>
								<button
									type='button'
									disabled={isCancelling}
									onClick={e => {
										e.stopPropagation()
										setOrderToCancel(order._id)
									}}
									className='inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100/70 active:scale-98 transition-all font-semibold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-3xs'
								>
									<XCircle size={15} />
									Cancel Order
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
