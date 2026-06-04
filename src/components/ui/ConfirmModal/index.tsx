'use client'

import { useEffect } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
import { createPortal } from 'react-dom'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	description?: string
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
	variant?: 'danger' | 'primary'
}

export default function ConfirmModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Are you sure?',
	description = 'This action cannot be undone.',
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	isLoading = false,
	variant = 'danger',
}: ConfirmModalProps) {
	useEffect(() => {
		if (!isOpen) return

		document.body.style.overflow = 'hidden'

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !isLoading) {
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			document.body.style.overflow = 'unset'
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, isLoading, onClose])

	if (!isOpen) return null

	const confirmButtonStyles =
		variant === 'danger'
			? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
			: 'bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-900'

	return createPortal(
		<div className='fixed inset-0 z-100 flex items-center justify-center p-4 select-none animate-fade-in'>
			<div
				className='fixed inset-0 bg-gray-950/60 backdrop-blur-md transition-opacity'
				onClick={isLoading ? undefined : onClose}
			/>

			<div className='relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-gray-100 animate-scale-up'>
				<div className='flex items-center gap-4'>
					{variant === 'danger' && (
						<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100'>
							<AlertTriangle size={20} />
						</div>
					)}

					<div className='flex-1 min-w-0'>
						<h3 className='text-lg font-bold text-gray-900 tracking-tight leading-6'>
							{title}
						</h3>
						<p className='mt-2 text-sm text-gray-500 leading-relaxed'>
							{description}
						</p>
					</div>
				</div>

				<div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-2 pt-4 border-t border-gray-100'>
					<button
						type='button'
						disabled={isLoading}
						onClick={onClose}
						className='inline-flex justify-center items-center h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
					>
						{cancelText}
					</button>

					<button
						type='button'
						disabled={isLoading}
						onClick={onConfirm}
						className={`inline-flex justify-center items-center h-10 px-4 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none min-w-22.5 shadow-sm ${confirmButtonStyles}`}
					>
						{isLoading ? (
							<Loader2 className='animate-spin' size={16} />
						) : (
							confirmText
						)}
					</button>
				</div>
			</div>
		</div>,
		document.body,
	)
}
