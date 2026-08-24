'use client'

import api from '@/src/lib/api'
import { SubscriberType } from '@/src/types/subscriber'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export function useAdminSubscribers() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery<SubscriberType[], AxiosError>({
		queryKey: ['admin-subscribers'],
		queryFn: async () => {
			const res = await api.get('/subscribers')
			return res.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const deleteSubscriberMutation = useMutation<void, AxiosError, string>({
		mutationFn: async id => {
			await api.delete(`/subscribers/${id}`)
		},
		onSuccess: () => {
			toast.success('Subscriber removed')
			queryClient.invalidateQueries({ queryKey: ['admin-subscribers'] })
		},
		onError: (err: any) => {
			const errMsg =
				err?.response?.data?.message || 'Failed to delete subscriber'
			toast.error(errMsg)
		},
	})

	return {
		subscribers: data,
		isLoading,
		error,
		isError: !!error,

		deleteSubscriber: deleteSubscriberMutation.mutate,
		isDeleting: deleteSubscriberMutation.isPending,
	}
}
