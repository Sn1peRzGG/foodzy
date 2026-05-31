import { ProductType } from './product'

export interface CartItemType {
	product: ProductType
	quantity: number
}

export type UserType = {
	_id: string
	email: string
	firstName: string
	lastName: string
	phoneNumber: string
	city?: string
	address?: string
	role: 'USER' | 'ADMIN'
	avatarUrl?: string
	cart: CartItemType[]
	wishlist: ProductType[]
}
