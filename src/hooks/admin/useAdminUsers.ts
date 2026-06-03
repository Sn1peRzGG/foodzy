'use client'

import api from '@/src/lib/api'
import { UserType } from '@/src/types/user'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export function useAdminUsers() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery<UserType[], AxiosError>({
		queryKey: ['admin-users'],
		queryFn: async () => {
			const res = await api.get('/users')
			return res.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const updateUserMutation = useMutation<
		UserType,
		AxiosError,
		{ id: string; dto: Partial<UserType> }
	>({
		mutationFn: async ({ id, dto }) => {
			const res = await api.patch(`/users/${id}`, dto)
			return res.data
		},
		onSuccess: () => {
			toast.success('Role updated')
			queryClient.invalidateQueries({ queryKey: ['admin-users'] })
		},
		onError: () => {
			toast.error('Failed to update role')
		},
	})

	const deleteUserMutation = useMutation<void, AxiosError, string>({
		mutationFn: async id => {
			await api.delete(`/users/${id}`)
		},
		onSuccess: () => {
			toast.success('User deleted')
			queryClient.invalidateQueries({ queryKey: ['admin-users'] })
		},
		onError: () => {
			toast.error('Failed to delete user')
		},
	})

	return {
		users: data,
		isLoading,
		error,
		isError: !!error,

		updateUser: updateUserMutation.mutate,
		isUpdating: updateUserMutation.isPending,

		deleteUser: deleteUserMutation.mutate,
		isDeleting: deleteUserMutation.isPending,
	}
}
