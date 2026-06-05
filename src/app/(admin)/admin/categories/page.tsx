'use client'

import Loading from '@/src/app/loading'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useAdminCategories } from '@/src/hooks/admin/useAdminCategories'
import { CategoryType } from '@/src/types/category'
import { Folder, Hash, Layers, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import CategoryModal from '../_components/CategoryModal'
import DeleteButton from '../_components/DeleteButton'
import EditButton from '../_components/EditButton'

export default function CategoriesAdminPage() {
	const {
		categories,
		isLoading,
		isError,
		error,
		deleteCategory,
		isDeleting,
		updateCategory,
		isUpdating,
		createCategory,
		isCreating,
	} = useAdminCategories()

	const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
		null,
	)

	const [categoryModal, setCategoryModal] = useState<{
		isOpen: boolean
		mode: 'create' | 'update'
		initialData: CategoryType | null
	}>({
		isOpen: false,
		mode: 'create',
		initialData: null,
	})

	const openDeleteModal = (category: CategoryType) =>
		setCategoryToDelete(category)
	const closeDeleteModal = () => setCategoryToDelete(null)

	const handleConfirmDelete = () => {
		if (categoryToDelete) {
			deleteCategory(categoryToDelete._id, {
				onSuccess: () => closeDeleteModal(),
			})
		}
	}

	const openCreateModal = () => {
		setCategoryModal({ isOpen: true, mode: 'create', initialData: null })
	}

	const openUpdateModal = (category: CategoryType) => {
		setCategoryModal({ isOpen: true, mode: 'update', initialData: category })
	}

	const closeCategoryModal = () => {
		setCategoryModal(prev => ({ ...prev, isOpen: false }))
	}

	const handleCategorySubmit = (formData: {
		name: string
		imageFile: File | null
	}) => {
		const data = new FormData()
		data.append('name', formData.name)
		if (formData.imageFile) {
			data.append('file', formData.imageFile)
		}

		if (categoryModal.mode === 'create') {
			createCategory(data, {
				onSuccess: () => closeCategoryModal(),
			})
		} else if (categoryModal.mode === 'update' && categoryModal.initialData) {
			updateCategory(
				{ id: categoryModal.initialData._id, dto: data },
				{
					onSuccess: () => closeCategoryModal(),
				},
			)
		}
	}

	if (isLoading) return <Loading />
	if (isError) throw error || new Error('Failed to fetch categories')

	if (!categories || categories.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-12 bg-card-bg rounded-2xl border border-border-main shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-main-bg flex items-center justify-center rounded-full mb-2 border border-border-main'>
					<Folder className='w-8 h-8 text-text-subtle' />
				</div>
				<p className='text-text-main font-bold text-lg'>
					No database categories
				</p>
				<p className='text-sm text-text-muted text-center'>
					Zero classification directories match the current query filters.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-main-bg min-h-screen w-full overflow-x-hidden'>
			<div className='bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-text-main tracking-tight'>
						Store Structure & Taxonomies
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Monitor product distributions, group marketplace utilities, and
						manage architectural directories.
					</p>
				</div>
				<button
					onClick={openCreateModal}
					className='inline-flex items-center justify-center gap-2 bg-main-bg border border-border-main text-text-main font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:bg-ui-hover active:scale-98 transition-all shrink-0 uppercase tracking-wider cursor-pointer'
				>
					<Plus className='w-4 h-4' />
					Add Category
				</button>
			</div>

			<div className='bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-main-bg text-text-muted text-xs font-bold uppercase tracking-wider border-b border-border-main'>
								<th className='py-4 px-6'>Category Entity</th>
								<th className='py-4 px-6'>Distribution Metrics</th>
								<th className='py-4 px-6'>Reference Token</th>
								<th className='py-4 px-6 text-right'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border-main text-sm text-text-muted font-medium transition-colors'>
							{categories.map((category: CategoryType) => (
								<tr
									key={category._id}
									className='hover:bg-ui-hover transition-colors'
								>
									<td className='py-4 px-6'>
										<div className='flex items-center gap-4'>
											<div className='w-12 h-12 rounded-xl bg-main-bg border border-border-main overflow-hidden shrink-0 relative flex items-center justify-center text-text-subtle font-bold text-xs'>
												{category.imageUrl ? (
													<Image
														src={`${process.env.NEXT_PUBLIC_API_URL}${category.imageUrl}`}
														alt={category.name}
														fill
														unoptimized
														className='object-cover'
													/>
												) : (
													<span>NO IMG</span>
												)}
											</div>
											<p className='text-base font-bold text-text-main tracking-tight'>
												{category.name}
											</p>
										</div>
									</td>

									<td className='py-4 px-6'>
										<span className='inline-flex items-center gap-1.5 bg-card-dark border border-border-strong px-2.5 py-1.5 rounded-lg text-text-muted shadow-sm text-xs font-semibold'>
											<Layers className='w-3.5 h-3.5 text-text-subtle' />
											{category.count || 0} items
										</span>
									</td>

									<td className='py-4 px-6'>
										<div className='flex items-center gap-1.5 bg-main-bg border border-border-main px-2 py-0.5 rounded text-text-muted text-[11px] font-mono w-max'>
											<Hash className='w-3 h-3 shrink-0' />
											<span>ID: {category._id}</span>
										</div>
									</td>

									<td className='py-4 px-6 text-right'>
										<div className='flex items-center justify-end gap-2'>
											<EditButton
												onEdit={() => openUpdateModal(category)}
												data={category}
											/>
											<DeleteButton
												onDelete={() => openDeleteModal(category)}
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<ConfirmModal
				isOpen={categoryToDelete !== null}
				isLoading={isDeleting}
				onClose={closeDeleteModal}
				onConfirm={handleConfirmDelete}
				title='Delete Category'
				description={`Are you sure you want to delete the category "${categoryToDelete?.name}"? All associated taxonomy links will be permanently removed.`}
				confirmText='Delete'
				cancelText='Cancel'
				variant='danger'
			/>

			<CategoryModal
				isOpen={categoryModal.isOpen}
				mode={categoryModal.mode}
				isLoading={isUpdating || isCreating}
				onClose={closeCategoryModal}
				onConfirm={handleCategorySubmit}
				initialData={categoryModal.initialData}
			/>
		</div>
	)
}
