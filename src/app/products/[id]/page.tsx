'use client'

import { useParams } from 'next/navigation'
import products from '@/data/products.json'

export default function ProductPage() {
	const params = useParams()
	const product = products.find(
		product => product.productId === Number(params.id),
	)

	return <h1>Product Name: {product?.name}</h1>
}
