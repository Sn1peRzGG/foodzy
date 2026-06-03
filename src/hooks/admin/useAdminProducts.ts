'use client'

import api from '@/src/lib/api'
import { ProductType } from '@/src/types/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export function useAdminProducts() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery<ProductType[], AxiosError>({
		queryKey: ['admin-products'],
		queryFn: async () => {
			const res = await api.get('/products')
			return res.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const createProductMutation = useMutation<ProductType, AxiosError, FormData>({
		mutationFn: async dto => {
			const res = await api.post('/products', dto, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return res.data
		},
		onSuccess: () => {
			toast.success('Product created')
			queryClient.invalidateQueries({ queryKey: ['admin-products'] })
		},
		onError: () => {
			toast.error('Failed to create product')
		},
	})

	const updateProductMutation = useMutation<
		ProductType,
		AxiosError,
		{ id: string; dto: FormData }
	>({
		mutationFn: async ({ id, dto }) => {
			const res = await api.patch(`/products/${id}`, dto, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return res.data
		},
		onSuccess: () => {
			toast.success('Product updated')
			queryClient.invalidateQueries({ queryKey: ['admin-products'] })
		},
		onError: () => {
			toast.error('Failed to update product')
		},
	})

	const deleteProductMutation = useMutation<void, AxiosError, string>({
		mutationFn: async id => {
			await api.delete(`/products/${id}`)
		},
		onSuccess: () => {
			toast.success('Product deleted')
			queryClient.invalidateQueries({ queryKey: ['admin-products'] })
		},
		onError: () => {
			toast.error('Failed to delete product')
		},
	})

	return {
		products: data,
		isLoading,
		error,
		isError: !!error,

		isCreating: createProductMutation.isPending,
		createProduct: createProductMutation.mutate,

		updateProduct: updateProductMutation.mutate,
		isUpdating: updateProductMutation.isPending,

		deleteProduct: deleteProductMutation.mutate,
		isDeleting: deleteProductMutation.isPending,
	}
}
