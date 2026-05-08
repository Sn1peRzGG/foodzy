'use client'

import NavBar from '@/src/components/ui/NavBar'
import SearchBar from '@/src/components/ui/SearchBar'
import { CategoryType } from '@/src/types/category'
import { ProductType } from '@/src/types/product'
import { useState } from 'react'

interface HeaderProps {
	products: ProductType[]
	categories: CategoryType[]
}

export default function Header(props: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className='fixed w-full bg-white h-24 xl:h-36 flex flex-col items-center text-sm font-medium z-100 shadow-sm'>
			<div className='w-full h-0 xl:h-[40%] shrink-0'>
				<NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			</div>

			<div className='w-full h-full xl:h-[60%] shrink-0'>
				<SearchBar
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
					products={props.products}
					categories={props.categories}
				/>
			</div>
		</header>
	)
}
