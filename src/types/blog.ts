export interface BlogType {
	_id: string
	title: string
	content: string
	banner?: string
	authorId: AuthorType
	createdAt: string
	updatedAt: string
}

interface AuthorType {
	_id: string
	firstName: string
}

export interface PaginatedBlogs {
	data: BlogType[]
	meta: {
		total: number
		page: number
		limit: number
		pages: number
	}
}
