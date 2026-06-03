'use client'

import { ROLE_CONFIG } from '@/constants/roleConfig'
import UserOrders from '@/src/components/ui/UserOrders'
import { useLogout } from '@/src/hooks/useLogout'
import { UserType } from '@/src/types/user'
import {
	LogOut,
	Mail,
	MapPin,
	Phone,
	ShieldAlert,
	User as UserIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ConfirmModal from '../ConfirmModal'

type UserCardProps = {
	user: UserType
}

export default function UserCard({ user }: UserCardProps) {
	const { logout } = useLogout()

	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)

	const fullName =
		`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User Account'

	const currentRole = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
	const RoleIcon = currentRole.icon

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

	return (
		<div className='container-responsive p-6 max-w-7xl mx-auto animate-fade-in'>
			<div className='mb-8'>
				<h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
					Welcome back, {user.firstName || 'Friend'}
				</h1>
			</div>

			<div className='w-full space-y-8'>
				<div className='w-full bg-white border border-gray-200/80 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-200 hover:shadow-md'>
					<div className='flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left min-w-0 w-full sm:w-auto'>
						<div className='relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-500 shadow-xs overflow-hidden'>
							{user.avatarUrl ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`}
									alt={fullName}
									fill
									className='object-cover pointer-events-none'
									unoptimized
								/>
							) : (
								<UserIcon size={28} />
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
									className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-xs font-bold uppercase tracking-wider select-none transition-all duration-300 ${currentRole.bg}`}
								>
									<RoleIcon size={12} />
									<span>{currentRole.label}</span>
								</div>
							</div>
						</div>
					</div>

					<button
						type='button'
						onClick={() => setShowLogoutConfirm(true)}
						className='inline-flex items-center justify-center gap-2 px-5 h-11 w-full sm:w-auto rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 active:scale-98 transition-all cursor-pointer shadow-xs shrink-0'
					>
						<LogOut size={16} />
						Logout
					</button>
				</div>

				<div className='space-y-3'>
					<h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider pl-1'>
						Account Details
					</h4>
					<div className='bg-white border border-gray-200/80 rounded-xl p-6 shadow-sm'>
						<div className='space-y-3.5 text-sm text-gray-700'>
							<div className='flex items-center gap-3 min-w-0'>
								<Mail size={16} className='text-gray-400 shrink-0' />
								<span className='truncate font-medium'>{user.email}</span>
							</div>

							<div className='flex items-center gap-3 min-w-0 border-t border-gray-100 pt-3.5'>
								<Phone size={16} className='text-gray-400 shrink-0' />
								<span className='truncate font-medium tabular-nums'>
									{user.phoneNumber || '-'}
								</span>
							</div>

							<div className='flex items-start gap-3 min-w-0 border-t border-gray-100 pt-3.5'>
								<MapPin size={16} className='text-gray-400 shrink-0 mt-0.5' />
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
				cancelText='Stay logged in'
				variant='danger'
				onClose={() => setShowLogoutConfirm(false)}
				onConfirm={handleLogoutConfirm}
			/>
		</div>
	)
}
