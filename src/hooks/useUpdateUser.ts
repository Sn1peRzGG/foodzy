import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { useUser } from './useUser'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: async (updateData: Record<string, any>) => {
			const id = user?.userId

			if (id === undefined || id === null || Number.isNaN(id)) {
				console.error('Mutation blocked: ID is NaN or missing')
				throw new Error('Invalid User ID')
			}

			const { data } = await api.patch(`/users/${id}`, updateData)
			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-me'] })
		},
	})
}
