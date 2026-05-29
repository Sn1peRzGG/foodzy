import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { UserType } from '../types/user'

export function useUser() {
	const hasSession =
		typeof window !== 'undefined' &&
		localStorage.getItem('isLoggedIn') === 'true'

	return useQuery<UserType | null>({
		queryKey: ['user-me'],
		queryFn: async () => {
			try {
				const res = await api.get('/auth/me')
				return res.data
			} catch {
				if (typeof window !== 'undefined') {
					localStorage.removeItem('isLoggedIn')
				}
				return null
			}
		},
		enabled: hasSession,
		staleTime: 1000 * 60 * 5,
		retry: false,
	})
}
