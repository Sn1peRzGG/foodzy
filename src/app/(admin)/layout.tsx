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

	const [isCollapsed, setIsCollapsed] = useState(() => {
		if (typeof window !== 'undefined') {
			const saved = sessionStorage.getItem('admin_sidebar_collapsed')
			return saved === 'true'
		}
		return false
	})

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

	useEffect(() => {
		sessionStorage.setItem('admin_sidebar_collapsed', String(isCollapsed))
	}, [isCollapsed])

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
		<div className='min-h-screen bg-main-bg/50 flex w-full'>
			<Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

			<div
				className={`flex-1 min-h-screen flex flex-col w-full transition-all duration-300 ease-in-out ${
					isCollapsed ? 'pl-20' : 'pl-64'
				}`}
			>
				{children}
			</div>
		</div>
	)
}
