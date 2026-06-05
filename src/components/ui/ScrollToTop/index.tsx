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
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className='order-3 group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-main/20'
					aria-label='Scroll to top'
				>
					<ArrowBigUp
						size={24}
						className='transition-transform duration-500 ease-in-out group-hover:-translate-y-1'
					/>
				</button>
			)}
		</>
	)
}
