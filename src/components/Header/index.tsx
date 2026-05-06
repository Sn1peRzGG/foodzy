'use client'

import { useState } from 'react'
import NavBar from '../ui/NavBar'
import SearchBar from '../ui/SearchBar'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className='fixed w-full bg-white h-24 xl:h-36 flex flex-col items-center text-sm font-medium z-100 shadow-sm'>
			<NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<SearchBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
		</header>
	)
}
