'use client'

import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CategoryType } from '../types/category'
import { ProductType } from '../types/product'

export function useProductSearch(
	products: ProductType[] = [],
	categories: CategoryType[] = [],
) {
	const router = useRouter()
	const searchRef = useRef<HTMLDivElement>(null)

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('All Categories')
	const [query, setQuery] = useState('')
	const [searchResults, setSearchResults] = useState<ProductType[]>([])
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	const fuseInstance = useMemo(() => {
		const safeProducts = Array.isArray(products) ? products : []

		const filteredByCat =
			selectedCategory === 'All Categories'
				? safeProducts
				: safeProducts.filter(
						p => p?.category?.toLowerCase() === selectedCategory.toLowerCase(),
					)

		return new Fuse(filteredByCat, {
			keys: ['name', 'description'],
			threshold: 0.4,
		})
	}, [selectedCategory, products])

	useEffect(() => {
		if (!fuseInstance) return

		if (!query.trim()) {
			if (searchResults.length !== 0) {
				setSearchResults([])
			}
			return
		}

		const nextResults = fuseInstance.search(query).map(res => res.item)

		const isSame =
			searchResults.length === nextResults.length &&
			searchResults.every(
				(item, idx) => item.productId === nextResults[idx].productId,
			)

		if (!isSame) {
			setSearchResults(nextResults)
		}
	}, [query, fuseInstance, searchResults.length])

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
			`/products?search=${encodeURIComponent(
				query,
			)}&category=${encodeURIComponent(selectedCategory)}`,
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
