'use client'

import api from '@/src/lib/api'
import { ProductType } from '@/src/types/product'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function ProductPage() {
	const params = useParams()

	const { data: product } = useQuery<ProductType>({
		queryKey: ['product', params.id],
		queryFn: async () => {
			const res = await api.get(`/products/${params.id}`)
			return res.data
		},
		enabled: !!params.id,
	})

	return <h1>Product Name: {product?.name}</h1>
}
