'use client'

import { useParams } from 'next/navigation'
import categories from '../../../../data/categories.json'
import { CategoryType } from '@/types/category'

export default function CategoryPage() {
	const params = useParams()
	const category = categories.find(
		(category: CategoryType) => category.id === Number(params.id),
	)

	return <h1>Category Name: {category?.name}</h1>
}
