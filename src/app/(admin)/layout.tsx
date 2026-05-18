'use client'

import { useUser } from '@/src/hooks/useUser'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import Sidebar from './admin/_components/Sidebar'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: user, isLoading } = useUser()
	const router = useRouter()

	if (isLoading) {
		return <Loading />
	}

	if (!user || user.role !== 'ADMIN') {
		router.push('/login')
	}

	return (
		<>
			<Sidebar />

			<main className='flex-1 overflow-y-auto p-6'>{children}</main>
		</>
	)
}
