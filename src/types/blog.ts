export interface BlogType {
	_id: string
	title: string
	content: string
	banner?: string
	authorId: string | AuthorType
	createdAt: string
	updatedAt: string
}

interface AuthorType {
	_id: string
	firstName: string
}

export interface CreateBlogDto {
	title: string
	content: string
}

export interface UpdateBlogDto {
	title?: string
	content?: string
}
