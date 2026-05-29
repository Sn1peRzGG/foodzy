'use client'

import { useState, useCallback } from 'react'
import { useUpdateUser } from '@/src/hooks/useUpdateUser'
import { useUser } from '@/src/hooks/useUser'
import { UserType } from '@/src/types/user'
import toast from 'react-hot-toast'

type LoadingState = Record<string, 'wishlist' | 'cart' | 'update' | 'remove'>

export function useUserActions() {
	const { mutate } = useUpdateUser()
	const { data: user, isLoading } = useUser() as {
		data: UserType | undefined
		isLoading: boolean
	}

	const [loadingStates, setLoadingStates] = useState<LoadingState>({})

	const setLoading = useCallback(
		(id: string, state: LoadingState[string] | null) => {
			setLoadingStates(prev => {
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
			user?.wishlist?.some(item => String(item._id) === productId) ?? false,
		[user?.wishlist],
	)

	const isInCart = useCallback(
		(productId: string) =>
			user?.cart?.some(item => String(item.product._id) === productId) ?? false,
		[user?.cart],
	)

	const toggleWishlist = useCallback(
		(productId: string) => {
			if (!user) return toast.error('Please login')

			const key = productId
			setLoading(key, 'wishlist')

			const ids = user.wishlist.map(i => String(i._id))
			const isItemInWishlist = ids.includes(productId)

			const updated = isItemInWishlist
				? ids.filter(id => id !== productId)
				: [...ids, productId]

			mutate(
				{ wishlist: updated as any },
				{
					onSettled: () => setLoading(key, null),
					onSuccess: () =>
						toast.success(
							isItemInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
						),
				},
			)
		},
		[user, mutate, setLoading],
	)

	const addToCart = useCallback(
		(productId: string, quantity = 1, isAvailable?: boolean) => {
			if (!user) return toast.error('Please login')
			if (isAvailable === false) return toast.error('Out of stock')

			const key = productId
			setLoading(key, 'cart')

			const cartItems = user.cart.map(item => ({
				product: String(item.product._id),
				quantity: item.quantity,
			}))

			const exists = cartItems.find(i => i.product === productId)

			const updated = exists
				? cartItems.map(i =>
						i.product === productId
							? { ...i, quantity: i.quantity + quantity }
							: i,
					)
				: [...cartItems, { product: productId, quantity }]

			mutate(
				{ cart: updated as any },
				{
					onSettled: () => setLoading(key, null),
					onSuccess: () => toast.success('Added to cart'),
				},
			)
		},
		[user, mutate, setLoading],
	)

	const removeFromCart = useCallback(
		(productId: string) => {
			if (!user) return

			const key = productId
			setLoading(key, 'remove')

			const updated = user.cart
				.filter(i => String(i.product._id) !== productId)
				.map(i => ({
					product: String(i.product._id),
					quantity: i.quantity,
				}))

			mutate(
				{ cart: updated as any },
				{
					onSettled: () => setLoading(key, null),
					onSuccess: () => toast.success('Removed from cart'),
				},
			)
		},
		[user, mutate, setLoading],
	)

	const updateCartQuantity = useCallback(
		(productId: string, quantity: number) => {
			if (!user) return

			const key = productId
			setLoading(key, 'update')

			const updated = user.cart.map(item => ({
				product: String(item.product._id),
				quantity:
					String(item.product._id) === productId ? quantity : item.quantity,
			}))

			mutate(
				{ cart: updated as any },
				{
					onSettled: () => setLoading(key, null),
					onSuccess: () => toast.success('Updated'),
				},
			)
		},
		[user, mutate, setLoading],
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
