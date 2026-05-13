'use client'

import { useLogout } from '@/src/hooks/useLogout'
import { UserType } from '@/src/types/user'
import Image from 'next/image'

type UserCardProps = {
	user: UserType
}

export default function UserCard({ user }: UserCardProps) {
	const { logout } = useLogout()

	return (
		<div>
			<div className='mt-8 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl'>
				<div className='flex items-center gap-6'>
					<div className='relative w-24 h-24'>
						<Image
							src={user.avatarUrl || '/default-avatar.png'}
							alt='Profile Pic'
							fill
							className='rounded-full object-cover'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='text-gray-400 text-sm'>User ID: #{user.userId}</p>
						<p className='text-xl font-semibold'>{user.email}</p>
						<p className='text-lg text-gray-600'>
							{user.firstName} {user.lastName}
						</p>
					</div>
				</div>

				<button
					onClick={logout}
					className='px-5 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors cursor-pointer'
				>
					Logout
				</button>
			</div>
		</div>
	)
}
