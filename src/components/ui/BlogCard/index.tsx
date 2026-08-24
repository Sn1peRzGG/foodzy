'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Edit, Trash2, FileText, User } from 'lucide-react'
import { BlogType } from '@/src/types/blog'
import { BASE_URL } from '@/src/lib/api'
import { formatDate } from '@/src/utils/formatDate'

interface BlogCardProps {
	blog: BlogType
	viewMode?: 'grid' | 'list'
	onEdit: (blog: BlogType, e: React.MouseEvent) => void
	onDelete: (id: string, e: React.MouseEvent) => void
	hasPermission: boolean
}

export default function BlogCard({
	blog,
	viewMode = 'grid',
	onEdit,
	onDelete,
	hasPermission,
}: BlogCardProps) {
	const isList = viewMode === 'list'

	const textExcerpt = useMemo(() => {
		if (!blog.content) return ''
		try {
			const withSpaces = blog.content
				.replace(/<\/(p|h1|h2|li|div|h3)>/g, ' ')
				.replace(/<br\s*\/?>/g, ' ')
			const parser = new DOMParser()
			const doc = parser.parseFromString(withSpaces, 'text/html')
			return (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
		} catch {
			return blog.content
				.replace(/<[^>]*>/g, '')
				.replace(/\s+/g, ' ')
				.trim()
		}
	}, [blog.content])

	const authorName = blog.authorId.firstName || 'Anonymous'

	if (isList) {
		return (
			<Link
				href={`/blogs/${blog._id}`}
				className='relative border border-border-main rounded-xl p-4 shadow-sm transition-all duration-200 flex flex-row items-center gap-5 bg-card-bg group hover:shadow-md min-w-0'
			>
				<div className='bg-main-bg overflow-hidden relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg shrink-0 z-10'>
					{blog.banner ? (
						<Image
							src={`${BASE_URL}${blog.banner}`}
							alt={blog.title}
							fill
							sizes='160px'
							className='object-cover transition-transform duration-500 group-hover:scale-105'
							unoptimized
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-text-subtle bg-main-bg/60'>
							<FileText size={40} strokeWidth={1} />
						</div>
					)}
				</div>

				<div className='flex flex-col grow h-full py-0.5 min-w-0 justify-between'>
					<div className='min-w-0'>
						<div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted font-medium mb-1.5 min-w-0'>
							<div className='flex items-center gap-1.5 shrink-0'>
								<Calendar size={13} className='text-primary' />
								<span>{formatDate(blog.createdAt)}</span>
							</div>
							<span className='text-border-strong hidden sm:inline'>•</span>
							<div className='flex items-center gap-1.5 shrink-0 min-w-0'>
								<User size={13} className='text-primary' />
								<span className='truncate max-w-30 sm:max-w-40'>
									{authorName}
								</span>
							</div>
						</div>

						<h2 className='font-bold text-base sm:text-lg mb-1.5 text-text-main group-hover:text-primary transition-colors line-clamp-1 leading-snug'>
							{blog.title}
						</h2>
						<p className='text-xs sm:text-sm text-text-muted line-clamp-2 max-w-xl leading-relaxed'>
							{textExcerpt || 'No description available...'}
						</p>
					</div>

					<div className='flex items-center justify-end border-t border-border-main pt-3 mt-auto w-full z-20 relative'>
						{hasPermission && (
							<div className='flex gap-2'>
								<button
									type='button'
									onClick={e => onEdit(blog, e)}
									className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 cursor-pointer bg-main-bg border-border-main text-text-subtle hover:text-primary shadow-sm hover:shadow'
									title='Edit publication'
								>
									<Edit size={18} />
								</button>
								<button
									type='button'
									onClick={e => onDelete(blog._id, e)}
									className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 cursor-pointer bg-main-bg border-border-main text-text-subtle hover:text-red-500 shadow-sm hover:shadow'
									title='Delete publication'
								>
									<Trash2 size={18} />
								</button>
							</div>
						)}
					</div>
				</div>
			</Link>
		)
	}

	return (
		<Link
			href={`/blogs/${blog._id}`}
			className='relative border border-border-main rounded-xl p-4 shadow-sm transition-all duration-200 flex flex-col justify-between bg-card-bg group transform hover:shadow-md hover:scale-[1.015] min-w-0'
		>
			<div className='w-full aspect-square rounded-lg overflow-hidden mb-4 relative z-10 bg-main-bg'>
				{blog.banner ? (
					<Image
						src={`${BASE_URL}${blog.banner}`}
						alt={blog.title}
						fill
						sizes='(max-width: 768px) 100vw, 33vw'
						className='object-cover transition-transform duration-500'
						unoptimized
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-text-subtle bg-main-bg/60'>
						<FileText size={40} strokeWidth={1} />
					</div>
				)}
			</div>

			<div className='flex flex-col grow min-w-0'>
				<div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted font-medium mb-1.5 min-w-0'>
					<div className='flex items-center gap-1.5 shrink-0'>
						<Calendar size={13} className='text-primary' />
						<span>{formatDate(blog.createdAt)}</span>
					</div>
					<span className='text-border-strong hidden sm:inline'>•</span>
					<div className='flex items-center gap-1.5 shrink-0 min-w-0'>
						<User size={13} className='text-primary' />
						<span className='truncate max-w-30 sm:max-w-40'>{authorName}</span>
					</div>
				</div>

				<h2 className='font-bold text-base sm:text-lg mb-1.5 text-text-main group-hover:text-primary transition-colors line-clamp-1 leading-snug'>
					{blog.title}
				</h2>
				<p className='text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed'>
					{textExcerpt || 'No description available...'}
				</p>

				<div className='flex items-center justify-end border-t border-border-main pt-3 mt-auto w-full z-20 relative'>
					{hasPermission && (
						<div className='flex gap-2'>
							<button
								type='button'
								onClick={e => onEdit(blog, e)}
								className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 cursor-pointer bg-main-bg border-border-main text-text-subtle hover:text-primary shadow-sm hover:shadow'
								title='Edit publication'
							>
								<Edit size={20} />
							</button>
							<button
								type='button'
								onClick={e => onDelete(blog._id, e)}
								className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all border active:scale-90 cursor-pointer bg-main-bg border-border-main text-text-subtle hover:text-red-500 shadow-sm hover:shadow'
								title='Delete publication'
							>
								<Trash2 size={20} />
							</button>
						</div>
					)}
				</div>
			</div>
		</Link>
	)
}
