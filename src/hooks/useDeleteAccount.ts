import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import toast from 'react-hot-toast'

export function useDeleteAccount() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			const res = await api.delete('/auth/me')
			return res.data
		},
		onSuccess: () => {
			toast.success('Account deleted successfully')

			if (typeof window !== 'undefined') {
				localStorage.removeItem('isLoggedIn')
			}

			queryClient.setQueryData(['user-me'], null)
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message ||
				'Failed to delete account. Please try again.'

			toast.error(errorMessage)
		},
	})
}
