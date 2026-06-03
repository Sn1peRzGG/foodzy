'use client'

import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { OrderType } from '../types/order'

export function useUserOrders() {
	return useQuery<OrderType[]>({
		queryKey: ['user-orders'],
		queryFn: async () => {
			const { data } = await api.get('/orders/my')
			return data
		},
	})
}
