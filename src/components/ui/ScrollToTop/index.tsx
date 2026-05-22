'use client'

import { ArrowBigUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility)
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	return (
		<div className='fixed right-4 bottom-4 z-20'>
			{isVisible && (
				<button
					className='group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md transition-colors duration-200'
					onClick={scrollToTop}
				>
					<ArrowBigUp
						size={28}
						className='transition-transform duration-500 ease-in-out group-hover:-translate-y-1'
					/>
				</button>
			)}
		</div>
	)
}
