'use client'

import { checkForbiddenWords } from '@/src/utils/moderateText'
import { MessageSquare, Loader2, Star, AlertTriangle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

interface UpdateReviewModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: (data: { rating: number; text: string }) => void
	isLoading?: boolean
	initialData?: {
		rating: number
		text: string
	} | null
}

export default function UpdateReviewModal({
	isOpen,
	onClose,
	onConfirm,
	isLoading = false,
	initialData,
}: UpdateReviewModalProps) {
	const [rating, setRating] = useState(5)
	const [text, setText] = useState('')
	const [hoveredRating, setHoveredRating] = useState<number | null>(null)

	const detectedBadWords = useMemo(() => {
		return checkForbiddenWords(text)
	}, [text])

	useEffect(() => {
		if (isOpen && initialData) {
			setRating(initialData.rating)
			setText(initialData.text)
			setHoveredRating(null)
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

	if (!isOpen) return null

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!text.trim() || detectedBadWords.length > 0) return
		onConfirm({ rating, text })
	}

	return createPortal(
		<div className='fixed inset-0 z-100 flex items-center justify-center p-4 select-none animate-fade-in'>
			<div
				className='fixed inset-0 bg-main-bg/60 backdrop-blur-md'
				onClick={isLoading ? undefined : onClose}
			/>

			<div className='relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-card-bg p-6 text-left align-middle shadow-xl transition-all border border-border-main animate-scale-up'>
				<div className='flex items-center gap-4 mb-5'>
					<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main-bg text-text-muted border border-border-main'>
						<MessageSquare size={20} />
					</div>
					<div className='flex-1 min-w-0'>
						<h3 className='text-lg font-bold text-text-main tracking-tight leading-6'>
							Update Your Review
						</h3>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='flex flex-col gap-1.5'>
						<label className='text-xs font-bold text-text-muted uppercase tracking-wider'>
							Your Rating
						</label>
						<div
							className='flex items-center gap-1 flex-row-reverse justify-end group/rating'
							onMouseLeave={() => setHoveredRating(null)}
						>
							{[5, 4, 3, 2, 1].map(star => {
								const isLit =
									hoveredRating !== null
										? star <= hoveredRating
										: star <= rating
								return (
									<button
										key={star}
										type='button'
										disabled={isLoading}
										onClick={() => setRating(star)}
										onMouseEnter={() => setHoveredRating(star)}
										className='text-amber-500 transition-all hover:scale-110 cursor-pointer disabled:opacity-50'
									>
										<Star
											size={26}
											fill={isLit ? 'currentColor' : 'none'}
											className='transition-colors duration-150'
										/>
									</button>
								)
							})}
						</div>
					</div>

					<div className='flex flex-col gap-1.5'>
						<label className='text-xs font-bold text-text-muted uppercase tracking-wider'>
							Review Comment
						</label>
						<textarea
							value={text}
							onChange={e => setText(e.target.value)}
							disabled={isLoading}
							rows={4}
							required
							className={`w-full p-3 rounded-xl border bg-main-bg text-text-main text-sm focus:outline-none resize-none transition-colors ${
								detectedBadWords.length > 0
									? 'border-red-500 focus:border-red-500'
									: 'border-border-main focus:border-primary'
							}`}
							placeholder='Your updated thoughts...'
						/>
					</div>

					{detectedBadWords.length > 0 && (
						<div className='flex items-start gap-2 text-xs text-red-400 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 animate-fadeIn'>
							<AlertTriangle
								size={14}
								className='mt-0.5 shrink-0 text-red-500'
							/>
							<div>
								<p className='font-semibold text-red-500'>
									Forbidden words detected:
								</p>
								<div className='flex flex-wrap gap-1 mt-1'>
									{detectedBadWords.map(word => (
										<span
											key={word}
											className='px-1.5 py-0.5 bg-red-500/20 text-red-200 rounded font-mono text-[10px]'
										>
											&quot;{word}&quot;
										</span>
									))}
								</div>
							</div>
						</div>
					)}

					<div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-2 pt-4 border-t border-border-main'>
						<button
							type='button'
							disabled={isLoading}
							onClick={onClose}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl border border-border-strong bg-card-bg text-sm font-semibold text-text-muted hover:bg-main-bg transition-all cursor-pointer disabled:opacity-50'
						>
							Cancel
						</button>

						<button
							type='submit'
							disabled={
								isLoading || !text.trim() || detectedBadWords.length > 0
							}
							className='inline-flex justify-center items-center h-10 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-all cursor-pointer disabled:opacity-50 min-w-22.5 shadow-sm'
						>
							{isLoading ? (
								<Loader2 className='animate-spin' size={16} />
							) : (
								'Save Changes'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body,
	)
}
