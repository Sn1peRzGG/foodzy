import { CategoryType } from './category'

export type ProductType = {
	_id: string
	name: string
	description: string
	imageUrl: string
	category: CategoryType
	price: number
	oldPrice?: number
	rating: number
	weight?: string
	calories?: number
	isAvailable: boolean
	isDeleted: boolean
	createdAt: string
}

export interface PaginatedProducts {
	data: ProductType[]
	meta: {
		total: number
		page: number
		limit: number
		pages: number
	}
}
