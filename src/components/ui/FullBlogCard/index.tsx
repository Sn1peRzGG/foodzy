'use client'

import { Calendar, Edit, Trash2, FileText, User } from 'lucide-react'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { BlogType } from '@/src/types/blog'
import { BASE_URL } from '@/src/lib/api'
import DOMPurify from 'isomorphic-dompurify'
import { formatDate } from '@/src/utils/formatDate'

interface FullBlogCardProps {
	blog: BlogType
	checkPermission: (blog: BlogType) => boolean
	onEditClick: () => void
	onDeleteClick: () => void
}

export default function FullBlogCard({
	blog,
	checkPermission,
	onEditClick,
	onDeleteClick,
}: FullBlogCardProps) {
	const [activeTab, setActiveTab] = useState<'content' | 'author'>('content')
	const authorName =
		typeof blog.authorId === 'object'
			? blog.authorId.firstName
			: 'Unknown Author'

	const sanitizedContent = useMemo(() => {
		return DOMPurify.sanitize(blog.content, {
			ALLOWED_TAGS: [
				'p',
				'br',
				'strong',
				'em',
				'u',
				's',
				'h1',
				'h2',
				'ul',
				'ol',
				'li',
				'span',
			],
			ALLOWED_ATTR: ['style'],
		})
	}, [blog.content])

	return (
		<div className='flex flex-col gap-8 max-w-6xl mx-auto w-full'>
			<div className='flex flex-col bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm gap-6'>
				<div
					className='relative w-full bg-main-bg border border-border-main rounded-xl overflow-hidden group'
					style={{ aspectRatio: '21 / 9' }}
				>
					{blog.banner ? (
						<Image
							src={`${BASE_URL}${blog.banner}`}
							alt={blog.title}
							loading='eager'
							fill
							priority
							unoptimized
							className='object-cover transform group-hover:scale-[1.02] transition-transform duration-500'
						/>
					) : (
						<div className='absolute inset-0 flex items-center justify-center text-text-subtle bg-main-bg text-sm font-bold uppercase tracking-wider'>
							No Banner Provided
						</div>
					)}
				</div>

				<div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pt-2'>
					<div className='flex-1 min-w-0'>
						<div className='flex items-center gap-1.5 text-xs sm:text-sm text-text-muted font-medium mb-3'>
							<Calendar size={16} />
							<span>{formatDate(blog.createdAt)}</span>
						</div>

						<h1 className='text-3xl md:text-4xl font-black text-text-main leading-tight wrap-break-word'>
							{blog.title}
						</h1>
					</div>

					{checkPermission(blog) && (
						<div className='flex items-center gap-4 sm:w-auto w-full shrink-0'>
							<button
								type='button'
								onClick={onEditClick}
								className='flex-1 sm:flex-none h-12 px-6 rounded-xl flex items-center justify-center gap-2.5 font-bold text-sm border border-border-strong bg-card-bg text-text-main shadow-md hover:bg-ui-hover transition-all active:scale-95 cursor-pointer'
							>
								<Edit size={16} className='text-primary' />
								Edit
							</button>
							<button
								type='button'
								onClick={onDeleteClick}
								className='flex-1 sm:flex-none h-12 px-6 rounded-xl flex items-center justify-center gap-2.5 font-bold text-sm border border-border-strong bg-card-bg text-red-500 shadow-md hover:bg-ui-hover transition-all active:scale-95 cursor-pointer'
							>
								<Trash2 size={16} />
								Delete
							</button>
						</div>
					)}
				</div>
			</div>

			<div className='w-full bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='flex border-b border-border-main bg-main-bg/40'>
					<button
						type='button'
						onClick={e => {
							e.preventDefault()
							setActiveTab('content')
						}}
						className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
							activeTab === 'content'
								? 'border-primary text-primary bg-card-bg'
								: 'border-transparent text-text-muted hover:text-text-main'
						}`}
					>
						<FileText size={16} />
						Publication Content
					</button>
					<button
						type='button'
						onClick={e => {
							e.preventDefault()
							setActiveTab('author')
						}}
						className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
							activeTab === 'author'
								? 'border-primary text-primary bg-card-bg'
								: 'border-transparent text-text-muted hover:text-text-main'
						}`}
					>
						<User size={16} />
						Author Info
					</button>
				</div>

				<div className='p-6 md:p-8'>
					{activeTab === 'content' ? (
						<div
							className='tiptap-editor-content max-w-none text-text-main text-sm sm:text-base md:text-lg min-w-0 wrap-break-word overflow-x-auto overflow-y-hidden'
							dangerouslySetInnerHTML={{ __html: sanitizedContent }}
						/>
					) : (
						<div className='max-w-3xl'>
							<h3 className='text-xl font-black text-text-main mb-2'>
								About the Author
							</h3>
							<p className='text-text-muted text-sm'>
								Author name:{' '}
								<span className='font-mono bg-main-bg px-1.5 py-0.5 rounded border border-border-main'>
									{authorName}
								</span>
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
