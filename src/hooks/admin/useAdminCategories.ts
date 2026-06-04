'use client'

import api from '@/src/lib/api'
import { CategoryType } from '@/src/types/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export function useAdminCategories() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery<CategoryType[], AxiosError>({
		queryKey: ['admin-categories'],
		queryFn: async () => {
			const res = await api.get('/categories')
			return res.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const createCategoryMutation = useMutation<
		CategoryType,
		AxiosError,
		FormData
	>({
		mutationFn: async dto => {
			const res = await api.post('/categories', dto, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return res.data
		},
		onSuccess: () => {
			toast.success('Category created')
			queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
			queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] })
		},
		onError: () => {
			toast.error('Failed to create category')
		},
	})

	const updateCategoryMutation = useMutation<
		CategoryType,
		AxiosError,
		{ id: string; dto: FormData }
	>({
		mutationFn: async ({ id, dto }) => {
			const res = await api.patch(`/categories/${id}`, dto, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return res.data
		},
		onSuccess: () => {
			toast.success('Category updated')
			queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
			queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] })
		},
		onError: () => {
			toast.error('Failed to update category')
		},
	})

	const deleteCategoryMutation = useMutation<void, AxiosError, string>({
		mutationFn: async id => {
			await api.delete(`/categories/${id}`)
		},
		onSuccess: () => {
			toast.success('Category deleted')
			queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
			queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] })
		},
		onError: () => {
			toast.error('Failed to delete category')
		},
	})

	return {
		categories: data,
		isLoading,
		error,
		isError: !!error,

		isCreating: createCategoryMutation.isPending,
		createCategory: createCategoryMutation.mutate,

		updateCategory: updateCategoryMutation.mutate,
		isUpdating: updateCategoryMutation.isPending,

		deleteCategory: deleteCategoryMutation.mutate,
		isDeleting: deleteCategoryMutation.isPending,
	}
}
