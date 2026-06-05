import { OrderStatus } from '../src/types/order'

export const statusStyles: Record<OrderStatus, string> = {
	[OrderStatus.PENDING]:
		'bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/15 dark:border-amber-500/30',
	[OrderStatus.PROCESSING]:
		'bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/15 dark:border-blue-500/30',
	[OrderStatus.SHIPPED]:
		'bg-indigo-500/10 text-indigo-500 border-indigo-500/20 dark:bg-indigo-500/15 dark:border-indigo-500/30',
	[OrderStatus.DELIVERED]:
		'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/15 dark:border-emerald-500/30',
	[OrderStatus.CANCELLED]:
		'bg-red-500/10 text-red-500 border-red-500/20 dark:bg-red-500/15 dark:border-red-500/30',
}

export const filterActiveStyles: Record<OrderStatus | 'ALL', string> = {
	ALL: 'bg-primary border-primary text-text-main dark:text-brand-choco shadow-sm',
	[OrderStatus.PENDING]:
		'bg-amber-500 border-amber-500 text-black dark:text-black font-bold shadow-sm',
	[OrderStatus.PROCESSING]: 'bg-blue-500 border-blue-500 text-white shadow-sm',
	[OrderStatus.SHIPPED]: 'bg-indigo-500 border-indigo-500 text-white shadow-sm',
	[OrderStatus.DELIVERED]:
		'bg-emerald-500 border-emerald-500 text-white shadow-sm',
	[OrderStatus.CANCELLED]: 'bg-red-500 border-red-500 text-white shadow-sm',
}
