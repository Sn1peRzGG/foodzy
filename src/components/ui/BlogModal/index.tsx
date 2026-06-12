'use client'

import { BlogType } from '@/src/types/blog'
import React, { useEffect, useState } from 'react'
import FormModal from '../../FormModal'
import TiptapEditor from '../TiptapEditor'
import { FormFileField, FormInput } from '../FormFields'
import { BASE_URL } from '@/src/lib/api'

interface BlogModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (payload: {
		title: string
		content: string
		banner?: File
		removeBanner?: boolean
	}) => Promise<void>
	blog?: BlogType
	isLoading?: boolean
}

export default function BlogModal({
	isOpen,
	onClose,
	onSubmit,
	blog,
	isLoading = false,
}: BlogModalProps) {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [bannerFile, setBannerFile] = useState<File | null>(null)
	const [bannerPreview, setBannerPreview] = useState<string | null>(null)
	const [removeBanner, setRemoveBanner] = useState(false)
	const [fileError, setFileError] = useState<string | null>(null)

	useEffect(() => {
		if (isOpen) {
			setTitle(blog?.title || '')
			setContent(blog?.content || '')
			setBannerFile(null)
			setRemoveBanner(false)
			setFileError(null)
			if (blog?.banner) {
				setBannerPreview(`${BASE_URL}${blog.banner}`)
			} else {
				setBannerPreview(null)
			}
		}
	}, [blog, isOpen])

	const handleFileChange = (file: File) => {
		setBannerFile(file)
		setRemoveBanner(false)

		const reader = new FileReader()
		reader.onloadend = () => {
			setBannerPreview(reader.result as string)
		}
		reader.readAsDataURL(file)
	}

	const handleRemoveBanner = () => {
		setBannerFile(null)
		setBannerPreview(null)
		setRemoveBanner(true)
		setFileError(null)
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim() || !content.trim() || !!fileError) return

		try {
			await onSubmit({
				title,
				content,
				banner: bannerFile || undefined,
				removeBanner,
			})
			onClose()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<FormModal
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleFormSubmit}
			title={blog ? 'Edit Blog Post' : 'Create New Blog Post'}
			confirmText={blog ? 'Save Changes' : 'Publish Post'}
			cancelText='Cancel'
			isLoading={isLoading}
			isDisabled={!title.trim() || !content.trim() || !!fileError}
			className='max-w-3xl w-full'
		>
			<FormInput
				label='Blog Title'
				type='text'
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder='Enter post title...'
				required
				disabled={isLoading}
			/>

			<FormFileField
				label='Cover Banner (21:9 aspect ratio)'
				previewUrl={bannerPreview}
				error={fileError}
				disabled={isLoading}
				onChange={handleFileChange}
				onError={setFileError}
				onRemove={handleRemoveBanner}
			/>

			<div className='flex flex-col gap-1.5 text-left'>
				<TiptapEditor label='Content' value={content} onChange={setContent} />
			</div>
		</FormModal>
	)
}
