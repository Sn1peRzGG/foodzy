'use client'

import { useUser } from '@/src/hooks/useUser'
import { hasAccess } from '@/src/utils/roles'
import { Settings } from 'lucide-react'
import Link from 'next/link'

export default function ConfigButton() {
	const { data: user } = useUser()

	return (
		<>
			{hasAccess(user?.role, 'ADMIN') && (
				<Link href='/admin' className='order-2 tab-highlight-transparent'>
					<button
						className='group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-main/20'
						aria-label='Admin panel'
					>
						<Settings
							size={24}
							className='transition-transform duration-500 ease-in-out group-hover:rotate-90'
						/>
					</button>
				</Link>
			)}
		</>
	)
}
