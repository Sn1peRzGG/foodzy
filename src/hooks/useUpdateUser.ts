'use client'

import api from '@/src/lib/api'
import { UserType } from '@/src/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

interface UpdateUserPayload {
	id: string
	dto: FormData
}

export function useUpdateUser() {
	const queryClient = useQueryClient()

	const updateUserMutation = useMutation<
		UserType,
		AxiosError<any>,
		UpdateUserPayload
	>({
		mutationFn: async ({ id, dto }) => {
			const res = await api.patch(`/users/${id}`, dto, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return res.data
		},
		onSuccess: updatedUser => {
			toast.success('Profile updated successfully')
			queryClient.setQueryData(['user-me'], updatedUser)
			queryClient.invalidateQueries({ queryKey: ['user-me'] })
		},
		onError: error => {
			const errorMsg =
				error.response?.data?.message || 'Failed to update profile'
			toast.error(errorMsg)
		},
	})

	return {
		updateUser: updateUserMutation.mutate,
		updateUserAsync: updateUserMutation.mutateAsync,
		isUpdating: updateUserMutation.isPending,
		error: updateUserMutation.error,
		isError: updateUserMutation.isError,
	}
}
