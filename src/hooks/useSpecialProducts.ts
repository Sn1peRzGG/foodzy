'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/src/lib/api'
import { PaginatedProducts, ProductType } from '@/src/types/product'

export function useSpecialProducts() {
	const { data, isLoading, error } = useQuery<PaginatedProducts>({
		queryKey: ['products', 'special-dishes'],
		queryFn: async () => {
			const res = await api.get('/products/search', {
				params: {
					page: 1,
					limit: 12,
					isAvailable: 'true',
					sortBy: 'rating',
				},
			})
			return res.data
		},
		staleTime: 1000 * 60 * 10,
	})

	const specialProducts = Array.isArray(data?.data) ? data.data : []

	return {
		specialProducts,
		isLoading,
		error,
	}
}
