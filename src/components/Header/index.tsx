'use client'

import { Phone, TextAlignJustify } from 'lucide-react'
import NavBar from '../ui/NavBar'
import SearchBar from '../ui/SearchBar'

export default function Header() {
	return (
		<header className='fixed w-full bg-white h-36 flex flex-col items-center text-sm font-medium z-100'>
			<NavBar />
			<SearchBar />
		</header>
	)
}
