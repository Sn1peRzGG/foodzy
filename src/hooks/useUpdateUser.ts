import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { UserType } from '../types/user'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (updateData: Record<string, any>) => {
			const { data } = await api.patch('/users/profile', updateData)
			return data
		},
		onSuccess: updatedUser => {
			queryClient.setQueryData(['user-me'], updatedUser)
		},
	})
}

export const useCartMutations = () => {
	const queryClient = useQueryClient()

	const addToCartMutation = useMutation({
		mutationFn: async ({
			productId,
			quantity,
		}: {
			productId: string
			quantity: number
		}) => {
			const { data } = await api.post('/users/cart', {
				product: productId,
				quantity,
			})
			return data
		},
		onSuccess: newCart => {
			queryClient.setQueryData(['user-me'], (oldUser: UserType | undefined) => {
				if (!oldUser) return oldUser
				return { ...oldUser, cart: newCart }
			})
		},
	})

	const removeFromCartMutation = useMutation({
		mutationFn: async (productId: string) => {
			const { data } = await api.delete(`/users/cart/${productId}`)
			return data
		},
		onSuccess: newCart => {
			queryClient.setQueryData(['user-me'], (oldUser: UserType | undefined) => {
				if (!oldUser) return oldUser
				return { ...oldUser, cart: newCart }
			})
		},
	})

	return { addToCartMutation, removeFromCartMutation }
}

export const useWishlistMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (productId: string) => {
			const { data } = await api.post(`/users/wishlist/${productId}`)
			return data
		},
		onSuccess: newWishlist => {
			queryClient.setQueryData(['user-me'], (oldUser: UserType | undefined) => {
				if (!oldUser) return oldUser
				return { ...oldUser, wishlist: newWishlist }
			})
		},
	})
}
