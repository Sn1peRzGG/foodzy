'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import api from '../lib/api'
import { CategoryType } from '../types/category'
import { ProductType } from '../types/product'
import { useDebounce } from './useDebounce'

interface SearchApiResponse {
	data: ProductType[]
	meta: {
		total: number
		page: number
		limit: number
		pages: number
	}
}

export function useProductSearch() {
	const router = useRouter()
	const searchRef = useRef<HTMLDivElement>(null)

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('all')
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

	const { data: searchData = { products: [], total: 0 } } = useQuery<
		SearchApiResponse,
		Error,
		{ products: ProductType[]; total: number }
	>({
		queryKey: ['search', debouncedQuery, selectedCategory],
		queryFn: async () => {
			const res = await api.get('/products/search', {
				params: {
					name: debouncedQuery || undefined,
					category: selectedCategory === 'all' ? undefined : selectedCategory,
					page: 1,
					limit: 5,
				},
			})
			return res.data
		},
		enabled: !!debouncedQuery.trim(),
		select: response => {
			const products = Array.isArray(response?.data) ? response.data : []
			return {
				products: products.filter(product => product.isAvailable),
				total: response?.meta?.total || 0,
			}
		},
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
		setIsDropdownOpen(false)

		const params = new URLSearchParams()
		params.set('search', query.trim())

		if (selectedCategory !== 'all') {
			params.set('category', selectedCategory)
		}

		params.set('page', '1')

		router.push(`/products?${params.toString()}`)
	}

	return {
		searchRef,
		query,
		setQuery,
		isSearchOpen,
		setIsSearchOpen,
		searchResults: searchData.products,
		totalResults: searchData.total,
		isDropdownOpen,
		setIsDropdownOpen,
		selectedCategory,
		setSelectedCategory,
		categories,
		handleSearchSubmit,
	}
}
