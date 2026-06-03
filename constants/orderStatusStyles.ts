import { OrderStatus } from '../src/types/order'

export const statusStyles: Record<OrderStatus, string> = {
	[OrderStatus.PENDING]: 'bg-amber-50 text-amber-700 border-amber-100/60',
	[OrderStatus.PROCESSING]: 'bg-blue-50 text-blue-700 border-blue-100/60',
	[OrderStatus.SHIPPED]: 'bg-indigo-50 text-indigo-700 border-indigo-100/60',
	[OrderStatus.DELIVERED]: 'bg-green-50 text-green-700 border-green-100/60',
	[OrderStatus.CANCELLED]: 'bg-red-50 text-red-700 border-red-100/60',
}

export const filterActiveStyles: Record<OrderStatus | 'ALL', string> = {
	ALL: 'bg-primary border-primary text-white shadow-xs',
	[OrderStatus.PENDING]: 'bg-amber-600 border-amber-600 text-white shadow-xs',
	[OrderStatus.PROCESSING]: 'bg-blue-600 border-blue-600 text-white shadow-xs',
	[OrderStatus.SHIPPED]: 'bg-indigo-600 border-indigo-600 text-white shadow-xs',
	[OrderStatus.DELIVERED]: 'bg-green-600 border-green-600 text-white shadow-xs',
	[OrderStatus.CANCELLED]: 'bg-red-600 border-red-600 text-white shadow-xs',
}
