'use client'

import api from '@/src/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { ReviewType } from '../types/review'
import { AxiosError } from 'axios'
import { getApiError } from '../utils/getApiError'

export function useReviews(productId?: string) {
	const queryClient = useQueryClient()

	const {
		data: reviews = [],
		isLoading,
		error,
	} = useQuery<ReviewType[], AxiosError>({
		queryKey: ['reviews', productId],
		queryFn: async () => {
			const response = await api.get(`/reviews/product/${productId}`)
			return response.data
		},
		enabled: !!productId,
		refetchOnWindowFocus: false,
	})

	const createReviewMutation = useMutation<
		ReviewType,
		AxiosError,
		{ product: string; rating: number; text: string }
	>({
		mutationFn: async dto => {
			const response = await api.post('/reviews', dto)
			return response.data
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['reviews', variables.product],
			})
			queryClient.invalidateQueries({
				queryKey: ['product', variables.product],
			})

			if (data.status === 'REJECTED') {
				toast.error(
					'Your review was hidden because it triggered the spam filter.',
					{ duration: 5000 },
				)
			} else {
				toast.success('Review submitted successfully')
			}
		},
		onError: err => {
			toast.error(getApiError(err) || 'Failed to submit review')
		},
	})

	const updateReviewMutation = useMutation<
		ReviewType,
		AxiosError,
		{ reviewId: string; dto: { rating: number; text: string } }
	>({
		mutationFn: async ({ reviewId, dto }) => {
			const response = await api.patch(`/reviews/${reviewId}`, dto)
			return response.data
		},
		onSuccess: () => {
			if (productId) {
				queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
				queryClient.invalidateQueries({ queryKey: ['product', productId] })
			}
			toast.success('Review updated successfully')
		},
		onError: err => {
			toast.error(getApiError(err) || 'Failed to update review')
		},
	})

	const deleteReviewMutation = useMutation<void, AxiosError, string>({
		mutationFn: async (reviewId: string) => {
			await api.delete(`/reviews/${reviewId}`)
		},
		onSuccess: () => {
			if (productId) {
				queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
				queryClient.invalidateQueries({ queryKey: ['product', productId] })
			}
			toast.success('Review deleted successfully')
		},
		onError: err => {
			toast.error(getApiError(err) || 'Failed to delete review')
		},
	})

	return {
		reviews,
		isLoading,
		error,
		createReview: createReviewMutation.mutateAsync,
		isCreating: createReviewMutation.isPending,
		updateReview: updateReviewMutation.mutateAsync,
		isUpdating: updateReviewMutation.isPending,
		deleteReview: deleteReviewMutation.mutateAsync,
		isDeleting: deleteReviewMutation.isPending,
	}
}
