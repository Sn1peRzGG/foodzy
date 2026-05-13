'use client'

import { Settings } from 'lucide-react'
import toast from 'react-hot-toast'

interface ConfigButtonProps {
	role: 'USER' | 'ADMIN'
}

export default function ConfigButton({ role }: ConfigButtonProps) {
	function handleClick() {
		toast.success('Click!')
	}

	return (
		<>
			{role === 'ADMIN' && (
				<button
					className='group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition-colors duration-200 hover:border-gray-400'
					onClick={handleClick}
				>
					<Settings
						size={28}
						className='transition-transform duration-500 ease-in-out group-hover:rotate-90'
					/>
				</button>
			)}
		</>
	)
}
