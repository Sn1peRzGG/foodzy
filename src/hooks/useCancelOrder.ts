'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import toast from 'react-hot-toast'

export function useCancelOrder() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (orderId: string) => {
			const { data } = await api.patch(`/orders/${orderId}/cancel`)
			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-orders'] })
			toast.success('Order cancelled successfully')
		},
		onError: (error: any) => {
			const message = error.response?.data?.message || 'Failed to cancel order'
			toast.error(message)
		},
	})
}
