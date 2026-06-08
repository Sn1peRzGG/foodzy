'use client'

import Loading from '@/src/app/loading'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useAdminProducts } from '@/src/hooks/admin/useAdminProducts'
import { ProductType } from '@/src/types/product'
import {
	CheckCircle,
	Hash,
	Layers,
	Plus,
	Star,
	Tag,
	XCircle,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import DeleteButton from '../_components/DeleteButton'
import EditButton from '../_components/EditButton'
import ProductModal from '../_components/ProductModal'
import { BASE_URL } from '@/src/lib/api'

export default function ProductsAdminPage() {
	const {
		products,
		isLoading,
		isError,
		error,
		deleteProduct,
		isDeleting,
		updateProduct,
		isUpdating,
		createProduct,
		isCreating,
	} = useAdminProducts()

	const [productToDelete, setProductToDelete] = useState<ProductType | null>(
		null,
	)

	const [productModal, setProductModal] = useState<{
		isOpen: boolean
		mode: 'create' | 'update'
		initialData: ProductType | null
	}>({
		isOpen: false,
		mode: 'create',
		initialData: null,
	})

	const openDeleteModal = (product: ProductType) => setProductToDelete(product)
	const closeDeleteModal = () => setProductToDelete(null)

	const handleConfirmDelete = () => {
		if (productToDelete) {
			deleteProduct(productToDelete._id, {
				onSuccess: () => closeDeleteModal(),
			})
		}
	}

	const openCreateModal = () => {
		setProductModal({ isOpen: true, mode: 'create', initialData: null })
	}

	const openUpdateModal = (product: ProductType) => {
		setProductModal({ isOpen: true, mode: 'update', initialData: product })
	}

	const closeProductModal = () => {
		setProductModal(prev => ({ ...prev, isOpen: false, initialData: null }))
	}

	const handleProductSubmit = (formData: {
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
	}) => {
		const data = new FormData()
		data.append('name', formData.name)
		data.append('category', formData.category)
		data.append('price', formData.price.toString())
		data.append('description', formData.description || '')
		data.append('weight', formData.weight || '')
		data.append(
			'isAvailable',
			(formData.isAvailable as boolean) ? 'true' : 'false',
		)

		if (formData.oldPrice !== undefined) {
			data.append('oldPrice', formData.oldPrice.toString())
		}

		if (formData.rating !== undefined) {
			data.append('rating', formData.rating.toString())
		}

		if (formData.calories !== undefined) {
			data.append('calories', formData.calories.toString())
		}

		if (formData.imageFile) {
			data.append('file', formData.imageFile)
		}

		if (productModal.mode === 'create') {
			createProduct(data, {
				onSuccess: () => closeProductModal(),
			})
		} else if (productModal.mode === 'update' && productModal.initialData) {
			updateProduct(
				{ id: productModal.initialData._id, dto: data },
				{
					onSuccess: () => closeProductModal(),
				},
			)
		}
	}

	if (isLoading) return <Loading />
	if (isError) throw error || new Error('Failed to fetch products')

	if (!products || products.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-12 bg-card-bg rounded-2xl border border-border-main shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-main-bg flex items-center justify-center rounded-full mb-2 border border-border-main'>
					<Layers className='w-8 h-8 text-text-subtle' />
				</div>
				<p className='text-text-main font-bold text-lg'>Inventory is empty</p>
				<p className='text-sm text-text-muted text-center'>
					Zero commercial product records match the current database scope.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-main-bg min-h-screen w-full overflow-x-hidden'>
			<div className='bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-text-main tracking-tight'>
						Products Inventory & Catalogue
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Configure commercial items, manage descriptions, and audit your
						digital marketplace metrics.
					</p>
				</div>
				<button
					onClick={openCreateModal}
					className='inline-flex items-center justify-center gap-2 bg-main-bg border border-border-main text-text-main font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:bg-ui-hover active:scale-98 transition-all shrink-0 uppercase tracking-wider cursor-pointer'
				>
					<Plus className='w-4 h-4' />
					Add New Product
				</button>
			</div>

			<div className='bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-main-bg text-text-muted text-xs font-bold uppercase tracking-wider border-b border-border-main'>
								<th className='py-4 px-6'>Item Manifest</th>
								<th className='py-4 px-6'>Description Specification</th>
								<th className='py-4 px-6'>Classification Context</th>
								<th className='py-4 px-6'>Commercial Dynamics</th>
								<th className='py-4 px-6 text-right'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border-main text-sm text-text-muted font-medium transition-colors'>
							{products.map((product: ProductType) => (
								<tr
									key={product._id}
									className='hover:bg-ui-hover transition-colors'
								>
									<td className='py-4 px-6'>
										<div className='flex items-center gap-4'>
											<div className='w-12 h-12 rounded-xl bg-main-bg border border-border-main overflow-hidden shrink-0 relative flex items-center justify-center text-text-subtle font-bold text-xs'>
												{product.imageUrl && (
													<Image
														src={`${BASE_URL}${product.imageUrl}`}
														alt={product.name}
														fill
														unoptimized
														className='object-cover'
													/>
												)}
											</div>
											<div className='space-y-1'>
												<p className='text-base font-bold text-text-main tracking-tight'>
													{product.name}
												</p>
												<div className='flex items-center gap-2'>
													<span className='inline-flex items-center gap-1 text-[11px] text-amber-500 font-bold bg-amber-500/10 dark:bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/20 font-mono shadow-sm'>
														<Star className='w-3 h-3 fill-amber-500 text-amber-500' />
														{product.rating ? product.rating.toFixed(1) : '0.0'}
													</span>
													<div className='flex items-center gap-1.5 bg-main-bg border border-border-main px-2 py-0.5 rounded text-text-muted text-[11px] font-mono w-max'>
														<Hash className='w-3 h-3 shrink-0' />
														<span>
															ID: {product._id.slice(-8).toUpperCase()}
														</span>
													</div>
												</div>
											</div>
										</div>
									</td>

									<td className='py-4 px-6 font-normal text-text-muted max-w-xs truncate text-xs'>
										{product.description}
									</td>

									<td className='py-4 px-6 space-y-2'>
										<div className='flex items-center gap-2 bg-main-bg border border-border-main px-2.5 py-1.5 rounded-lg w-max text-text-muted text-xs font-bold'>
											<Tag className='w-3.5 h-3.5 text-text-subtle shrink-0' />
											<span>{product.category?.name || 'Uncategorized'}</span>
										</div>
										<div className='flex items-center gap-1.5 text-[11px] font-mono text-text-subtle pl-1'>
											<span>{product.weight || 'N/A'}</span>
											{product.calories && (
												<>
													<span className='text-border-main'>•</span>
													<span className='text-text-muted bg-main-bg px-1.5 py-0.5 rounded border border-border-main'>
														{product.calories} kcal
													</span>
												</>
											)}
										</div>
									</td>

									<td className='py-4 px-6 space-y-2'>
										<div className='flex items-baseline gap-1.5'>
											<span className='inline-flex items-center text-base font-black text-text-main font-mono'>
												${product.price.toFixed(2)}
											</span>
											{product.oldPrice && (
												<span className='text-xs text-text-subtle line-through font-mono'>
													${product.oldPrice.toFixed(2)}
												</span>
											)}
										</div>
										<div>
											{product.isAvailable ? (
												<span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm shrink-0 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/15'>
													<CheckCircle className='w-3.5 h-3.5 mr-1.5 shrink-0' />
													In Stock
												</span>
											) : (
												<span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm shrink-0 bg-red-500/10 text-red-500 border-red-500/20 dark:bg-red-500/15'>
													<XCircle className='w-3.5 h-3.5 mr-1.5 shrink-0' />
													Out of stock
												</span>
											)}
										</div>
									</td>

									<td className='py-4 px-6 text-right'>
										<div className='flex items-center justify-end gap-2'>
											<EditButton
												onEdit={() => openUpdateModal(product)}
												data={product}
											/>
											<DeleteButton onDelete={() => openDeleteModal(product)} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<ConfirmModal
				isOpen={productToDelete !== null}
				isLoading={isDeleting}
				onClose={closeDeleteModal}
				onConfirm={handleConfirmDelete}
				title='Delete Product'
				description={`Are you sure you want to delete the product "${productToDelete?.name}"? All associated data will be permanently removed.`}
				confirmText='Delete'
				cancelText='Cancel'
				variant='danger'
			/>

			<ProductModal
				isOpen={productModal.isOpen}
				mode={productModal.mode}
				isLoading={isUpdating || isCreating}
				onClose={closeProductModal}
				onConfirm={handleProductSubmit}
				initialData={productModal.initialData}
			/>
		</div>
	)
}
