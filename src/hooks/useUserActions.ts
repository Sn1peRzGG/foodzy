'use client'

import { useState, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { useUser } from '@/src/hooks/useUser'
import { UserType } from '@/src/types/user'
import toast from 'react-hot-toast'

type LoadingState = Record<string, 'wishlist' | 'cart' | 'update' | 'remove'>

export function useUserActions() {
	const queryClient = useQueryClient()

	const { data: user, isLoading } = useUser() as {
		data: UserType | undefined
		isLoading: boolean
	}

	const [loadingStates, setLoadingStates] = useState<LoadingState>({})

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

	const toggleWishlistMutation = useMutation({
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

	const setLoading = useCallback(
		(id: string, state: LoadingState[string] | null) => {
			setLoadingStates(prev => {
				if (prev[id] === state) return prev
				const next = { ...prev }
				if (state) next[id] = state
				else delete next[id]
				return next
			})
		},
		[],
	)

	const isInWishlist = useCallback(
		(productId: string) =>
			user?.wishlist?.some(item => {
				if (typeof item === 'string') return item === productId
				return String(item?._id) === productId
			}) ?? false,
		[user?.wishlist],
	)

	const isInCart = useCallback(
		(productId: string) =>
			user?.cart?.some(item => {
				const id =
					item?.product && typeof item.product === 'object'
						? item.product._id
						: item?.product
				return String(id) === productId
			}) ?? false,
		[user?.cart],
	)

	const toggleWishlist = useCallback(
		(productId: string) => {
			if (!user) return toast.error('Please login')

			const key = productId
			setLoading(key, 'wishlist')

			const isItemInWishlist = isInWishlist(productId)

			toggleWishlistMutation.mutate(productId, {
				onSettled: () => setLoading(key, null),
				onSuccess: () =>
					toast.success(
						isItemInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
					),
			})
		},
		[user, isInWishlist, toggleWishlistMutation, setLoading],
	)

	const addToCart = useCallback(
		(productId: string, quantity = 1, isAvailable?: boolean) => {
			if (!user) return toast.error('Please login')
			if (isAvailable === false) return toast.error('Out of stock')

			const key = productId
			setLoading(key, 'cart')

			addToCartMutation.mutate(
				{ productId, quantity },
				{
					onSettled: () => setLoading(key, null),
					onSuccess: () => toast.success('Added to cart'),
				},
			)
		},
		[user, addToCartMutation, setLoading],
	)

	const removeFromCart = useCallback(
		(productId: string) => {
			if (!user) return

			const key = productId
			setLoading(key, 'remove')

			removeFromCartMutation.mutate(productId, {
				onSettled: () => setLoading(key, null),
				onSuccess: () => toast.success('Removed from cart'),
			})
		},
		[user, removeFromCartMutation, setLoading],
	)

	const updateCartQuantity = useCallback(
		(productId: string, targetQuantity: number) => {
			if (!user || targetQuantity < 1) return

			const currentItem = user.cart.find(item => {
				const id =
					item?.product && typeof item.product === 'object'
						? item.product._id
						: item?.product
				return String(id) === productId
			})

			if (!currentItem) return

			const delta = targetQuantity - currentItem.quantity
			if (delta === 0) return

			const key = productId
			setLoading(key, 'update')

			addToCartMutation.mutate(
				{ productId, quantity: delta },
				{
					onSettled: () => setLoading(key, null),
					onSuccess: () => toast.success('Updated'),
				},
			)
		},
		[user, addToCartMutation, setLoading],
	)

	return {
		user,
		isLoading,
		loadingStates,
		isInWishlist,
		isInCart,
		toggleWishlist,
		addToCart,
		removeFromCart,
		updateCartQuantity,
	}
}
