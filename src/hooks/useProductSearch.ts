'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import api from '../lib/api'
import { CategoryType } from '../types/category'
import { ProductType } from '../types/product'
import { useDebounce } from './useDebounce'

export function useProductSearch() {
	const router = useRouter()
	const searchRef = useRef<HTMLDivElement>(null)

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('All Categories')
	const [query, setQuery] = useState('')
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	const { data: categories = [] } = useQuery<CategoryType[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await api.get('/categories')
			return res.data
		},
		staleTime: 1000 * 60 * 10,
	})

	const debouncedQuery = useDebounce(query, 200)

	const { data: searchResults = [] } = useQuery<ProductType[]>({
		queryKey: ['search', debouncedQuery, selectedCategory],
		queryFn: async () => {
			const res = await api.get('/products/search', {
				params: {
					name: debouncedQuery,
					category:
						selectedCategory === 'All Categories'
							? undefined
							: selectedCategory,
				},
			})
			return res.data
		},
		enabled: !!debouncedQuery.trim(),
	})

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
			`/products?search=${encodeURIComponent(query)}&category=${encodeURIComponent(
				selectedCategory,
			)}`,
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
