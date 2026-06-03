'use client'

import { useCancelOrder } from '@/src/hooks/useCancelOrder'
import { useUserOrders } from '@/src/hooks/useUserOrders'
import { OrderStatus } from '@/src/types/order'
import { filterActiveStyles, statusStyles } from '@/src/utils/orderStatusStyles'
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
			<div className='mt-8 p-10 bg-white border border-gray-100 rounded-2xl shadow-xs w-full text-center flex flex-col items-center justify-center gap-3'>
				<div className='p-3 bg-gray-50 rounded-full text-gray-400'>
					<ClipboardList size={26} />
				</div>
				<p className='text-gray-900 font-bold text-lg'>No orders yet</p>
				<p className='text-gray-500 text-sm max-w-xs leading-relaxed'>
					Your order history is empty. Once you make a purchase, your orders
					will appear right here.
				</p>
			</div>
		)
	}

	return (
		<div className='w-full space-y-5'>
			<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2.5 tracking-tight pl-1'>
				<ClipboardList size={22} className='text-primary' />
				My Orders
				<span className='text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full tabular-nums'>
					{orders.length}
				</span>
			</h3>

			<div className='flex flex-wrap gap-2 pb-2 w-full border-b border-gray-100'>
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
							: 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
					}`}
						>
							<span>{status === 'ALL' ? 'All' : status}</span>
							<span
								className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors duration-150
            ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}
							>
								{count}
							</span>
						</button>
					)
				})}
			</div>

			<div className='space-y-5 w-full animate-fade-in'>
				{filteredOrders.length === 0 && (
					<div className='flex flex-col items-center justify-center text-center py-14 px-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl w-full'>
						<div className='flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full text-gray-400 mb-4 shadow-3xs'>
							<ShoppingBag size={24} strokeWidth={1.5} />
						</div>

						<h3 className='text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide'>
							No Orders Found
						</h3>

						<p className='text-xs md:text-sm text-gray-500 max-w-xs mb-5 leading-relaxed'>
							We couldn&apos;t find any orders matching the selected filter.
							Maybe it&apos;s time to look for something new?
						</p>

						<Link
							href='/products'
							className='inline-flex items-center justify-center px-5 h-9 rounded-xl bg-primary text-white font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-98 transition-all duration-200 cursor-pointer'
						>
							Explore Products
						</Link>
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
