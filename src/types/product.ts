import { CategoryType } from './category'

export type ProductType = {
	_id: string
	productId: number
	name: string
	description: string
	imageUrl: string
	category: CategoryType
	price: number
	oldPrice: number | null
	rating: number
	weight?: string
	calories?: number
	isAvailable: boolean
}
