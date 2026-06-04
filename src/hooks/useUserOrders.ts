'use client'

import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { OrderType } from '../types/order'
import { useUser } from './useUser'

export function useUserOrders() {
	const { data: user, isLoading: isUserLoading } = useUser()

	return useQuery<OrderType[]>({
		queryKey: ['user-orders'],
		queryFn: async () => {
			const { data } = await api.get('/orders/my')
			return data
		},
		enabled: !!user && !isUserLoading,
		retry: false,
	})
}
