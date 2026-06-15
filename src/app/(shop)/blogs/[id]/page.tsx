'use client'

import Loading from '@/src/app/loading'
import BlogModal from '@/src/components/ui/BlogModal'
import FullBlogCard from '@/src/components/ui/FullBlogCard'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useBlogs } from '@/src/hooks/useBlogs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useBreadcrumbs } from '@/src/context/BreadcrumbsContext'
import { useQuery } from '@tanstack/react-query'
import { BlogType } from '@/src/types/blog'
import api from '@/src/lib/api'

export default function BlogDetailPage() {
	const params = useParams()
	const router = useRouter()

	const [mounted, setMounted] = useState(false)
	const { setLabel } = useBreadcrumbs()

	const blogId = params.id as string

	const {
		data: blog,
		isLoading,
		isError,
	} = useQuery<BlogType>({
		queryKey: ['blog', blogId],
		queryFn: async () => {
			const res = await api.get(`/blogs/${blogId}`)
			return res.data
		},
		enabled: !!blogId,
		retry: false,
	})

	const { updateBlog, isUpdating, deleteBlog, isDeleting, checkPermission } =
		useBlogs()
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	useEffect(() => {
		if (blog?.title && blogId) {
			setLabel(blogId, blog.title)
		}
	}, [blog?.title, blogId, setLabel])

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (isLoading) return <Loading />

	if (isError || !blog) {
		return <div className='container-responsive'>Blog post not found</div>
	}

	const handleUpdateSubmit = async (data: {
		title: string
		content: string
		banner?: File
		removeBanner?: boolean
	}) => {
		if (!blog) return

		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('content', data.content)
		if (data.removeBanner) formData.append('removeBanner', 'true')
		if (data.banner) formData.append('banner', data.banner)

		await updateBlog({
			id: blog._id,
			formData,
		})

		setIsEditOpen(false)
	}

	const handleConfirmDelete = async () => {
		if (!blog) return
		await deleteBlog(blog._id)
		setIsDeleteOpen(false)
		router.push('/blogs')
	}

	return (
		<div className='container-responsive'>
			<FullBlogCard
				blog={blog}
				checkPermission={checkPermission}
				onEditClick={() => setIsEditOpen(true)}
				onDeleteClick={() => setIsDeleteOpen(true)}
			/>

			{isEditOpen && (
				<BlogModal
					blog={blog}
					isOpen={isEditOpen}
					isLoading={isUpdating}
					onClose={() => setIsEditOpen(false)}
					onSubmit={handleUpdateSubmit}
				/>
			)}

			<ConfirmModal
				isOpen={isDeleteOpen}
				isLoading={isDeleting}
				onClose={() => setIsDeleteOpen(false)}
				onConfirm={handleConfirmDelete}
				title='Delete Publication'
				description={`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`}
				confirmText='Delete'
				cancelText='Cancel'
				variant='danger'
			/>
		</div>
	)
}
