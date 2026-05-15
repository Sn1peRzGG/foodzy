export interface CartItemType {
	productId: number
	quantity: number
}

export type UserType = {
	userId: number
	email: string
	password: string
	firstName: string
	lastName: string
	phoneNumber: string
	city?: string
	address?: string
	role: 'USER' | 'ADMIN'
	avatarUrl?: string
	cart: CartItemType[]
	wishlist: number[]
}
