'use client'

import api from '@/src/lib/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useLogout() {
	const router = useRouter()

	const logout = async () => {
		try {
			const response = await api.post('/auth/logout')

			if (response.status === 200 || response.status === 201) {
				toast.success('Logged out successfully')

				router.push('/login')
				router.refresh()
			}
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Failed to logout')
		}
	}

	return { logout }
}
