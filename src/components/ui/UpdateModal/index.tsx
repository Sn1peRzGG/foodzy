'use client'

import { AlertCircle, Folder, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface UpdateModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: (data: { name: string; imageFile: File | null }) => void
	title?: string
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
	initialData?: {
		name: string
		imageUrl?: string
	} | null
}

export default function UpdateModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Update Profile',
	confirmText = 'Save',
	cancelText = 'Cancel',
	isLoading = false,
	initialData,
}: UpdateModalProps) {
	const [name, setName] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [fileError, setFileError] = useState<string | null>(null)

	useEffect(() => {
		if (isOpen && initialData) {
			setName(initialData.name)
			setImageFile(null)
			setFileError(null)
			setPreviewUrl(
				initialData.imageUrl
					? `${process.env.NEXT_PUBLIC_API_URL}${initialData.imageUrl}`
					: null,
			)
		}
	}, [isOpen, initialData])

	useEffect(() => {
		if (!isOpen) return
		document.body.style.overflow = 'hidden'
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !isLoading) onClose()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			document.body.style.overflow = 'unset'
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, isLoading, onClose])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		setFileError(null)

		if (!file) return

		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
		if (!allowedTypes.includes(file.type)) {
			setFileError('Only JPG, PNG and WEBP images are allowed')
			return
		}

		const maxSize = 4 * 1024 * 1024
		if (file.size > maxSize) {
			setFileError('Image size must be less than 4MB')
			return
		}

		setImageFile(file)
		setPreviewUrl(URL.createObjectURL(file))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim() || fileError) return
		onConfirm({ name, imageFile })
	}

	if (!isOpen) return null

	return createPortal(
		<div className='fixed inset-0 z-100 flex items-center justify-center p-4 animate-fade-in'>
			<div
				className='fixed inset-0 bg-gray-950/60 backdrop-blur-md'
				onClick={isLoading ? undefined : onClose}
			/>

			<div className='relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl border border-gray-100 animate-scale-up'>
				<div className='flex items-start gap-4 mb-4'>
					<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-600 border border-gray-100'>
						<Folder size={20} />
					</div>
					<div className='flex-1 min-w-0'>
						<h3 className='text-lg font-bold text-gray-900 tracking-tight'>
							{title}
						</h3>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-1.5'>
						<label className='text-xs font-bold uppercase tracking-wider text-gray-500'>
							First Name
						</label>
						<input
							type='text'
							required
							disabled={isLoading}
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='e.g. Smartphones'
							className='w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 bg-white focus:outline-hidden focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all disabled:opacity-50'
						/>
					</div>

					<div className='space-y-1.5'>
						<label className='text-xs font-bold uppercase tracking-wider text-gray-500'>
							Profile Image (Max 4MB)
						</label>

						<div
							className={`flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-dashed transition-colors ${fileError ? 'border-red-300 bg-red-50/10' : 'border-gray-200'}`}
						>
							<div className='w-16 h-16 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0 relative flex items-center justify-center text-gray-400 font-bold text-xs shadow-xs'>
								{previewUrl ? (
									<Image
										src={previewUrl}
										alt='Preview'
										fill
										unoptimized
										className='object-cover'
									/>
								) : (
									<ImageIcon size={20} className='text-gray-300' />
								)}
							</div>

							<label className='inline-flex items-center justify-center h-9 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50'>
								<span>Choose Image</span>
								<input
									type='file'
									accept='image/jpeg, image/png, image/webp'
									disabled={isLoading}
									onChange={handleImageChange}
									className='hidden'
								/>
							</label>
						</div>

						{fileError && (
							<div className='flex items-center gap-1.5 text-red-600 text-xs font-semibold mt-1'>
								<AlertCircle size={14} />
								<span>{fileError}</span>
							</div>
						)}
					</div>

					<div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-2 pt-2 border-t border-gray-50'>
						<button
							type='button'
							disabled={isLoading}
							onClick={onClose}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-hidden transition-all cursor-pointer disabled:opacity-50'
						>
							{cancelText}
						</button>

						<button
							type='submit'
							disabled={isLoading || !name.trim() || !!fileError}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-50 min-w-22.5'
						>
							{isLoading ? (
								<Loader2 className='animate-spin' size={16} />
							) : (
								confirmText
							)}
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body,
	)
}
