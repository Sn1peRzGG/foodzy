interface ReviewUser {
	_id: string
	firstName: string
	lastName: string
	avatarUrl?: string
}

interface ReviewAdminUser extends ReviewUser {
	email: string
}

interface ReviewProduct {
	_id: string
	name: string
}

export interface ReviewType {
	_id: string
	product: ReviewProduct
	user: ReviewUser
	rating: number
	text: string
	status: 'PENDING' | 'APPROVED' | 'REJECTED'
	createdAt: string
	updatedAt: string
}

export interface AdminReview extends Omit<ReviewType, 'user'> {
	user: ReviewAdminUser
}
