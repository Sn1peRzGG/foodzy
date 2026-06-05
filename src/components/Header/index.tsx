'use client'

import NavBar from '@/src/components/ui/NavBar'
import SearchBar from '@/src/components/ui/SearchBar'
import { useState } from 'react'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className='fixed w-full bg-card-bg h-24 xl:h-36 flex flex-col items-center text-sm font-medium z-50 shadow-sm'>
			<div className='w-full h-0 xl:h-[40%] shrink-0'>
				<NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			</div>

			<div className='w-full h-full xl:h-[60%] shrink-0'>
				<SearchBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			</div>
		</header>
	)
}
