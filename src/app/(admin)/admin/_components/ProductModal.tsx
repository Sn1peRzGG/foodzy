'use client'

import api from '@/src/lib/api'
import { CategoryType } from '@/src/types/category'
import { ProductType } from '@/src/types/product'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AdminFileField, AdminTextField } from './AdminFormFields'
import AdminFormModal from './AdminFormModal'
import AdminSelect from './AdminSelect'

interface ProductModalProps {
	isOpen: boolean
	mode: 'create' | 'update'
	onClose: () => void
	onConfirm: (data: {
		name: string
		category: string
		price: number
		oldPrice?: number
		rating?: number
		description?: string
		weight?: string
		calories?: number
		isAvailable?: boolean
		imageFile: File | null
	}) => void
	isLoading?: boolean
	initialData?: ProductType | null
}

export default function ProductModal({
	isOpen,
	mode,
	onClose,
	onConfirm,
	isLoading = false,
	initialData,
}: ProductModalProps) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState<string>('')
	const [oldPrice, setOldPrice] = useState<string>('')
	const [rating, setRating] = useState<string>('')
	const [categoryId, setCategoryId] = useState('')
	const [weight, setWeight] = useState('')
	const [calories, setCalories] = useState<string>('')
	const [isAvailable, setIsAvailable] = useState<boolean>(true)
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [fileError, setFileError] = useState<string | null>(null)

	const { data: categories = [] } = useQuery<CategoryType[]>({
		queryKey: ['admin-categories-list'],
		queryFn: async () => {
			const res = await api.get('/categories')
			return res.data
		},
	})

	const categoryOptions = categories.map(cat => ({
		value: cat._id,
		label: cat.name,
	}))

	useEffect(() => {
		if (!isOpen) return

		setName(initialData?.name || '')
		setDescription(initialData?.description || '')
		setPrice(initialData?.price !== undefined ? String(initialData?.price) : '')
		setOldPrice(
			initialData?.oldPrice !== undefined ? String(initialData?.oldPrice) : '',
		)
		setRating(
			initialData?.rating !== undefined ? String(initialData?.rating) : '',
		)
		setWeight(initialData?.weight || '')
		setCalories(
			initialData?.calories !== undefined ? String(initialData?.calories) : '',
		)
		setIsAvailable(
			initialData?.isAvailable !== undefined ? initialData.isAvailable : true,
		)
		setImageFile(null)
		setFileError(null)
		setPreviewUrl(
			initialData?.imageUrl
				? `${process.env.NEXT_PUBLIC_API_URL}${initialData.imageUrl}`
				: null,
		)

		if (mode === 'update' && initialData?.category) {
			const cat = initialData.category as any
			if (typeof cat === 'object' && cat !== null && cat._id) {
				setCategoryId(String(cat._id))
			} else if (typeof cat === 'string') {
				setCategoryId(cat)
			}
		} else {
			setCategoryId('')
		}
	}, [isOpen, mode, initialData]) // Стежимо за метаморфозами відкриття та вхідних даних

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value
		val = val.replace(',', '.')
		if (val === '') {
			setPrice('')
			return
		}
		if (/^\d*\.?\d*$/.test(val)) {
			setPrice(val)
		}
	}

	const handleOldPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value
		val = val.replace(',', '.')
		if (val === '') {
			setOldPrice('')
			return
		}
		if (/^\d*\.?\d*$/.test(val)) {
			setOldPrice(val)
		}
	}

	const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value
		val = val.replace(',', '.')
		if (val === '') {
			setRating('')
			return
		}
		if (/^\d*\.?\d*$/.test(val)) {
			const num = Number(val)
			if (num <= 5) {
				setRating(val)
			}
		}
	}

	const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		if (val === '') {
			setCalories('')
			return
		}
		if (/^\d+$/.test(val)) {
			setCalories(val)
		}
	}

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

	const parsedRating = Number(rating)
	const isRatingInvalid =
		rating !== '' &&
		(isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const parsedPrice = Number(price)
		if (
			!name.trim() ||
			!categoryId ||
			price === '' ||
			isNaN(parsedPrice) ||
			parsedPrice < 0 ||
			isRatingInvalid ||
			fileError
		)
			return

		onConfirm({
			name,
			category: categoryId,
			price: parsedPrice,
			oldPrice: oldPrice !== '' ? Number(oldPrice) : undefined,
			rating: rating !== '' ? Number(rating) : undefined,
			description: description.trim() !== '' ? description.trim() : undefined,
			weight: weight.trim() !== '' ? weight.trim() : undefined,
			calories: calories !== '' ? Math.floor(Number(calories)) : undefined,
			isAvailable,
			imageFile,
		})
	}

	return (
		<AdminFormModal
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			title={mode === 'create' ? 'Create Product' : 'Update Product'}
			confirmText={mode === 'create' ? 'Create' : 'Save'}
			isLoading={isLoading}
			isDisabled={
				!name.trim() ||
				!categoryId ||
				price === '' ||
				isNaN(Number(price)) ||
				isRatingInvalid ||
				!!fileError
			}
		>
			<AdminTextField
				label='Product Name'
				type='text'
				required
				disabled={isLoading}
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Name'
			/>

			<AdminTextField
				label='Product Description'
				type='text'
				disabled={isLoading}
				value={description}
				onChange={e => setDescription(e.target.value)}
				placeholder='Description'
			/>

			<AdminSelect
				label='Category'
				required
				value={categoryId}
				options={categoryOptions}
				onChange={value => setCategoryId(value)}
				disabled={isLoading}
				placeholder='Choose a category...'
			/>

			<AdminTextField
				label='Product Price'
				type='text'
				inputMode='decimal'
				required
				disabled={isLoading}
				value={price}
				onChange={handlePriceChange}
				placeholder='Price'
			/>

			<AdminTextField
				label='Product Old Price'
				type='text'
				inputMode='decimal'
				disabled={isLoading}
				value={oldPrice}
				onChange={handleOldPriceChange}
				placeholder='Old Price'
			/>

			<AdminTextField
				label='Product Rating (0 - 5)'
				type='text'
				inputMode='decimal'
				disabled={isLoading}
				value={rating}
				onChange={handleRatingChange}
				placeholder='Rating'
			/>

			<AdminTextField
				label='Product Weight'
				type='text'
				disabled={isLoading}
				value={weight}
				onChange={e => setWeight(e.target.value)}
				placeholder='Weight (e.g. 500g, 1kg)'
			/>

			<AdminTextField
				label='Product Calories'
				type='text'
				inputMode='numeric'
				disabled={isLoading}
				value={calories}
				onChange={handleCaloriesChange}
				placeholder='Calories'
			/>

			<div className='ml-2 flex items-center gap-3 py-2'>
				<input
					id='isAvailableCheckbox'
					type='checkbox'
					disabled={isLoading}
					checked={isAvailable}
					onChange={e => setIsAvailable(e.target.checked)}
					className='w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 accent-gray-900 cursor-pointer'
				/>
				<label
					htmlFor='isAvailableCheckbox'
					className='text-sm text-gray-700 font-medium select-none cursor-pointer'
				>
					Product In Stock
				</label>
			</div>

			<AdminFileField
				label='Product Image (Max 4MB)'
				previewUrl={previewUrl}
				fileError={fileError}
				disabled={isLoading}
				onChange={handleImageChange}
			/>
		</AdminFormModal>
	)
}
