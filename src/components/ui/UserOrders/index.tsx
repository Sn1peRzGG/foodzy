'use client'

import { filterActiveStyles, statusStyles } from '@/constants/orderStatusStyles'
import { useCancelOrder } from '@/src/hooks/useCancelOrder'
import { useUserOrders } from '@/src/hooks/useUserOrders'
import { OrderStatus } from '@/src/types/order'
import { ClipboardList, Loader2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import OrderCard from '../OrderCard'
import OrderItemRow from '../OrderItemRow'

export default function UserOrders() {
	const { data: orders, isLoading } = useUserOrders()
	const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()
	const [orderToCancel, setOrderToCancel] = useState<string | null>(null)
	const [activeFilter, setActiveFilter] = useState<OrderStatus | 'ALL'>('ALL')

	const filterStatuses: (OrderStatus | 'ALL')[] = [
		'ALL',
		OrderStatus.PENDING,
		OrderStatus.PROCESSING,
		OrderStatus.SHIPPED,
		OrderStatus.DELIVERED,
		OrderStatus.CANCELLED,
	]

	const getCountByStatus = (status: OrderStatus | 'ALL') => {
		if (!orders) return 0
		if (status === 'ALL') return orders.length
		return orders.filter(
			order => (order.status || OrderStatus.PENDING) === status,
		).length
	}

	const filteredOrders =
		orders?.filter(order => {
			if (activeFilter === 'ALL') return true
			return (order.status || OrderStatus.PENDING) === activeFilter
		}) || []

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-16 w-full'>
				<Loader2 className='animate-spin text-primary' size={28} />
			</div>
		)
	}

	if (!orders || orders.length === 0) {
		return (
			<div className='mt-8 flex flex-col items-center justify-center text-center p-12 bg-card-bg border border-border-main rounded-2xl shadow-sm dark:shadow-black/20 max-w-xl mx-auto w-full animate-fade-in'>
				<div className='p-4 bg-main-bg border border-border-main rounded-full text-text-subtle mb-5 shadow-inner'>
					<ClipboardList size={32} strokeWidth={1.5} />
				</div>
				<h3 className='text-text-main font-bold text-xl tracking-tight mb-2'>
					No orders yet
				</h3>
				<p className='text-text-muted text-sm max-w-sm leading-relaxed mb-6'>
					Your order history is empty. Once you make a purchase, your orders
					will appear right here.
				</p>
				<Link
					href='/products'
					className='inline-flex items-center justify-center px-6 h-10 rounded-xl bg-primary text-text-main font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer'
				>
					Start Shopping
				</Link>
			</div>
		)
	}

	return (
		<div className='w-full space-y-5'>
			<h3 className='text-xl font-bold text-text-main flex items-center gap-2.5 tracking-tight pl-1'>
				<ClipboardList size={22} className='text-primary' />
				My Orders
				<span className='text-xs font-semibold px-2 py-0.5 bg-ui-hover text-text-muted rounded-full tabular-nums'>
					{orders.length}
				</span>
			</h3>

			<div className='flex flex-wrap gap-2 pb-2 w-full border-b border-border-main'>
				{filterStatuses.map(status => {
					const isActive = activeFilter === status
					const count = getCountByStatus(status)

					return (
						<button
							key={status}
							type='button'
							onClick={() => setActiveFilter(status)}
							className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none tabular-nums
          ${
						isActive
							? filterActiveStyles[status]
							: 'bg-card-bg border-border-main text-text-muted hover:bg-main-bg hover:border-border-strong'
					}`}
						>
							<span>{status === 'ALL' ? 'All' : status}</span>
							<span
								className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors duration-150
            ${isActive ? 'bg-card-bg/20 text-text-main' : 'bg-ui-hover text-text-muted'}`}
							>
								{count}
							</span>
						</button>
					)
				})}
			</div>

			<div className='space-y-5 w-full animate-fade-in'>
				{filteredOrders.length === 0 && (
					<div className='flex flex-col items-center justify-center text-center py-16 px-6 bg-card-bg/40 border border-dashed border-border-main rounded-2xl w-full'>
						<div className='flex items-center justify-center w-14 h-14 bg-main-bg border border-border-main rounded-full text-text-subtle mb-4 shadow-sm'>
							<ShoppingBag size={24} strokeWidth={1.5} />
						</div>

						<h3 className='text-base font-bold text-text-main mb-1 tracking-tight'>
							No {activeFilter === 'ALL' ? '' : activeFilter.toLowerCase()}{' '}
							orders found
						</h3>

						<p className='text-sm text-text-muted max-w-xs mb-6 leading-relaxed'>
							We couldn&apos;t find any orders matching the selected filter.
							Maybe it&apos;s time to look for something new?
						</p>

						<button
							onClick={() => setActiveFilter('ALL')}
							className='inline-flex items-center justify-center px-5 h-9 rounded-xl border border-border-strong text-text-main font-semibold text-xs uppercase tracking-wider hover:bg-main-bg active:scale-[0.98] transition-all duration-200 cursor-pointer'
						>
							Clear Filter
						</button>
					</div>
				)}

				{filteredOrders.map(order => (
					<OrderCard
						key={order._id}
						order={order}
						statusStyles={statusStyles}
						isCancelling={isCancelling}
						setOrderToCancel={setOrderToCancel}
						OrderItemRow={OrderItemRow}
					/>
				))}
			</div>

			<ConfirmModal
				isOpen={orderToCancel !== null}
				isLoading={isCancelling}
				title='Cancel Order'
				description='Are you sure you want to cancel this order? This action cannot be undone.'
				confirmText='Yes, cancel'
				cancelText='No, keep it'
				variant='danger'
				onClose={() => setOrderToCancel(null)}
				onConfirm={() => {
					if (orderToCancel) {
						cancelOrder(orderToCancel, {
							onSuccess: () => setOrderToCancel(null),
						})
					}
				}}
			/>
		</div>
	)
}
