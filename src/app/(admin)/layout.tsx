'use client'

import { useUser } from '@/src/hooks/useUser'
import { hasAccess } from '@/src/utils/roles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import Sidebar from './admin/_components/Sidebar'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: user, isLoading } = useUser()
	const router = useRouter()
	const [mounted, setMounted] = useState(false)

	const canAccessAdmin = hasAccess(user?.role, 'ADMIN')

	useEffect(() => {
		if (mounted && !isLoading) {
			if (!canAccessAdmin) {
				router.push('/')
			}
		}
	}, [canAccessAdmin, isLoading, mounted, router])

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (isLoading) {
		return <Loading />
	}

	if (!canAccessAdmin) {
		return null
	}

	return (
		<div className='min-h-screen bg-gray-50/50 flex w-full'>
			<Sidebar />

			<div className='flex-1 pl-64 min-h-screen flex flex-col w-full'>
				{children}
			</div>
		</div>
	)
}
