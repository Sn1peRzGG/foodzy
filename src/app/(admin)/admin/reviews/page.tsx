'use client'

import { reviewStatusStyles } from '@/constants/reviewStatusStyles'
import Loading from '@/src/app/loading'
import { useAdminReviews } from '@/src/hooks/admin/useAdminReviews'
import {
	Calendar,
	Hash,
	Mail,
	MessageSquare,
	Package,
	Star,
	User,
} from 'lucide-react'
import { useState } from 'react'
import AdminDropdown from '../_components/AdminDropdown'
import DeleteButton from '../_components/DeleteButton'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { formatDate } from '@/src/utils/formatDate'

export default function ReviewsAdminPage() {
	const {
		reviews,
		isLoading,
		isError,
		error,
		updateStatus,
		isUpdating,
		deleteReview,
		isDeleting,
	} = useAdminReviews()

	const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null)

	const handleStatusChange = async (
		reviewId: string,
		newStatus: 'PENDING' | 'APPROVED' | 'REJECTED',
	) => {
		updateStatus({
			id: reviewId,
			status: newStatus,
		})
	}

	const handleDeleteClick = (reviewId: string) => {
		setDeletingReviewId(reviewId)
	}

	const handleDeleteConfirm = async () => {
		if (!deletingReviewId) return

		deleteReview(deletingReviewId, {
			onSuccess: () => {
				setDeletingReviewId(null)
			},
		})
	}

	if (isLoading) return <Loading />
	if (isError) throw error || new Error('Failed to fetch reviews')

	if (!reviews || reviews.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-12 bg-card-bg rounded-2xl border border-border-main shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-main-bg flex items-center justify-center rounded-full mb-2 border border-border-main'>
					<MessageSquare className='w-8 h-8 text-text-subtle' />
				</div>
				<p className='text-text-main font-bold text-lg'>No reviews found</p>
				<p className='text-sm text-text-muted text-center'>
					The system currently holds zero user-generated feedback items.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-main-bg min-h-screen w-full overflow-x-hidden'>
			<div className='bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-text-main tracking-tight'>
						Product Reviews Moderation
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Approve user feedback, monitor global star distributions, and manage
						public comment visibility lifecycles.
					</p>
				</div>
			</div>

			<div className='bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-main-bg text-text-muted text-xs font-bold uppercase tracking-wider border-b border-border-main'>
								<th className='py-4 px-6'>Review Entity</th>
								<th className='py-4 px-6'>Author Details</th>
								<th className='py-4 px-6'>Target Product</th>
								<th className='py-4 px-6'>Content & Score</th>
								<th className='py-4 px-6 text-right'>Moderation Action</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border-main text-sm text-text-muted font-medium transition-colors'>
							{reviews.map(review => {
								const user = review.user
								const userName =
									`${user.firstName || ''} ${user.lastName || ''}`.trim() ||
									'Anonymous'
								const userEmail = user.email || 'No email'

								return (
									<tr
										key={review._id}
										className='hover:bg-ui-hover transition-colors'
									>
										<td className='py-4 px-6 space-y-2'>
											<div className='font-bold text-text-main text-sm font-sans tracking-tight'>
												#{review._id.slice(0, 8).toUpperCase()}
											</div>
											<div className='flex items-center gap-1.5 bg-main-bg border border-border-main px-2 py-0.5 rounded text-text-muted text-[11px] font-mono w-max'>
												<Hash className='w-3 h-3 shrink-0' />
												<span>RID: {review._id}</span>
											</div>
											<div className='flex items-center gap-1.5 text-text-subtle text-[11px] font-mono pl-0.5'>
												<User className='w-3 h-3 shrink-0' />
												<span>UID: {user._id}</span>
											</div>
										</td>

										<td className='py-4 px-6 space-y-3'>
											<div className='space-y-1'>
												<div className='flex items-center gap-2 text-sm font-bold text-text-main'>
													<div className='w-6 h-6 rounded-full bg-card-dark text-text-muted flex items-center justify-center text-[10px] border border-border-strong shrink-0'>
														{userName.charAt(0).toUpperCase()}
													</div>
													<span>{userName}</span>
												</div>
												<div className='flex items-center gap-1.5 text-xs text-text-muted font-mono pl-8'>
													<Mail className='w-3.5 h-3.5 text-text-subtle' />
													<span>{userEmail}</span>
												</div>
											</div>

											<div className='space-y-2 pl-8 border-l-2 border-border-main ml-3 py-1'>
												<div className='flex items-center gap-2 text-xs font-medium text-text-muted'>
													<Calendar className='w-3.5 h-3.5 text-text-subtle shrink-0' />
													<span>
														<span>{formatDate(review.createdAt)}</span>
													</span>
												</div>
											</div>
										</td>

										<td className='py-4 px-6'>
											<div className='flex flex-col gap-2 py-2 max-h-44 overflow-y-auto pr-2'>
												<div className='flex gap-3 items-center text-xs text-text-muted bg-card-bg p-2 rounded-xl border border-border-main hover:bg-ui-hover transition-colors shadow-sm max-w-xs'>
													<div className='w-10 h-10 rounded-lg bg-main-bg flex items-center justify-center border border-border-main shrink-0 relative'>
														<Package className='w-5 h-5 text-text-subtle' />
													</div>
													<div className='flex-1 min-w-0'>
														<p className='font-bold text-text-main tracking-tight truncate font-mono text-[11px]'>
															ID: {review.product}
														</p>
														<p className='text-[10px] text-text-muted truncate mt-0.5'>
															Linked Marketplace Item
														</p>
													</div>
												</div>
											</div>
										</td>

										<td className='py-4 px-6'>
											<div className='flex flex-col gap-2 py-2 max-h-44 overflow-y-auto pr-2 max-w-sm whitespace-normal'>
												<div className='flex items-center gap-1 bg-main-bg border border-border-main px-2 py-1 rounded-lg w-max shadow-sm shrink-0'>
													{Array.from({ length: 5 }).map((_, i) => (
														<Star
															key={i}
															className={`w-3.5 h-3.5 ${
																i < review.rating
																	? 'text-amber-500 fill-amber-500'
																	: 'text-border-strong'
															}`}
														/>
													))}
													<span className='text-xs font-bold font-mono text-text-main ml-1'>
														{review.rating}.0
													</span>
												</div>
												<p className='text-text-main text-sm font-normal leading-relaxed wrap-break-word italic px-1 bg-main-bg/30 rounded border border-transparent hover:border-border-main p-1.5 transition-colors'>
													&quot;{review.text}&quot;
												</p>
											</div>
										</td>

										<td className='py-4 px-6 text-right'>
											<div className='flex items-center justify-end gap-2'>
												<span
													className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm shrink-0 ${
														reviewStatusStyles[review.status] ||
														'bg-main-bg text-text-muted border-border-main'
													}`}
												>
													<span className='w-1.5 h-1.5 rounded-full bg-current mr-2 shrink-0 animate-pulse' />
													{review.status}
												</span>

												<AdminDropdown
													value={review.status}
													disabled={isUpdating || isDeleting}
													options={[
														{
															value: 'PENDING',
															label: 'PENDING',
															badgeStyle: reviewStatusStyles.PENDING,
														},
														{
															value: 'APPROVED',
															label: 'APPROVED',
															badgeStyle: reviewStatusStyles.APPROVED,
														},
														{
															value: 'REJECTED',
															label: 'REJECTED',
															badgeStyle: reviewStatusStyles.REJECTED,
														},
													]}
													onChange={newValue =>
														handleStatusChange(
															review._id,
															newValue as 'PENDING' | 'APPROVED' | 'REJECTED',
														)
													}
												/>

												<DeleteButton
													onDelete={() => handleDeleteClick(review._id)}
													isLoading={
														isUpdating ||
														(isDeleting && deletingReviewId === review._id)
													}
												/>
											</div>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>

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
