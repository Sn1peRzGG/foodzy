'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { Calendar, Edit, Trash2, FileText } from 'lucide-react'
import { BlogType } from '@/src/types/blog'
import Image from 'next/image'
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
			const cleanText = doc.body.textContent || ''

			return cleanText.replace(/\s+/g, ' ').trim()
		} catch (e) {
			return blog.content
				.replace(/<[^>]*>/g, '')
				.replace(/\s+/g, ' ')
				.trim()
		}
	}, [blog.content])

	return (
		<article
			className={`group grid bg-card-bg border border-border-main rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 w-full min-w-0 ${
				isList
					? 'grid-cols-1 md:grid-cols-[288px_1fr] h-auto md:h-52'
					: 'grid-cols-1'
			}`}
		>
			<Link
				href={`/blogs/${blog._id}`}
				className={`relative block bg-main-bg overflow-hidden shrink-0 w-full ${
					isList ? 'h-48 md:h-full' : 'aspect-16/10'
				}`}
			>
				{blog.banner ? (
					<Image
						src={`${BASE_URL}${blog.banner}`}
						alt={blog.title}
						loading='eager'
						fill
						unoptimized
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-text-subtle bg-main-bg/60'>
						<FileText size={40} strokeWidth={1} />
					</div>
				)}
			</Link>

			<div className='p-4 sm:p-5 grid grid-rows-[auto_1fr_auto] gap-1.5 min-w-0 w-full relative min-h-35 md:min-h-full'>
				<div className='flex flex-col gap-1 w-full min-w-0'>
					<div className='flex items-center gap-1.5 text-xs text-text-muted font-medium'>
						<Calendar size={13} className='text-primary' />
						<span>{formatDate(blog.createdAt)}</span>
					</div>

					<Link
						href={`/blogs/${blog._id}`}
						className='block group-hover:text-primary transition-colors max-w-full'
					>
						<h3 className='text-base sm:text-lg font-bold text-text-main line-clamp-1 leading-snug wrap-break-word'>
							{blog.title}
						</h3>
					</Link>
				</div>

				<div className='w-full min-w-0 mt-0.5'>
					<p className='text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed wrap-break-word pr-24'>
						{textExcerpt || 'No description available...'}
					</p>
				</div>

				{hasPermission && (
					<div className='absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex items-center gap-2 bg-card-bg/90 backdrop-blur-sm pl-2 p-1 rounded-xl border border-border-main/40 shadow-sm'>
						<button
							type='button'
							onClick={e => onEdit(blog, e)}
							className='p-2 text-text-muted border border-border-main rounded-lg hover:text-primary hover:bg-main-bg active:bg-ui-active transition-all cursor-pointer bg-card-bg'
							title='Edit publication'
						>
							<Edit size={18} />
						</button>
						<button
							type='button'
							onClick={e => onDelete(blog._id, e)}
							className='p-2 text-text-muted border border-border-main rounded-lg hover:text-red-500 hover:bg-main-bg active:bg-ui-active transition-all cursor-pointer bg-card-bg'
							title='Delete publication'
						>
							<Trash2 size={18} />
						</button>
					</div>
				)}
			</div>
		</article>
	)
}
