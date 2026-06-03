'use client'

import UserCard from '@/src/components/ui/UserCard'
import { useUser } from '@/src/hooks/useUser'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '../../loading'

export default function AccountPage() {
	const { data: user, isLoading } = useUser()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (isLoading) {
		return <Loading />
	}

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
		<div className='container-responsive p-6 max-w-7xl mx-auto'>
			<UserCard user={user} />
		</div>
	)
}
