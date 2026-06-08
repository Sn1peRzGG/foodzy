'use client'

import api from '@/src/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CreateReviewDto, ReviewType, UpdateReviewDto } from '../types/review'

export function useReviews(productId?: string) {
	const queryClient = useQueryClient()

	const {
		data: reviews = [],
		isLoading,
		error,
	} = useQuery<ReviewType[]>({
		queryKey: ['reviews', productId],
		queryFn: async () => {
			const response = await api.get(`/reviews/product/${productId}`)
			return response.data
		},
		enabled: !!productId,
	})

	const createReviewMutation = useMutation({
		mutationFn: async (dto: CreateReviewDto) => {
			const response = await api.post('/reviews', dto)
			return response.data
		},
		onSuccess: (data: ReviewType, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['reviews', variables.product],
			})
			queryClient.invalidateQueries({
				queryKey: ['product', variables.product],
			})

			if (data.status === 'REJECTED') {
				toast.error(
					'Your review was hidden because it triggered the spam filter.',
					{
						duration: 5000,
					},
				)
			} else {
				toast.success('Review submitted successfully')
			}
		},
		onError: (error: any) => {
			const message = error.response?.data?.message || 'Failed to submit review'
			toast.error(message)
		},
	})

	const updateReviewMutation = useMutation({
		mutationFn: async ({
			reviewId,
			dto,
		}: {
			reviewId: string
			dto: UpdateReviewDto
		}) => {
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
		onError: (error: any) => {
			const message = error.response?.data?.message || 'Failed to update review'
			toast.error(message)
		},
	})

	const deleteReviewMutation = useMutation({
		mutationFn: async (reviewId: string) => {
			const response = await api.delete(`/reviews/${reviewId}`)
			return response.data
		},
		onSuccess: () => {
			if (productId) {
				queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
				queryClient.invalidateQueries({ queryKey: ['product', productId] })
			}
			toast.success('Review deleted successfully')
		},
		onError: (error: any) => {
			const message = error.response?.data?.message || 'Failed to delete review'
			toast.error(message)
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
