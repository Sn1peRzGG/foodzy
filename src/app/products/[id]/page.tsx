'use client'

import { useParams } from 'next/navigation'
import products from '@/data/products.json'
import { ProductType } from '@/src/types/product'

export default function ProductPage() {
	const params = useParams()
	const product = products.find(
		(product: ProductType) => product.id === Number(params.id),
	)

	return <h1>Product Name: {product?.name}</h1>
}
