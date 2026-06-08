'use client'

import api from '@/src/lib/api'
import { CategoryType } from '@/src/types/category'
import { PaginatedProducts } from '@/src/types/product'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export type SortOption = 'default' | 'price-asc' | 'price-desc'

export function useProducts() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const searchQuery = searchParams.get('search') || ''
	const searchCategory = searchParams.get('category') || 'All Categories'
	const isAvailableParam = searchParams.get('isAvailable') === 'true'
	const onSaleParam = searchParams.get('onSale') === 'true'

	const minPriceParam = searchParams.get('minPrice') || undefined
	const maxPriceParam = searchParams.get('maxPrice') || undefined

	const minRatingParam = searchParams.get('minRating') || undefined
	const maxRatingParam = searchParams.get('maxRating') || undefined

	const pageParam = searchParams.get('page')
	const page = pageParam ? parseInt(pageParam, 10) || 1 : 1

	const [sortBy, setSortByState] = useState<SortOption>('default')

	const setMultipleParams = (entries: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString())
		let shouldResetPage = false

		Object.entries(entries).forEach(([key, value]) => {
			if (
				value === null ||
				value === '' ||
				value === 'all' ||
				(key === 'page' && value === '1')
			) {
				params.delete(key)
			} else {
				params.set(key, value)
			}

			if (key !== 'page') {
				shouldResetPage = true
			}
		})

		if (shouldResetPage) {
			params.delete('page')
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	const setParam = (key: string, value: string | null) => {
		setMultipleParams({ [key]: value })
	}

	const setCheckboxParam = (key: string, checked: boolean) => {
		setParam(key, checked ? 'true' : null)
	}

	const setPage = (newPageOrFn: number | ((prev: number) => number)) => {
		const targetPage =
			typeof newPageOrFn === 'function' ? newPageOrFn(page) : newPageOrFn
		setParam('page', targetPage.toString())
	}

	const setSortBy = (option: SortOption) => {
		setSortByState(option)
		setParam('page', '1')
	}

	const resetFilters = () => {
		setSortByState('default')

		const newParams = new URLSearchParams()
		if (searchQuery) newParams.set('search', searchQuery)
		if (searchCategory !== 'All Categories')
			newParams.set('category', searchCategory)

		router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
	}

	const { data: categories = [] } = useQuery<CategoryType[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await api.get('/categories')
			return res.data
		},
		staleTime: 1000 * 60 * 10,
	})

	const { data, isLoading, error } = useQuery<PaginatedProducts>({
		queryKey: [
			'products',
			searchQuery,
			searchCategory,
			page,
			isAvailableParam,
			onSaleParam,
			minPriceParam,
			maxPriceParam,
			minRatingParam,
			maxRatingParam,
			sortBy,
		],
		queryFn: async () => {
			const res = await api.get('/products/search', {
				params: {
					name: searchQuery || undefined,
					category:
						searchCategory === 'All Categories' ? undefined : searchCategory,
					page,
					limit: 20,
					isAvailable: isAvailableParam ? 'true' : undefined,
					onSale: onSaleParam ? 'true' : undefined,
					minPrice: minPriceParam,
					maxPrice: maxPriceParam,
					minRating: minRatingParam,
					maxRating: maxRatingParam,
					sortBy,
				},
			})
			return res.data
		},
		placeholderData: previousData => previousData,
	})

	const products = Array.isArray(data?.data) ? data.data : []

	const displayName =
		searchCategory === 'All Categories'
			? 'All Categories'
			: categories.find(cat => cat._id === searchCategory)?.name || 'Category'

	return {
		products,
		meta: data?.meta,
		isLoading,
		error,
		page,
		setPage,
		sortBy,
		setSortBy,
		searchQuery,
		displayName,
		getParam: (key: string) => searchParams.get(key),
		setParam,
		setMultipleParams,
		setCheckboxParam,
		resetFilters,
	}
}
