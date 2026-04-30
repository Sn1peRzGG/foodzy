'use client'
import { useParams } from 'next/navigation'

export default function CategoryPage() {
	const params = useParams()
	const id = params.id

	return <h1>Category ID: {id}</h1>
}
