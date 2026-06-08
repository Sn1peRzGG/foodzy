'use client'

import api from '@/src/lib/api'
import { AdminReview } from '@/src/types/review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export function useAdminReviews() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery<AdminReview[], AxiosError>({
		queryKey: ['admin-reviews'],
		queryFn: async () => {
			const res = await api.get('/reviews/admin/all')
			return res.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const updateStatusMutation = useMutation<
		AdminReview,
		AxiosError,
		{ id: string; status: 'PENDING' | 'APPROVED' | 'REJECTED' }
	>({
		mutationFn: async ({ id, status }) => {
			const res = await api.patch(`/reviews/admin/${id}/status`, { status })
			return res.data
		},
		onSuccess: () => {
			toast.success('Status updated')
			queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
		},
		onError: () => {
			toast.error('Failed to update status')
		},
	})

	const deleteReviewMutation = useMutation<void, AxiosError, string>({
		mutationFn: async (id: string) => {
			await api.delete(`/reviews/${id}`)
		},
		onSuccess: () => {
			toast.success('Review deleted')
			queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
		},
		onError: () => {
			toast.error('Failed to delete review')
		},
	})

	return {
		reviews: data,
		isLoading,
		error,
		isError: !!error,

		updateStatus: updateStatusMutation.mutate,
		isUpdating: updateStatusMutation.isPending,

		deleteReview: deleteReviewMutation.mutate,
		isDeleting: deleteReviewMutation.isPending,
	}
}
