'use client'

import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const router = useRouter()

	const handleReset = () => {
		startTransition(() => {
			router.refresh()
			reset()
		})
	}
	return (
		<div className='flex flex-col items-center gap-4 mt-8'>
			<h2>Something went wrong!</h2>
			<p>{error.message}</p>
			<button
				onClick={handleReset}
				className='px-4 py-2 bg-primary text-text-main rounded cursor-pointer'
			>
				Try again
			</button>
		</div>
	)
}
