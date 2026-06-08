import { ProductType } from './product'

interface CartItemType {
	product: ProductType
	quantity: number
}

export type UserRole = 'USER' | 'ADMIN' | 'OWNER'

export type UserType = {
	_id: string
	email: string
	firstName: string
	lastName: string
	phoneNumber: string
	city?: string
	address?: string
	role: UserRole
	avatarUrl?: string
	cart: CartItemType[]
	wishlist: ProductType[]
	createdAt: string
}
