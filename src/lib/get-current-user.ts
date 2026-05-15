import api from '@/src/lib/api'
import { UserType } from '@/src/types/user'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
	const cookieStore = await cookies()

	const token = cookieStore.get('jwt')?.value

	if (!token) {
		return null
	}

	try {
		const decoded: any = jwtDecode(token)

		const response = await api.get(`/users/${decoded.userId}`, {
			headers: {
				Cookie: `jwt=${token}`,
			},
		})

		return response.data as UserType
	} catch {
		return null
	}
}
