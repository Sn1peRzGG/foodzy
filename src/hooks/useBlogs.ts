'use client'

import api from '@/src/lib/api'
import { BlogType, CreateBlogDto, UpdateBlogDto } from '@/src/types/blog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from './useUser'
import toast from 'react-hot-toast'

export function useBlogs() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	const {
		data: blogs = [],
		isLoading,
		error,
	} = useQuery<BlogType[]>({
		queryKey: ['blogs'],
		queryFn: async () => {
			const res = await api.get('/blogs')
			return res.data
		},
	})

	const createMutation = useMutation({
		mutationFn: async ({
			dto,
			banner,
		}: {
			dto: CreateBlogDto
			banner?: File
		}) => {
			const formData = new FormData()
			formData.append('title', dto.title)
			formData.append('content', dto.content)
			if (banner) formData.append('banner', banner)

			const res = await api.post('/blogs', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			toast.success('Article created')
		},
		onError: () => {
			toast.error('Failed to create article')
		},
	})

	const updateMutation = useMutation({
		mutationFn: async ({
			id,
			dto,
			banner,
			removeBanner,
		}: {
			id: string
			dto: UpdateBlogDto
			banner?: File
			removeBanner?: boolean
		}) => {
			const formData = new FormData()
			if (dto.title) formData.append('title', dto.title)
			if (dto.content) formData.append('content', dto.content)
			if (removeBanner) formData.append('removeBanner', 'true')
			if (banner) formData.append('banner', banner)

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
		onError: () => {
			toast.error('Failed to update article')
		},
	})

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await api.delete(`/blogs/${id}`)
			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			toast.success('Article deleted')
		},
		onError: () => {
			toast.error('Failed to delete article')
		},
	})

	const checkPermission = (blog: BlogType) => {
		if (!user) return false
		if (user.role === 'OWNER') return true

		const blogAuthorId =
			typeof blog.authorId === 'object' ? blog.authorId._id : blog.authorId

		if (user.role === 'ADMIN' && blogAuthorId === user._id) return true
		return false
	}

	const canCreate = user?.role === 'ADMIN' || user?.role === 'OWNER'

	return {
		blogs,
		isLoading,
		error,
		createBlog: createMutation.mutateAsync,
		isCreating: createMutation.isPending,
		updateBlog: updateMutation.mutateAsync,
		isUpdating: updateMutation.isPending,
		deleteBlog: deleteMutation.mutateAsync,
		isDeleting: deleteMutation.isPending,
		checkPermission,
		canCreate,
	}
}
