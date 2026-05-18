'use client'

import ConfigButton from '@/src/components/ui/ConfigButton'
import UserCard from '@/src/components/ui/UserCard'
import { useUser } from '@/src/hooks/useUser'
import Link from 'next/link'

export default function AccountPage() {
	const { data: user } = useUser()

	if (!user) {
		return (
			<div className='flex min-h-[50vh] flex-col items-center justify-center gap-4'>
				<h2 className='text-2xl font-bold'>You are not authorized</h2>
				<p className='text-gray-500'>Please sign in to access your account</p>

				<div className='flex flex-row gap-4'>
					<Link
						href={'/login'}
						className='bg-primary text-white text-[18px] rounded-[5px] px-4 py-2 hover:bg-primary-hover transition-all duration-200'
					>
						Login
					</Link>
					<Link
						href={'/signup'}
						className='bg-primary text-white text-[18px] rounded-[5px] px-4 py-2 hover:bg-primary-hover transition-all duration-200'
					>
						Signup
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='container-responsive'>
			<div className='flex flex-col gap-2 md:gap-3 lg:gap-5'>
				<h2 className='text-sm font-bold uppercase tracking-[0.175em] text-accent sm:text-base md:text-lg lg:text-[20px]'>
					User Profile
				</h2>

				<p className='text-xl font-bold leading-[1.315] sm:text-2xl md:text-3xl lg:text-5xl'>
					Welcome back, {user.firstName}
				</p>
			</div>

			<UserCard user={user} />
		</div>
	)
}
