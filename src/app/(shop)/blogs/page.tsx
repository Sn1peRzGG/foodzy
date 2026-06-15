'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
	LayoutGrid,
	Rows3,
	ChevronLeft,
	ChevronRight,
	ChevronDown,
} from 'lucide-react'
import BlogCard from '@/src/components/ui/BlogCard'
import BlogCardSkeleton from '@/src/components/ui/BlogCardSkeleton'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import BlogModal from '@/src/components/ui/BlogModal'
import { useBlogs, BlogSortOption } from '@/src/hooks/useBlogs'
import { BlogType } from '@/src/types/blog'
import SortDropdown from '@/src/components/ui/SortDropdown'
import Pagination from '@/src/components/ui/Pagination'

interface BlogsPageProps {
	displayName?: string
}

export default function BlogsPage({ displayName = 'All' }: BlogsPageProps) {
	const {
		blogs,
		meta,
		isLoading,
		error,
		page,
		setPage,
		limit,
		setLimit,
		sortBy,
		setSortBy,
		searchQuery,
		updateBlog,
		isUpdating,
		deleteBlog,
		isDeleting,
		checkPermission,
	} = useBlogs()

	const [isSortOpen, setIsSortOpen] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

	const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const dropdownRef = useRef<HTMLDivElement>(null)

	const sortLabels: Record<BlogSortOption, string> = {
		desc: 'Newest first',
		asc: 'Oldest first',
	}

	useEffect(() => {
		const savedViewMode = window.sessionStorage.getItem('blogsViewMode')
		if (savedViewMode === 'grid' || savedViewMode === 'list') {
			setViewMode(savedViewMode)
		}
		setIsMounted(true)
	}, [])

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsSortOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const toggleViewMode = (mode: 'grid' | 'list') => {
		setViewMode(mode)
		window.sessionStorage.setItem('blogsViewMode', mode)
	}

	const handleEditClick = (blog: BlogType, e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setSelectedBlog(blog)
		setIsEditOpen(true)
	}

	const handleDeleteClick = (id: string, e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const blogToDelete = blogs.find(b => b._id === id)
		if (blogToDelete) {
			setSelectedBlog(blogToDelete)
			setIsDeleteOpen(true)
		}
	}

	const handleUpdateSubmit = async (data: {
		title: string
		content: string
		banner?: File
		removeBanner?: boolean
	}) => {
		if (!selectedBlog) return

		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('content', data.content)
		if (data.removeBanner) formData.append('removeBanner', 'true')
		if (data.banner) formData.append('banner', data.banner)

		await updateBlog({
			id: selectedBlog._id,
			formData,
		})

		setIsEditOpen(false)
		setSelectedBlog(null)
	}

	const handleConfirmDelete = async () => {
		if (!selectedBlog) return
		await deleteBlog(selectedBlog._id)
		setIsDeleteOpen(false)
		setSelectedBlog(null)
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
				<p className='text-red-500'>Failed to load posts.</p>
			</div>
		)
	}

	return (
		<div className='container-responsive px-4 mx-auto max-w-7xl py-8'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-border-main pb-4'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-black text-text-main'>
						{searchQuery ? `Results for "${searchQuery}"` : 'Our Blogs'}
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Category:{' '}
						<span className='font-semibold text-primary'>{displayName}</span> –
						Found {meta?.total || 0} items
					</p>
				</div>

				<div className='flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end'>
					<SortDropdown
						value={sortBy}
						onChange={setSortBy}
						options={sortLabels}
						className='min-w-44 sm:min-w-48'
					/>

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
				</div>
			</div>

			<div className='w-full'>
				{isLoading && blogs.length === 0 ? (
					<div
						className={`transition-all duration-200 ${
							viewMode === 'grid'
								? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
								: 'flex flex-col gap-4'
						}`}
					>
						{Array.from({ length: viewMode === 'grid' ? 6 : 3 }).map(
							(_, index) => (
								<BlogCardSkeleton key={index} viewMode={viewMode} />
							),
						)}
					</div>
				) : blogs.length === 0 ? (
					<div className='text-center py-20 bg-main-bg rounded-xl border border-dashed border-border-main'>
						<p className='text-text-muted text-lg'>
							We couldn&apos;t find anything matching your request.
						</p>
						<Link
							href='/'
							className='text-primary font-semibold mt-2 inline-block hover:underline'
						>
							Go back home
						</Link>
					</div>
				) : (
					<>
						<div
							className={`transition-all duration-200 ${
								viewMode === 'grid'
									? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
									: 'flex flex-col gap-4'
							}`}
						>
							{blogs.map(blog => (
								<BlogCard
									key={blog._id}
									blog={blog}
									viewMode={viewMode}
									onEdit={(blogItem, e) => handleEditClick(blogItem, e)}
									onDelete={(id, e) => handleDeleteClick(id, e)}
									hasPermission={checkPermission(blog)}
								/>
							))}
						</div>

						{meta && (
							<Pagination
								currentPage={page}
								totalPages={meta.pages}
								onPageChange={setPage}
								limit={limit}
								onLimitChange={setLimit}
								limitOptions={[6, 12, 18, 24]}
							/>
						)}
					</>
				)}
			</div>

			{isEditOpen && selectedBlog && (
				<BlogModal
					blog={selectedBlog}
					isOpen={isEditOpen}
					isLoading={isUpdating}
					onClose={() => {
						setIsEditOpen(false)
						setSelectedBlog(null)
					}}
					onSubmit={handleUpdateSubmit}
				/>
			)}

			{isDeleteOpen && selectedBlog && (
				<ConfirmModal
					isOpen={isDeleteOpen}
					isLoading={isDeleting}
					onClose={() => {
						setIsDeleteOpen(false)
						setSelectedBlog(null)
					}}
					onConfirm={handleConfirmDelete}
					title='Delete Publication'
					description={`Are you sure you want to delete "${selectedBlog.title}"? This action cannot be undone.`}
					confirmText='Delete'
					cancelText='Cancel'
					variant='danger'
				/>
			)}
		</div>
	)
}
