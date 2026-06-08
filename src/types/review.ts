interface ReviewUser {
	_id: string
	firstName: string
	lastName: string
	avatarUrl?: string
}

interface ReviewAdminUser extends ReviewUser {
	email: string
}

export interface ReviewType {
	_id: string
	product: string
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

export interface CreateReviewDto {
	product: string
	rating: number
	text: string
}

export interface UpdateReviewDto {
	rating: number
	text: string
}

interface UpdateReviewStatusDto {
	status: 'PENDING' | 'APPROVED' | 'REJECTED'
}
