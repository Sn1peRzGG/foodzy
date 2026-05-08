export type UserType = {
	userId: number
	email: string
	password: string
	firstName: string
	lastName: string
	phoneNumber: string
	city: string
	address: string
	role: 'USER' | 'ADMIN'
	avatarUrl: string
}
