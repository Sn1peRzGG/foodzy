'use client'

import { useUser } from '@/src/hooks/useUser'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ConfigButton() {
	const { data: user } = useUser()

	return (
		<>
			{user?.role === 'ADMIN' && (
				<Link href={'/admin'} className='fixed right-4 bottom-4 z-20'>
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
