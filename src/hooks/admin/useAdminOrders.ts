'use client'

import api from '@/src/lib/api'
import { OrderType } from '@/src/types/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export function useAdminOrders() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery<OrderType[], AxiosError>({
		queryKey: ['admin-orders'],
		queryFn: async () => {
			const res = await api.get('/orders')
			return res.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const updateOrderMutation = useMutation<
		OrderType,
		AxiosError,
		{ id: string; dto: Partial<OrderType> }
	>({
		mutationFn: async ({ id, dto }) => {
			const res = await api.patch(`/orders/${id}/status`, dto)
			return res.data
		},
		onSuccess: () => {
			toast.success('Status updated')
			queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
		},
		onError: () => {
			toast.error('Failed to update status')
		},
	})

	return {
		orders: data,
		isLoading,
		error,
		isError: !!error,

		updateOrder: updateOrderMutation.mutate,
		isUpdating: updateOrderMutation.isPending,
	}
}
