import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { UserType } from '../types/user'

export function useUser() {
	return useQuery<UserType | null>({
		queryKey: ['user-me'],
		queryFn: async () => {
			try {
				const res = await api.get('/auth/me')
				return res.data
			} catch {
				return null
			}
		},
		staleTime: 1000 * 60 * 5,
		retry: false,
	})
}
