'use client'

import BlogCard from '@/src/components/ui/BlogCard'
import BlogModal from '@/src/components/ui/BlogModal'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useBlogs } from '@/src/hooks/useBlogs'
import { BlogType } from '@/src/types/blog'
import { FileText, LayoutGrid, Rows3 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BlogsPage() {
	const {
		blogs,
		isLoading,
		error,
		canCreate,
		createBlog,
		isCreating,
		updateBlog,
		isUpdating,
		deleteBlog,
		isDeleting,
		checkPermission,
	} = useBlogs()

	const [isMounted, setIsMounted] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedBlog, setSelectedBlog] = useState<BlogType | undefined>(
		undefined,
	)
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [blogIdToDelete, setBlogIdToDelete] = useState<string | null>(null)

	useEffect(() => {
		const savedViewMode = window.sessionStorage.getItem('blogViewMode')
		if (savedViewMode === 'grid' || savedViewMode === 'list') {
			setViewMode(savedViewMode)
		}
		setIsMounted(true)
	}, [])

	const toggleViewMode = (mode: 'grid' | 'list') => {
		setViewMode(mode)
		window.sessionStorage.setItem('blogViewMode', mode)
	}

	if (!isMounted) {
		return (
			<div className='w-full flex items-center justify-center py-20'>
				<div className='text-text-muted animate-pulse'>Loading...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='w-full flex items-center justify-center py-20'>
				<p className='text-red-500'>Failed to load blog posts.</p>
			</div>
		)
	}

	const handleModalSubmit = async (data: {
		title: string
		content: string
		banner?: File
		removeBanner?: boolean
	}) => {
		if (selectedBlog) {
			await updateBlog({
				id: selectedBlog._id,
				dto: {
					title: data.title,
					content: data.content,
				},
				banner: data.banner,
				removeBanner: data.removeBanner,
			})
		} else {
			await createBlog({
				dto: { title: data.title, content: data.content },
				banner: data.banner,
			})
		}
		setIsModalOpen(false)
	}

	const handleEditClick = (blog: BlogType, e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setSelectedBlog(blog)
		setIsModalOpen(true)
	}

	const handleDeleteClick = (id: string, e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setBlogIdToDelete(id)
		setIsDeleteOpen(true)
	}

	const handleConfirmDelete = async () => {
		if (blogIdToDelete) {
			await deleteBlog(blogIdToDelete)
			setIsDeleteOpen(false)
			setBlogIdToDelete(null)
		}
	}

	const blogTitleToDelete = blogs.find(b => b._id === blogIdToDelete)?.title

	return (
		<div className='container-responsive px-4 mx-auto max-w-7xl py-8 w-full min-w-0 overflow-hidden'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-border-main pb-4 w-full min-w-0'>
				<div className='min-w-0 flex-1 w-full'>
					<h1 className='text-2xl sm:text-3xl font-black text-text-main max-w-full'>
						Our Publication Articles
					</h1>
					<p className='text-sm text-text-muted mt-1 max-w-full'>
						Publications – Found{' '}
						<span className='font-semibold text-primary'>{blogs.length}</span>{' '}
						items
					</p>
				</div>

				<div className='flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0'>
					<div className='flex items-center gap-1 border border-border-strong rounded-md h-10 px-1.5 bg-card-bg shadow-sm select-none'>
						<button
							type='button'
							onClick={() => toggleViewMode('list')}
							className={`p-1.5 rounded-md transition-all cursor-pointer ${
								viewMode === 'list'
									? 'bg-ui-hover text-primary font-semibold'
									: 'text-text-subtle hover:text-text-muted hover:bg-main-bg'
							}`}
							title='List view'
						>
							<Rows3 size={18} />
						</button>

						<button
							type='button'
							onClick={() => toggleViewMode('grid')}
							className={`p-1.5 rounded-md transition-all cursor-pointer ${
								viewMode === 'grid'
									? 'bg-ui-hover text-primary font-semibold'
									: 'text-text-subtle hover:text-text-muted hover:bg-main-bg'
							}`}
							title='Grid view'
						>
							<LayoutGrid size={18} />
						</button>
					</div>

					{canCreate && (
						<button
							type='button'
							onClick={() => {
								setSelectedBlog(undefined)
								setIsModalOpen(true)
							}}
							className='flex items-center gap-2 border border-border-strong rounded-md h-10 px-4 py-2 bg-card-bg text-text-main font-medium text-sm shadow-sm hover:bg-ui-hover transition-colors cursor-pointer'
						>
							<FileText size={16} className='text-primary' />
							Create Post
						</button>
					)}
				</div>
			</div>

			<div className='flex flex-col xl:flex-row gap-8 items-start w-full'>
				<div className='w-full transition-all duration-200 ease-in-out'>
					{isLoading && blogs.length === 0 ? (
						<div
							className={
								viewMode === 'grid'
									? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'
									: 'flex flex-col gap-4 w-full'
							}
						>
							{Array.from({ length: viewMode === 'grid' ? 6 : 3 }).map(
								(_, idx) => (
									<div
										key={idx}
										className={`border border-border-main rounded-xl bg-card-bg p-4 flex gap-3 animate-pulse shadow-sm w-full ${
											viewMode === 'list'
												? 'flex-col md:flex-row h-auto md:h-52'
												: 'flex-col'
										}`}
									>
										<div
											className={`bg-main-bg rounded-lg shrink-0 ${viewMode === 'list' ? 'w-full md:w-72 h-48 md:h-full' : 'w-full aspect-16/10'}`}
										/>
										<div className='flex-1 flex flex-col gap-3 py-2 min-w-0 w-full'>
											<div className='h-4 bg-main-bg rounded w-1/4' />
											<div className='h-6 bg-main-bg rounded w-3/4' />
											<div className='h-4 bg-main-bg rounded w-full' />
											<div className='h-4 bg-main-bg rounded w-2/3' />
										</div>
									</div>
								),
							)}
						</div>
					) : blogs.length === 0 ? (
						<div className='text-center py-20 bg-main-bg rounded-xl border border-dashed border-border-main w-full'>
							<p className='text-text-muted text-lg'>
								We couldn&apos;t find any publications at the moment.
							</p>
							<Link
								href='/'
								className='text-primary font-semibold mt-2 inline-block hover:underline'
							>
								Go back home
							</Link>
						</div>
					) : (
						<div
							className={
								viewMode === 'grid'
									? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full'
									: 'flex flex-col gap-4 w-full'
							}
						>
							{blogs.map(blog => (
								<BlogCard
									key={blog._id}
									blog={blog}
									viewMode={viewMode}
									onEdit={handleEditClick}
									onDelete={handleDeleteClick}
									hasPermission={checkPermission(blog)}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			<BlogModal
				isOpen={isModalOpen}
				blog={selectedBlog}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleModalSubmit}
				isLoading={isCreating || isUpdating}
			/>

			<ConfirmModal
				isOpen={isDeleteOpen}
				isLoading={isDeleting}
				onClose={() => {
					setIsDeleteOpen(false)
					setBlogIdToDelete(null)
				}}
				onConfirm={handleConfirmDelete}
				title='Delete Blog Post'
				description={`Are you sure you want to delete ${blogTitleToDelete ? `"${blogTitleToDelete}"` : 'this post'}? This action is permanent.`}
				confirmText='Delete'
				cancelText='Cancel'
				variant='danger'
			/>
		</div>
	)
}
