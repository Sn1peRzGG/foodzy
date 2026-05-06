'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'

export function useProductSearch() {
	const router = useRouter()
	const searchRef = useRef<HTMLDivElement>(null)

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('All Categories')
	const [query, setQuery] = useState('')
	const [searchResults, setSearchResults] = useState<typeof productsData>([])
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	const categories = categoriesData

	const fuseInstance = useMemo(() => {
		const filteredByCat =
			selectedCategory === 'All Categories'
				? productsData
				: productsData.filter(p => p.category === selectedCategory)

		return new Fuse(filteredByCat, {
			keys: ['name', 'description'],
			threshold: 0.4,
		})
	}, [selectedCategory])

	useEffect(() => {
		if (!query.trim()) {
			setSearchResults([])
			return
		}

		setSearchResults(fuseInstance.search(query).map(res => res.item))
	}, [query, fuseInstance])

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsSearchOpen(false)
				setIsDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSearchSubmit = () => {
		if (!query.trim()) return
		setIsSearchOpen(false)
		router.push(
			`/products?search=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`,
		)
	}

	return {
		searchRef,
		query,
		setQuery,
		isSearchOpen,
		setIsSearchOpen,
		searchResults,
		isDropdownOpen,
		setIsDropdownOpen,
		selectedCategory,
		setSelectedCategory,
		categories,
		handleSearchSubmit,
	}
}
