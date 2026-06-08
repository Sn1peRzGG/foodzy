'use client'

import { ROLE_CONFIG } from '@/constants/roleConfig'
import Loading from '@/src/app/loading'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { useAdminUsers } from '@/src/hooks/admin/useAdminUsers'
import { useUser } from '@/src/hooks/useUser'
import { UserRole, UserType } from '@/src/types/user'
import {
	Hash,
	Heart,
	Mail,
	MapPin,
	Phone,
	ShoppingBag,
	Users,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import AdminDropdown from '../_components/AdminDropdown'
import DeleteButton from '../_components/DeleteButton'
import { BASE_URL } from '@/src/lib/api'

export default function UsersAdminPage() {
	const {
		users,
		isLoading,
		isError,
		error,
		updateUser,
		deleteUser,
		isUpdating,
		isDeleting,
	} = useAdminUsers()

	const { data: currentUser } = useUser()

	const [userToDelete, setUserToDelete] = useState<UserType | null>(null)

	const isOwner = currentUser?.role === 'OWNER'

	const handleRoleChange = async (userId: string, newRole: UserRole) => {
		updateUser({
			id: userId,
			dto: { role: newRole },
		})
	}

	const openDeleteModal = (user: UserType) => {
		setUserToDelete(user)
	}

	const closeDeleteModal = () => {
		setUserToDelete(null)
	}

	const handleConfirmDelete = () => {
		if (userToDelete) {
			deleteUser(userToDelete._id, {
				onSuccess: () => {
					closeDeleteModal()
				},
			})
		}
	}

	if (isLoading) return <Loading />
	if (isError) throw error || new Error('Failed to fetch users')

	if (!users || users.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center p-12 bg-card-bg rounded-2xl border border-border-main shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-main-bg flex items-center justify-center rounded-full mb-2 border border-border-main'>
					<Users className='w-8 h-8 text-text-subtle' />
				</div>
				<p className='text-text-main font-bold text-lg'>No database profiles</p>
				<p className='text-sm text-text-muted text-center'>
					Zero account records match the current query filters.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-main-bg min-h-screen w-full overflow-x-hidden'>
			<div className='bg-card-bg p-6 rounded-2xl border border-border-main shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-text-main tracking-tight'>
						Access Operations & Profiles
					</h1>
					<p className='text-sm text-text-muted mt-1'>
						Monitor system client attributes, active session metrics, and assign
						privilege levels.
					</p>
				</div>
			</div>

			<div className='bg-card-bg rounded-2xl border border-border-main shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-main-bg text-text-muted text-xs font-bold uppercase tracking-wider border-b border-border-main'>
								<th className='py-4 px-6'>User Profile</th>
								<th className='py-4 px-6'>Contact Credentials</th>
								<th className='py-4 px-6'>Location Info</th>
								<th className='py-4 px-6'>Activity Metrics</th>
								<th className='py-4 px-6 text-right'>Privilege State</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border-main text-sm text-text-muted font-medium transition-colors'>
							{users.map((user: UserType) => {
								const roleInfo = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
								const RoleIcon = roleInfo.icon

								const roleBadgeStyles: Record<string, string> = {
									OWNER:
										'bg-red-500/10 text-red-500 border-red-500/20 dark:bg-red-500/15 dark:border-red-500/30',
									ADMIN:
										'bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/15 dark:border-blue-500/30',
									USER: 'bg-main-bg text-text-muted border-border-main',
								}

								const isActionPending = isUpdating || isDeleting

								return (
									<tr
										key={user._id}
										className='hover:bg-ui-hover transition-colors'
									>
										<td className='py-4 px-6'>
											<div className='flex items-center gap-4'>
												<div className='w-12 h-12 rounded-full bg-card-dark overflow-hidden shrink-0 border border-border-strong relative flex items-center justify-center text-text-muted font-bold text-lg'>
													{user.avatarUrl ? (
														<Image
															src={`${BASE_URL}${user.avatarUrl}`}
															alt={user.firstName || 'User'}
															fill
															unoptimized
															className='object-cover'
														/>
													) : (
														<span>
															{(user.firstName || 'U')[0].toUpperCase()}
														</span>
													)}
												</div>
												<div className='space-y-1'>
													<p className='text-base font-bold text-text-main'>
														{user.firstName} {user.lastName}
													</p>
													<div className='flex items-center gap-1.5 bg-main-bg border border-border-main px-2 py-0.5 rounded text-text-muted text-[11px] font-mono w-max'>
														<Hash className='w-3 h-3 shrink-0' />
														<span>ID: {user._id}</span>
													</div>
												</div>
											</div>
										</td>

										<td className='py-4 px-6 space-y-2 font-mono text-xs'>
											<div className='flex items-center gap-2 bg-main-bg border border-border-main px-2.5 py-1.5 rounded-lg w-max text-text-muted'>
												<Mail className='w-3.5 h-3.5 text-text-subtle shrink-0' />
												<span>{user.email || 'No email address'}</span>
											</div>
											<div className='flex items-center gap-2 bg-main-bg border border-border-main px-2.5 py-1.5 rounded-lg w-max text-text-muted'>
												<Phone className='w-3.5 h-3.5 text-text-subtle shrink-0' />
												<span>{user.phoneNumber || 'No phone number'}</span>
											</div>
										</td>

										<td className='py-4 px-6 font-mono text-xs'>
											<div className='flex items-center gap-2 bg-main-bg border border-border-main px-2.5 py-1.5 rounded-lg w-max text-text-muted'>
												<MapPin className='w-3.5 h-3.5 text-text-subtle shrink-0' />
												<span className='truncate max-w-50'>
													{user.city || user.address
														? `${user.city || ''}${user.city && user.address ? ', ' : ''}${user.address || ''}`
														: 'No address specified'}
												</span>
											</div>
										</td>

										<td className='py-4 px-6'>
											<div className='flex items-center gap-2'>
												<span className='inline-flex items-center gap-1.5 bg-card-dark border border-border-strong px-2.5 py-1.5 rounded-lg text-text-muted shadow-sm text-xs font-semibold'>
													<ShoppingBag className='w-3.5 h-3.5 text-text-subtle' />
													Cart:{' '}
													{user.cart?.reduce(
														(acc, item) => acc + item.quantity,
														0,
													) || 0}
												</span>
												<span className='inline-flex items-center gap-1.5 bg-card-dark border border-border-strong px-2.5 py-1.5 rounded-lg text-text-muted shadow-sm text-xs font-semibold'>
													<Heart className='w-3.5 h-3.5 text-text-subtle' />
													Wish: {user.wishlist?.length || 0}
												</span>
											</div>
										</td>

										<td className='py-4 px-6 text-right'>
											<div className='flex items-center justify-end gap-2'>
												{isOwner && user._id !== currentUser?._id ? (
													<>
														<AdminDropdown
															value={user.role}
															disabled={isActionPending}
															options={[
																{
																	value: 'USER',
																	label: 'Customer',
																	badgeStyle: roleBadgeStyles.USER,
																},
																{
																	value: 'ADMIN',
																	label: 'Administrator',
																	badgeStyle: roleBadgeStyles.ADMIN,
																},
																{
																	value: 'OWNER',
																	label: 'Owner',
																	badgeStyle: roleBadgeStyles.OWNER,
																},
															]}
															onChange={newRole =>
																handleRoleChange(user._id, newRole as UserRole)
															}
														/>

														<DeleteButton
															onDelete={() => openDeleteModal(user)}
															isLoading={isActionPending}
														/>
													</>
												) : (
													<span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-main-bg text-text-muted border border-border-main rounded-lg text-xs font-bold shadow-sm'>
														<RoleIcon className='w-3.5 h-3.5 text-text-subtle shrink-0' />
														{roleInfo.label || user.role}
													</span>
												)}
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
				isOpen={userToDelete !== null}
				isLoading={isDeleting}
				onClose={closeDeleteModal}
				onConfirm={handleConfirmDelete}
				title='Delete User Account'
				description={`Are you sure you want to delete ${userToDelete?.firstName} ${userToDelete?.lastName}? This profile and all matching records will be permanently removed.`}
				confirmText='Delete'
				cancelText='Cancel'
				variant='danger'
			/>
		</div>
	)
}
