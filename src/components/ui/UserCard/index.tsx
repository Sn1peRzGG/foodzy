'use client'

import { ROLE_CONFIG } from '@/constants/roleConfig'
import UserOrders from '@/src/components/ui/UserOrders'
import { useDeleteAccount } from '@/src/hooks/useDeleteAccount'
import { useLogout } from '@/src/hooks/useLogout'
import { useUpdateUser } from '@/src/hooks/useUpdateUser'
import { UserType } from '@/src/types/user'
import {
	Edit2,
	LogOut,
	Mail,
	MapPin,
	Phone,
	ShieldAlert,
	Trash2,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import UpdateModal from '../UpdateModal'

type UserCardProps = {
	user: UserType
}

export default function UserCard({ user }: UserCardProps) {
	const { logout } = useLogout()
	const { mutate: deleteAccount, isPending } = useDeleteAccount()
	const { updateUser, isUpdating } = useUpdateUser()

	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
	const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] =
		useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)

	const fullName =
		`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User Account'

	const currentRole = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
	const RoleIcon = currentRole.icon

	const handleDeleteAccountConfirm = async () => {
		setIsLoggingOut(true)
		try {
			await deleteAccount()
		} catch (error) {
			console.error('Delete account failed:', error)
		} finally {
			setIsLoggingOut(false)
			setShowDeleteAccountConfirm(false)
		}
	}

	const handleLogoutConfirm = async () => {
		setIsLoggingOut(true)
		try {
			await logout()
		} catch (error) {
			console.error('Logout failed:', error)
		} finally {
			setIsLoggingOut(false)
			setShowLogoutConfirm(false)
		}
	}

	const handleUpdateConfirm = (data: {
		firstName: string
		lastName: string
		email: string
		phoneNumber: string
		city: string
		address: string
		imageFile: File | null
	}) => {
		const formData = new FormData()

		formData.append('firstName', data.firstName)
		formData.append('lastName', data.lastName)
		formData.append('email', data.email)
		formData.append('phoneNumber', data.phoneNumber)
		formData.append('city', data.city)
		formData.append('address', data.address)

		if (data.imageFile) {
			formData.append('file', data.imageFile)
		}

		updateUser(
			{ id: user._id, dto: formData },
			{
				onSuccess: () => {
					setShowUpdateModal(false)
				},
			},
		)
	}

	return (
		<div className='container-responsive p-6 max-w-7xl mx-auto animate-fade-in'>
			<div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
				<h1 className='text-3xl font-extrabold tracking-tight text-text-main'>
					Welcome back, {user.firstName || 'Friend'}
				</h1>

				<button
					type='button'
					onClick={() => setShowUpdateModal(true)}
					disabled={isUpdating}
					className='inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl border border-border-main bg-card-bg text-sm font-bold text-text-muted hover:bg-main-bg active:scale-98 transition-all cursor-pointer shadow-md dark:shadow-black/40:self-end disabled:opacity-50'
				>
					<Edit2 size={15} className='text-text-muted' />
					{isUpdating ? 'Saving...' : 'Edit Profile'}
				</button>
			</div>

			<div className='w-full space-y-8'>
				<div className='w-full bg-card-bg border border-border-main/80 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center md:justify-between gap-6 transition-all duration-200 hover:shadow-md'>
					<div className='flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left min-w-0 w-full md:w-auto'>
						<div className='relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-main-bg border border-border-main text-text-muted shadow-md dark:shadow-black/40 pointer-events-none select-none'>
							{user.avatarUrl ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`}
									alt={user.firstName || 'User'}
									fill
									unoptimized
									className='object-cover rounded-xl'
								/>
							) : (
								<span className='text-3xl font-semibold'>
									{(user.firstName || 'U')[0].toUpperCase()}
								</span>
							)}
						</div>

						<div className='min-w-0 space-y-2 text-center sm:text-left'>
							<div className='flex items-center justify-center sm:justify-start gap-2'>
								<p
									className={`text-xl tracking-wide truncate leading-snug ${currentRole.nameColor}`}
								>
									{fullName}
								</p>
								{currentRole.hasBadge && (
									<div className='relative flex items-center justify-center text-sky-500 shrink-0'>
										<ShieldAlert
											size={18}
											className='fill-sky-100 text-sky-600'
										/>
									</div>
								)}
							</div>

							<div className='flex justify-center sm:justify-start'>
								<div
									className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-xs font-bold uppercase tracking-wider select-none transition-all duration-200 ${currentRole.bg}`}
								>
									<RoleIcon size={12} />
									<span>{currentRole.label}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto md:shrink-0 sm:justify-end'>
						<button
							type='button'
							onClick={() => setShowLogoutConfirm(true)}
							disabled={isLoggingOut}
							className='inline-flex items-center justify-center gap-2 px-5 h-11 w-full sm:w-auto rounded-xl border border-border-main bg-card-bg text-sm font-bold text-text-muted hover:bg-main-bg hover:text-text-main active:scale-98 transition-all cursor-pointer shadow-md dark:shadow-black/40'
						>
							<LogOut size={16} className='text-text-muted' />
							Logout
						</button>

						<button
							type='button'
							onClick={() => setShowDeleteAccountConfirm(true)}
							disabled={isPending}
							className='inline-flex items-center justify-center gap-2 px-5 h-11 w-full sm:w-auto rounded-xl bg-red-600 text-sm font-bold text-text-main hover:bg-accent-hover active:scale-98 transition-all cursor-pointer shadow-md dark:shadow-black/40:shadow-lg hover:shadow-lg dark:hover:shadow-black/60:shadow-md dark:shadow-black/40:hover:shadow-lg dark:hover:shadow-black/60'
						>
							<Trash2 size={16} />
							Delete Account
						</button>
					</div>
				</div>

				<div className='space-y-3'>
					<h4 className='text-xs font-bold text-text-subtle uppercase tracking-wider pl-1'>
						Account Details
					</h4>
					<div className='bg-card-bg border border-border-main/80 rounded-xl p-6 shadow-sm'>
						<div className='space-y-3.5 text-sm text-text-muted'>
							<div className='flex items-center gap-3 min-w-0'>
								<Mail size={16} className='text-text-subtle shrink-0' />
								<span className='truncate font-medium'>{user.email}</span>
							</div>

							<div className='flex items-center gap-3 min-w-0 border-t border-border-main pt-3.5'>
								<Phone size={16} className='text-text-subtle shrink-0' />
								<span className='truncate font-medium tabular-nums'>
									{user.phoneNumber || '-'}
								</span>
							</div>

							<div className='flex items-start gap-3 min-w-0 border-t border-border-main pt-3.5'>
								<MapPin
									size={16}
									className='text-text-subtle shrink-0 mt-0.5'
								/>
								<div className='min-w-0 flex items-center gap-1.5'>
									{user.city && (
										<span className='truncate font-medium shrink-0'>
											{user.city},
										</span>
									)}
									<span className='truncate font-medium'>
										{user.address || 'No address provided'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='pt-2'>
					<UserOrders />
				</div>
			</div>

			<ConfirmModal
				isOpen={showLogoutConfirm}
				isLoading={isLoggingOut}
				title='Logout'
				description='Are you sure you want to log out of your profile?'
				confirmText='Logout'
				cancelText='Cancel'
				variant='danger'
				onClose={() => setShowLogoutConfirm(false)}
				onConfirm={handleLogoutConfirm}
			/>

			<ConfirmModal
				isOpen={showDeleteAccountConfirm}
				isLoading={isPending}
				title='Delete Account'
				description='Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.'
				confirmText='Delete Permanently'
				cancelText='Cancel'
				variant='danger'
				onClose={() => setShowDeleteAccountConfirm(false)}
				onConfirm={handleDeleteAccountConfirm}
			/>

			<UpdateModal
				isOpen={showUpdateModal}
				onClose={() => setShowUpdateModal(false)}
				onConfirm={handleUpdateConfirm}
				title='Edit Profile Info'
				confirmText='Save Changes'
				initialData={{
					firstName: user.firstName || '',
					lastName: user.lastName || '',
					email: user.email || '',
					phoneNumber: user.phoneNumber || '',
					city: user.city || undefined,
					address: user.address || undefined,
					imageUrl: user.avatarUrl || undefined,
				}}
			/>
		</div>
	)
}
