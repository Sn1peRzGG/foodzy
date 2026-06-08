'use client'

import { useReviews } from '@/src/hooks/useReviews'
import { useUser } from '@/src/hooks/useUser'
import { ReviewType } from '@/src/types/review'
import { checkForbiddenWords } from '@/src/utils/moderateText'
import {
	AlertTriangle,
	Edit3,
	Loader2,
	MessageSquare,
	Star,
	Trash2,
} from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import UpdateReviewModal from '../UpdateReviewModal'
import { BASE_URL } from '@/src/lib/api'

interface ProductReviewsProps {
	productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
	const {
		reviews,
		isLoading,
		createReview,
		isCreating,
		updateReview,
		isUpdating,
		deleteReview,
		isDeleting,
	} = useReviews(productId)
	const { data: user } = useUser()

	const [rating, setRating] = useState(5)
	const [text, setText] = useState('')
	const [hoveredRating, setHoveredRating] = useState<number | null>(null)

	const [editingReview, setEditingReview] = useState<ReviewType | null>(null)
	const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null)

	const detectedBadWords = useMemo(() => {
		return checkForbiddenWords(text)
	}, [text])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!text.trim() || detectedBadWords.length > 0) return

		try {
			await createReview({ product: productId, rating, text })
			setText('')
			setRating(5)
		} catch {}
	}

	const handleUpdateConfirm = async (data: {
		rating: number
		text: string
	}) => {
		if (!editingReview) return
		try {
			await updateReview({
				reviewId: editingReview._id,
				dto: data,
			})
			setEditingReview(null)
		} catch {}
	}

	const handleDeleteConfirm = async () => {
		if (!deletingReviewId) return
		try {
			await deleteReview(deletingReviewId)
			setDeletingReviewId(null)
		} catch {}
	}

	return (
		<div className='w-full'>
			<h2 className='text-xl font-black text-text-main mb-6 flex items-center gap-2 border-b border-border-main/50 pb-4'>
				<MessageSquare size={22} />
				Customer Reviews ({reviews.length})
			</h2>

			<div className='grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 items-start w-full'>
				<div className='w-full lg:sticky lg:top-6'>
					<form
						onSubmit={handleSubmit}
						className='p-5 bg-main-bg rounded-xl border border-border-main w-full shadow-inner'
					>
						<h3 className='font-bold text-text-main mb-4 text-sm uppercase tracking-wider flex items-center justify-between'>
							Leave a Review
							<span className='text-xs text-text-muted normal-case font-normal'>
								Your feedback is public
							</span>
						</h3>

						<div
							className='flex items-center gap-1 mb-4 flex-row-reverse justify-end group/rating w-max'
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
										onClick={() => setRating(star)}
										onMouseEnter={() => setHoveredRating(star)}
										className='text-amber-500 transition-transform active:scale-95 hover:scale-110 cursor-pointer group/star'
									>
										<Star
											size={24}
											fill={isLit ? 'currentColor' : 'none'}
											className='transition-colors duration-200'
										/>
									</button>
								)
							})}
						</div>

						<textarea
							value={text}
							onChange={e => setText(e.target.value)}
							placeholder='Share your thoughts about this product...'
							rows={4}
							required
							className={`w-full p-3.5 rounded-lg border bg-card-bg text-text-main text-sm focus:outline-none resize-none mb-3 transition-all ${
								detectedBadWords.length > 0
									? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/20'
									: 'border-border-main focus:border-primary focus:ring-1 focus:ring-primary/20'
							}`}
						/>

						{detectedBadWords.length > 0 && (
							<div className='flex items-start gap-3 text-xs text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-fadeIn max-w-full'>
								<AlertTriangle
									size={16}
									className='mt-0.5 shrink-0 text-red-500'
								/>
								<div className='flex-1 min-w-0'>
									<p className='font-semibold text-red-500'>
										Your review contains forbidden links or words:
									</p>
									<div className='flex flex-wrap gap-1.5 mt-2 max-w-full overflow-hidden'>
										{detectedBadWords.map(word => (
											<span
												key={word}
												className='px-2 py-0.5 bg-red-500/20 text-red-200 rounded font-mono text-[10px] break-all max-w-full whitespace-normal'
											>
												&quot;{word}&quot;
											</span>
										))}
									</div>
									<p className='mt-2 text-text-muted text-[11px] leading-relaxed'>
										Please remove them, otherwise your review will be
										automatically rejected.
									</p>
								</div>
							</div>
						)}

						<button
							type='submit'
							disabled={
								isCreating || !text.trim() || detectedBadWords.length > 0
							}
							className='w-full h-11 bg-primary text-text-main rounded-lg font-bold text-sm transition-all shadow active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover'
						>
							{isCreating ? (
								<Loader2 size={16} className='animate-spin' />
							) : (
								'Submit Review'
							)}
						</button>
					</form>
				</div>

				<div className='w-full'>
					{isLoading ? (
						<div className='flex justify-center py-12'>
							<Loader2 className='animate-spin text-primary' size={36} />
						</div>
					) : reviews.length === 0 ? (
						<p className='text-text-muted text-sm italic text-center py-12 bg-main-bg/30 rounded-xl border border-dashed border-border-main/60'>
							No reviews yet. Be the first to review this product!
						</p>
					) : (
						<div className='space-y-4 max-h-125 overflow-y-auto pr-2 custom-scrollbar'>
							{reviews.map(review => {
								const isOwnReview = user && review.user._id === user._id

								return (
									<div
										key={review._id}
										className='p-4 border border-border-main rounded-xl bg-main-bg/40 hover:bg-main-bg/60 transition-colors group relative'
									>
										<div className='flex items-center justify-between mb-3'>
											<div className='flex items-center gap-2.5'>
												{review.user.avatarUrl ? (
													<div className='relative w-7 h-7 rounded-full overflow-hidden border border-border-main bg-main-bg'>
														<Image
															src={`${BASE_URL}${review.user.avatarUrl}`}
															alt={`${review.user.firstName} avatar`}
															fill
															unoptimized
															className='object-cover pointer-events-none'
														/>
													</div>
												) : (
													<div className='w-7 h-7 rounded-full border border-border-main bg-main-bg flex items-center justify-center text-primary font-bold text-xs uppercase shadow-sm'>
														{(review.user.firstName || 'U')[0]}
													</div>
												)}
												<span className='font-bold text-sm text-text-main tracking-tight'>
													{review.user.firstName} {review.user.lastName}
												</span>
											</div>

											<div className='flex items-center gap-0.5 text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-md border border-amber-500/10'>
												{[1, 2, 3, 4, 5].map(star => (
													<Star
														key={star}
														size={12}
														fill={
															star <= review.rating ? 'currentColor' : 'none'
														}
													/>
												))}
											</div>
										</div>

										<p className='text-text-muted text-sm leading-relaxed pr-16 wrap-break-word whitespace-pre-wrap'>
											{review.text}
										</p>

										<div className='flex items-center justify-between mt-3 pt-2 border-t border-dashed border-border-main/40'>
											<span className='text-[10px] text-text-subtle font-mono'>
												{review.createdAt
													? new Date(review.createdAt).toLocaleDateString(
															'en-US',
															{
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															},
														)
													: '-'}
											</span>

											{isOwnReview && (
												<div className='flex items-center gap-1 opacity-85 group-hover:opacity-100 transition-opacity'>
													<button
														onClick={() => setEditingReview(review)}
														className='p-1.5 rounded-lg text-text-muted hover:bg-main-bg hover:text-primary transition-all cursor-pointer'
														title='Edit Review'
													>
														<Edit3 size={14} />
													</button>
													<button
														onClick={() => setDeletingReviewId(review._id)}
														className='p-1.5 rounded-lg text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer'
														title='Delete Review'
													>
														<Trash2 size={14} />
													</button>
												</div>
											)}
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>

			<UpdateReviewModal
				isOpen={!!editingReview}
				onClose={() => setEditingReview(null)}
				onConfirm={handleUpdateConfirm}
				isLoading={isUpdating}
				initialData={
					editingReview
						? { rating: editingReview.rating, text: editingReview.text }
						: null
				}
			/>

			<ConfirmModal
				isOpen={!!deletingReviewId}
				onClose={() => setDeletingReviewId(null)}
				onConfirm={handleDeleteConfirm}
				isLoading={isDeleting}
				title='Delete Review'
				description='Are you sure you want to delete your review? This action will permanently remove your comment and rating score.'
				confirmText='Delete'
				variant='danger'
			/>
		</div>
	)
}
