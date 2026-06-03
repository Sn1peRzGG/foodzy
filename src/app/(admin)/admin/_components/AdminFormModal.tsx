'use client'

import { useEffect } from 'react'
import { Loader2, X } from 'lucide-react'
import { createPortal } from 'react-dom'

interface AdminFormModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (e: React.FormEvent) => void
	title: string
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
	isDisabled?: boolean
	children: React.ReactNode
}

export default function AdminFormModal({
	isOpen,
	onClose,
	onSubmit,
	title,
	confirmText = 'Save',
	cancelText = 'Cancel',
	isLoading = false,
	isDisabled = false,
	children,
}: AdminFormModalProps) {
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

	if (!isOpen) return null

	return createPortal(
		<div className='fixed inset-0 z-100 flex items-center justify-center p-4 animate-fade-in'>
			<div
				className='fixed inset-0 bg-gray-950/60 backdrop-blur-md'
				onClick={isLoading ? undefined : onClose}
			/>

			<div className='relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl border border-gray-100 animate-scale-up'>
				<div className='flex items-center justify-between mb-5 pb-3 border-b border-gray-50'>
					<h3 className='text-lg font-bold text-gray-900 tracking-tight'>
						{title}
					</h3>
					<button
						type='button'
						disabled={isLoading}
						onClick={onClose}
						className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50'
					>
						<X size={20} />
					</button>
				</div>

				<form onSubmit={onSubmit} className='space-y-4'>
					<div className='space-y-4 max-h-[60vh] overflow-y-auto pr-1'>
						{children}
					</div>

					<div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-2 pt-4 border-t border-gray-50'>
						<button
							type='button'
							disabled={isLoading}
							onClick={onClose}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50'
						>
							{cancelText}
						</button>

						<button
							type='submit'
							disabled={isLoading || isDisabled}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-50 min-w-22.5 disabled:cursor-not-allowed'
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
