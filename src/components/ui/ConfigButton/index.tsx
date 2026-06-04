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
				<Link href={'/admin'} className='order-1'>
					<button className='group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md transition-colors duration-200'>
						<Settings
							size={28}
							className='transition-transform duration-500 ease-in-out group-hover:rotate-90'
						/>
					</button>
				</Link>
			)}
		</>
	)
}
