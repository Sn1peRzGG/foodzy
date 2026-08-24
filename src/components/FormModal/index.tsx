'use client'

import { Loader2, X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface FormModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (e: React.FormEvent) => void
	title: string
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
	isDisabled?: boolean
	children: React.ReactNode
	className?: string
}

export default function FormModal({
	isOpen,
	onClose,
	onSubmit,
	title,
	confirmText = 'Save',
	cancelText = 'Cancel',
	isLoading = false,
	isDisabled = false,
	children,
	className,
}: FormModalProps) {
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
				className='fixed inset-0 bg-black/40 dark:bg-main-bg/60 backdrop-blur-md'
				onClick={isLoading ? undefined : onClose}
			/>

			<div
				className={`relative z-10 w-full transform overflow-hidden rounded-2xl bg-card-bg p-6 text-left align-middle shadow-xl border border-border-main/80 animate-scale-up ${className || 'max-w-md'}`}
			>
				<div className='flex items-center justify-between mb-5 pb-3 border-b border-border-main/60'>
					<h3 className='text-lg font-bold text-text-main tracking-tight'>
						{title}
					</h3>
					<button
						type='button'
						disabled={isLoading}
						onClick={onClose}
						className='text-text-subtle hover:text-text-main p-1 rounded-lg hover:bg-main-bg/50 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'
					>
						<X size={20} />
					</button>
				</div>

				<form onSubmit={onSubmit} className='space-y-4'>
					<div className='space-y-4 max-h-[60vh] overflow-y-auto p-1 pr-1.5 scrollbar-thin scrollbar-thumb-border-main scrollbar-track-transparent'>
						{children}
					</div>

					<div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-2 pt-4 border-t border-border-main/60'>
						<button
							type='button'
							disabled={isLoading}
							onClick={onClose}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl border border-border-main bg-main-bg/30 text-sm font-semibold text-text-muted hover:bg-main-bg hover:text-text-main active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{cancelText}
						</button>

						<button
							type='submit'
							disabled={isLoading || isDisabled}
							className='inline-flex justify-center items-center h-10 px-5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover disabled:bg-border-main/40 disabled:text-text-subtle active:scale-98 transition-all cursor-pointer min-w-24 disabled:cursor-not-allowed shadow-md shadow-primary/10 disabled:shadow-none'
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
