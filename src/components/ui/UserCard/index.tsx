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
		<div className='flex flex-col sm:flex-row sm:items-center justify-between mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl gap-6'>
			<div className='flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left'>
				<div className='relative w-24 h-24 bg-gray-50 rounded-full overflow-hidden shrink-0 border border-gray-100'>
					<Image
						src={
							user.avatarUrl
								? `${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`
								: '/default-avatar.jpg'
						}
						alt='Profile Pic'
						fill
						className='object-cover pointer-events-none'
						unoptimized
					/>
				</div>

				<div className='flex flex-col gap-0.5'>
					<h3 className='text-xl font-bold text-black'>{user.email}</h3>
					<p className='text-sm font-semibold text-primary uppercase tracking-wider'>
						{user.firstName} {user.lastName}
					</p>
				</div>
			</div>

			<button
				type='button'
				onClick={logout}
				className='w-full sm:w-auto px-5 h-10 rounded-lg bg-red-50 text-red-500 font-semibold border border-red-200 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-sm shadow-xs'
			>
				Logout
			</button>
		</div>
	)
}
