export enum OrderStatus {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED',
	CANCELLED = 'CANCELLED',
}

interface OrderProduct {
	_id: string
	name: string
	price: number
	imageUrl: string
	description?: string
}

export interface OrderItem {
	product: OrderProduct
	quantity: number
	priceAtPurchase: number
}

export interface OrderType {
	_id: string
	user: string
	items: OrderItem[]
	totalPrice: number
	status: OrderStatus
	deliveryAddress: string
	phoneNumber: string
	createdAt: string
	updatedAt: string
}
