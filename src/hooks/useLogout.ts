'use client'

import api from '@/src/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useLogout() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const logout = async () => {
		try {
			await api.post('/auth/logout')

			localStorage.removeItem('isLoggedIn')
			queryClient.clear()

			toast.success('Logged out')

			router.push('/login')
			router.refresh()
		} catch (error: any) {
			localStorage.removeItem('isLoggedIn')
			queryClient.clear()

			const message =
				error.response?.data?.message || error.message || 'Failed to logout'
			toast.error(message)

			router.push('/login')
		}
	}

	return { logout }
}
