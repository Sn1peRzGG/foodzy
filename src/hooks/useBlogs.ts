'use client'

import api from '@/src/lib/api'
import { BlogType, PaginatedBlogs } from '@/src/types/blog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from './useUser'
import toast from 'react-hot-toast'
import { hasAccess } from '../utils/roles'
import { AxiosError } from 'axios'
import { getApiError } from '../utils/getApiError'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type BlogSortOption = 'desc' | 'asc'

export function useBlogs() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	const searchQuery = searchParams.get('search') || ''

	const pageParam = searchParams.get('page')
	const page = pageParam ? parseInt(pageParam, 10) || 1 : 1

	const limitParam = searchParams.get('limit')
	const limit = limitParam ? parseInt(limitParam, 10) || 12 : 12

	const sortBy = (searchParams.get('sortBy') as BlogSortOption) || 'desc'

	const setMultipleParams = (entries: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString())
		let shouldResetPage = false

		Object.entries(entries).forEach(([key, value]) => {
			if (
				value === null ||
				value === '' ||
				(key === 'sortBy' && value === 'desc') ||
				(key === 'page' && value === '1') ||
				(key === 'limit' && value === '12')
			) {
				params.delete(key)
			} else {
				params.set(key, value)
			}

			if (key !== 'page' && key !== 'limit') {
				shouldResetPage = true
			}
		})

		if (shouldResetPage) {
			params.delete('page')
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	const setParam = (key: string, value: string | null) => {
		setMultipleParams({ [key]: value })
	}

	const setPage = (newPageOrFn: number | ((prev: number) => number)) => {
		const targetPage =
			typeof newPageOrFn === 'function' ? newPageOrFn(page) : newPageOrFn
		setParam('page', targetPage.toString())
	}

	const setLimit = (newLimit: number) => {
		setMultipleParams({ limit: newLimit.toString(), page: '1' })
	}

	const setSortBy = (option: BlogSortOption) => {
		setMultipleParams({ sortBy: option, page: '1' })
	}

	const { data, isLoading, error } = useQuery<PaginatedBlogs, AxiosError>({
		queryKey: ['blogs', searchQuery, page, limit, sortBy],
		queryFn: async () => {
			const res = await api.get('/blogs', {
				params: {
					page,
					limit,
					sortBy,
					search: searchQuery || undefined,
				},
			})
			return res.data
		},
		placeholderData: previousData => previousData,
		refetchOnWindowFocus: false,
	})

	const blogs = Array.isArray(data?.data) ? data.data : []

	const createBlogMutation = useMutation<BlogType, AxiosError, FormData>({
		mutationFn: async formData => {
			const res = await api.post('/blogs', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			toast.success('Article created')
		},
		onError: err => {
			toast.error(getApiError(err) || 'Failed to create article')
		},
	})

	const updateMutation = useMutation<
		BlogType,
		AxiosError,
		{ id: string; formData: FormData }
	>({
		mutationFn: async ({ id, formData }) => {
			const res = await api.patch(`/blogs/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			return res.data
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			queryClient.invalidateQueries({ queryKey: ['blog', variables.id] })
			toast.success('Article updated')
		},
		onError: err => {
			toast.error(getApiError(err) || 'Failed to update article')
		},
	})

	const deleteMutation = useMutation<void, AxiosError, string>({
		mutationFn: async (id: string) => {
			await api.delete(`/blogs/${id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			toast.success('Article deleted')
		},
		onError: err => {
			toast.error(getApiError(err) || 'Failed to delete article')
		},
	})

	const checkPermission = (blog: BlogType) => {
		if (!user) return false
		if (hasAccess(user.role, 'OWNER')) return true
		const blogAuthorId =
			typeof blog.authorId === 'object' ? blog.authorId._id : blog.authorId
		if (hasAccess(user.role, 'ADMIN') && blogAuthorId === user._id) return true
		return false
	}

	return {
		blogs,
		meta: data?.meta,
		isLoading,
		error,
		page,
		setPage,
		limit,
		setLimit,
		sortBy,
		setSortBy,
		searchQuery,
		checkPermission,
		canCreate: hasAccess(user?.role, 'ADMIN'),
		createBlog: createBlogMutation.mutateAsync,
		isCreating: createBlogMutation.isPending,
		updateBlog: updateMutation.mutateAsync,
		isUpdating: updateMutation.isPending,
		deleteBlog: deleteMutation.mutateAsync,
		isDeleting: deleteMutation.isPending,
	}
}
