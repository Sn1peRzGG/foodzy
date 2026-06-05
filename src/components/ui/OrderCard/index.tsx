'use client'

import { OrderItem, OrderStatus, OrderType } from '@/src/types/order'
import {
	Calendar,
	ChevronDown,
	CreditCard,
	MapPin,
	Phone,
	ShoppingBag,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'

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
		<div className='bg-card-bg border border-border-main rounded-xl shadow-md dark:shadow-black/40 overflow-hidden transition-all duration-200'>
			<div
				onClick={() => setIsExpanded(!isExpanded)}
				className='flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-ui-hover select-none transition-colors w-full gap-3 sm:gap-0'
			>
				<div className='flex flex-wrap items-center gap-x-4 gap-y-2 min-w-0 flex-1 sm:flex-initial'>
					<span className='font-bold text-text-main text-sm md:text-base tabular-nums shrink-0 w-auto sm:w-28'>
						№ {prettyId}
					</span>

					<span className='text-xs md:text-sm text-text-muted tabular-nums flex items-center gap-1.5 shrink-0 w-auto sm:w-28'>
						<Calendar size={15} className='text-text-subtle shrink-0' />
						{order.createdAt
							? new Date(order.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})
							: '-'}
					</span>

					<span
						className={`inline-flex items-center text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full border shrink-0 tracking-wider uppercase ${statusStyles[orderStatus]}`}
					>
						{orderStatus}
					</span>
				</div>

				<div className='flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t border-border-main/50 pt-2 sm:pt-0 sm:border-none sm:pl-2 w-full sm:w-auto'>
					<span className='font-extrabold text-text-main text-sm md:text-base tabular-nums'>
						${orderTotal.toFixed(2)}
					</span>
					<div
						className={`text-text-subtle transition-transform duration-300 ease-in-out ${
							isExpanded ? 'rotate-180 text-primary' : ''
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
					<div className='border-t border-border-main bg-card-bg p-4 md:p-6 space-y-5 md:space-y-6 w-full'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch w-full'>
							<div className='flex flex-col space-y-2 h-full'>
								<h4 className='text-[11px] font-bold text-text-subtle uppercase tracking-wider pl-1'>
									Delivery Address
								</h4>
								<div className='text-sm text-text-muted bg-main-bg p-4 rounded-xl border border-border-main flex-1 flex flex-col justify-between gap-3'>
									<div className='flex items-start gap-2.5 min-w-0'>
										<MapPin
											size={16}
											className='text-text-subtle shrink-0 mt-0.5'
										/>
										<span className='line-clamp-2 text-text-muted font-medium'>
											{order.deliveryAddress}
										</span>
									</div>
									<div className='flex items-center gap-2.5 tabular-nums border-t border-border-main pt-3'>
										<Phone size={16} className='text-text-subtle shrink-0' />
										<span className='text-text-muted font-medium'>
											{order.phoneNumber || '-'}
										</span>
									</div>
								</div>
							</div>

							<div className='flex flex-col space-y-2 h-full'>
								<h4 className='text-[11px] font-bold text-text-subtle uppercase tracking-wider pl-1'>
									Payment info
								</h4>
								<div className='text-sm text-text-muted bg-main-bg p-4 rounded-xl border border-border-main flex-1 flex flex-col justify-between gap-3'>
									<div className='flex items-center justify-between'>
										<span className='text-text-muted flex items-center gap-2.5'>
											<CreditCard size={16} className='text-text-subtle' />
											Method:
										</span>
										<span className='text-text-muted font-medium'>
											Cash on Delivery
										</span>
									</div>
									<div className='flex items-center justify-between border-t border-border-main pt-3'>
										<span className='text-text-muted flex items-center gap-2.5'>
											<ShoppingBag size={16} className='text-text-subtle' />
											Total items:
										</span>
										<span className='font-bold text-text-muted tabular-nums bg-card-dark border border-border-strong px-2 py-0.5 rounded-md text-xs'>
											{totalItemsCount} pcs.
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className='space-y-2 w-full'>
							<h4 className='text-[11px] font-bold text-text-subtle uppercase tracking-wider pl-1'>
								Ordered Items
							</h4>
							<div className='border border-border-main rounded-xl overflow-hidden bg-card-bg divide-y divide-border-main w-full'>
								{order.items?.map((item: OrderItem, idx: number) => (
									<OrderItemRow
										key={`${item.product?._id || idx}-${idx}`}
										item={item}
									/>
								))}
							</div>
						</div>

						{canCancel && (
							<div className='flex justify-end pt-3 border-t border-border-main w-full'>
								<button
									type='button'
									disabled={isCancelling}
									onClick={e => {
										e.stopPropagation()
										setOrderToCancel(order._id)
									}}
									className='inline-flex items-center justify-center gap-2 px-4 h-9 w-full sm:w-auto rounded-xl bg-card-bg text-accent border border-accent hover:bg-accent hover:text-text-main active:scale-98 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-md'
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
