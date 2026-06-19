'use client'

import Loading from '@/src/app/loading'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { SubscriberType } from '@/src/types/subscriber'
import { Hash, Mail, Calendar } from 'lucide-react'
import { useState } from 'react'
import DeleteButton from '../_components/DeleteButton'
import { useAdminSubscribers } from '@/src/hooks/admin/useAdminSubscribers'

export default function SubscribersAdminPage() {
	const {
		subscribers,
		isLoading,
		isError,
		error,
		deleteSubscriber,
		isDeleting,
	} = useAdminSubscribers()

	const [subToDelete, setSubToDelete] = useState<SubscriberType | null>(null)

	const openDeleteModal = (sub: SubscriberType) => {
		setSubToDelete(sub)
	}

	const closeDeleteModal = () => {
		setSubToDelete(null)
	}

	const handleConfirmDelete = () => {
		if (subToDelete) {
			deleteSubscriber(subToDelete._id, {
				onSuccess: () => {
					closeDeleteModal()
				},
			})
		}
	}

	if (isLoading) return <Loading />
	if (isError) throw error || new Error('Failed to fetch subscribers')

	if (!subscribers || subscribers.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-12 bg-card-bg rounded-2xl border border-border-main shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-main-bg flex items-center justify-center rounded-full mb-2 border border-border-main'>
					<Mail className='w-8 h-8 text-text-subtle' />
				</div>
				<p className='text-text-main font-bold text-lg'>No subscribers yet</p>
				<p className='text-sm text-text-muted text-center'>
					The audience backend list is currently empty. Cold-marketing hooks
					will appear here.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-main-bg min-h-screen w-full overflow-x-hidden'>
			<div className='bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-text-main tracking-tight'>
						Newsletter Subscribers
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Manage cold marketing communication lists, analyze registration
						timestamps, and prune records.
					</p>
				</div>
			</div>

			<div className='bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-main-bg text-text-muted text-xs font-bold uppercase tracking-wider border-b border-border-main'>
								<th className='py-4 px-6'>Subscriber Credentials</th>
								<th className='py-4 px-6'>Database Registry ID</th>
								<th className='py-4 px-6'>Subscription Date</th>
								<th className='py-4 px-6 text-right'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border-main text-sm text-text-muted font-medium transition-colors'>
							{subscribers.map((sub: SubscriberType) => {
								return (
									<tr
										key={sub._id}
										className='hover:bg-ui-hover transition-colors'
									>
										<td className='py-4 px-6'>
											<div className='flex items-center gap-3'>
												<div className='w-10 h-10 rounded-xl bg-primary/8 text-primary border border-primary/15 flex items-center justify-center shrink-0'>
													<Mail size={18} />
												</div>
												<span className='text-xs font-semibold text-text-main font-mono'>
													{sub.email}
												</span>
											</div>
										</td>

										<td className='py-4 px-6 font-mono text-xs'>
											<div className='flex items-center gap-1.5 bg-main-bg border border-border-main px-2 py-1 rounded text-text-muted w-max'>
												<Hash className='w-3 h-3 shrink-0' />
												<span>ID: {sub._id}</span>
											</div>
										</td>

										<td className='py-4 px-6 font-mono text-xs'>
											<div className='flex items-center gap-2 bg-main-bg border border-border-main px-2.5 py-1.5 rounded-lg w-max text-text-muted'>
												<Calendar className='w-3.5 h-3.5 text-text-subtle shrink-0' />
												<span>
													{sub.createdAt
														? new Date(sub.createdAt).toLocaleDateString(
																'uk-UA',
																{
																	day: '2-digit',
																	month: '2-digit',
																	year: 'numeric',
																	hour: '2-digit',
																	minute: '2-digit',
																},
															)
														: 'No timestamp metadata'}
												</span>
											</div>
										</td>

										<td className='py-4 px-6 text-right'>
											<div className='flex items-center justify-end gap-2'>
												<DeleteButton
													onDelete={() => openDeleteModal(sub)}
													isLoading={isDeleting}
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
				isOpen={subToDelete !== null}
				isLoading={isDeleting}
				onClose={closeDeleteModal}
				onConfirm={handleConfirmDelete}
				title='Remove Subscriber Record'
				description={`Are you sure you want to delete ${subToDelete?.email} from your marketing base? This operation cannot be undone.`}
				confirmText='Delete'
				cancelText='Cancel'
				variant='danger'
			/>
		</div>
	)
}
