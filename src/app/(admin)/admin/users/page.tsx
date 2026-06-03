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
			<div className='flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto mt-20 space-y-3'>
				<div className='w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-2'>
					<Users className='w-8 h-8 text-gray-400' />
				</div>
				<p className='text-gray-900 font-bold text-lg'>No database profiles</p>
				<p className='text-sm text-gray-500 text-center'>
					Zero account records match the current query filters.
				</p>
			</div>
		)
	}

	return (
		<div className='p-6 space-y-6 bg-gray-50/50 min-h-screen w-full overflow-x-hidden'>
			<div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
						Access Operations & Profiles
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Monitor system client attributes, active session metrics, and assign
						privilege levels.
					</p>
				</div>
			</div>

			<div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full text-left border-collapse align-middle whitespace-nowrap'>
						<thead>
							<tr className='bg-gray-50/80 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100'>
								<th className='py-4 px-6'>User Profile</th>
								<th className='py-4 px-6'>Contact Credentials</th>
								<th className='py-4 px-6'>Location Info</th>
								<th className='py-4 px-6'>Activity Metrics</th>
								<th className='py-4 px-6 text-right'>Privilege State</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100 text-sm text-gray-600 font-medium'>
							{users.map((user: UserType) => {
								const roleInfo = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
								const RoleIcon = roleInfo.icon

								const roleBadgeStyles: Record<string, string> = {
									OWNER: 'bg-red-50 text-red-700 border-red-200',
									ADMIN: 'bg-blue-50 text-blue-700 border-blue-200',
									USER: 'bg-slate-50 text-slate-700 border-slate-200',
								}

								const isActionPending = isUpdating || isDeleting

								return (
									<tr
										key={user._id}
										className='hover:bg-gray-50/50 transition-colors'
									>
										<td className='py-4 px-6'>
											<div className='flex items-center gap-4'>
												<div className='w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200 relative flex items-center justify-center text-gray-500 font-bold text-lg'>
													{user.avatarUrl ? (
														<Image
															src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`}
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
													<p className='text-base font-bold text-gray-900'>
														{user.firstName} {user.lastName}
													</p>
													<div className='flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-gray-500 text-[11px] font-mono w-max'>
														<Hash className='w-3 h-3 shrink-0' />
														<span>ID: {user._id}</span>
													</div>
												</div>
											</div>
										</td>

										<td className='py-4 px-6 space-y-2 font-mono text-xs'>
											<div className='flex items-center gap-2 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg w-max text-gray-600'>
												<Mail className='w-3.5 h-3.5 text-gray-400 shrink-0' />
												<span>{user.email || 'No email address'}</span>
											</div>
											<div className='flex items-center gap-2 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg w-max text-gray-600'>
												<Phone className='w-3.5 h-3.5 text-gray-400 shrink-0' />
												<span>{user.phoneNumber || 'No phone number'}</span>
											</div>
										</td>

										<td className='py-4 px-6 font-mono text-xs'>
											<div className='flex items-center gap-2 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg w-max text-gray-600'>
												<MapPin className='w-3.5 h-3.5 text-gray-400 shrink-0' />
												<span className='truncate max-w-50'>
													{user.city || user.address
														? `${user.city || ''}${user.city && user.address ? ', ' : ''}${user.address || ''}`
														: 'No address specified'}
												</span>
											</div>
										</td>

										<td className='py-4 px-6'>
											<div className='flex items-center gap-2'>
												<span className='inline-flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg text-gray-700 shadow-sm text-xs font-semibold'>
													<ShoppingBag className='w-3.5 h-3.5 text-gray-400' />
													Cart:{' '}
													{user.cart?.reduce(
														(acc, item) => acc + item.quantity,
														0,
													) || 0}
												</span>
												<span className='inline-flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg text-gray-700 shadow-sm text-xs font-semibold'>
													<Heart className='w-3.5 h-3.5 text-gray-400' />
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
													<span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg text-xs font-bold shadow-sm'>
														<RoleIcon className='w-3.5 h-3.5 text-gray-400 shrink-0' />
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
