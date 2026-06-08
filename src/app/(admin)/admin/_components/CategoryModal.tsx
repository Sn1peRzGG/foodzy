'use client'

import FormModal from '@/src/components/FormModal'
import { FormFileField, FormInput } from '@/src/components/ui/FormFields'
import { BASE_URL } from '@/src/lib/api'
import { CategoryType } from '@/src/types/category'
import { useEffect, useState } from 'react'

interface CategoryModalProps {
	isOpen: boolean
	mode: 'create' | 'update'
	onClose: () => void
	onConfirm: (data: { name: string; imageFile: File | null }) => void
	isLoading?: boolean
	initialData?: CategoryType | null
}

export default function CategoryModal({
	isOpen,
	mode,
	onClose,
	onConfirm,
	isLoading = false,
	initialData,
}: CategoryModalProps) {
	const [name, setName] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [fileError, setFileError] = useState<string | null>(null)

	useEffect(() => {
		if (isOpen) {
			if (mode === 'update' && initialData) {
				setName(initialData.name)
				setImageFile(null)
				setFileError(null)
				setPreviewUrl(
					initialData.imageUrl ? `${BASE_URL}${initialData.imageUrl}` : null,
				)
			} else {
				setName('')
				setImageFile(null)
				setFileError(null)
				setPreviewUrl(null)
			}
		}
	}, [isOpen, mode, initialData])

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

	return (
		<FormModal
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			title={mode === 'create' ? 'Create Category' : 'Update Category'}
			confirmText={mode === 'create' ? 'Create' : 'Save'}
			isLoading={isLoading}
			isDisabled={!name.trim() || !!fileError}
		>
			<FormInput
				label='Category Name'
				type='text'
				required
				disabled={isLoading}
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='e.g. Smartphones'
			/>

			<FormFileField
				label='Category Image (Max 4MB)'
				previewUrl={previewUrl}
				error={fileError}
				disabled={isLoading}
				onChange={handleImageChange}
			/>
		</FormModal>
	)
}
