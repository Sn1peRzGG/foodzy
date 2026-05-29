'use client'

import Loading from '@/src/app/loading'
import FullProductCard from '@/src/components/ui/FullProductCard'
import api from '@/src/lib/api'
import { ProductType } from '@/src/types/product'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductPage() {
	const params = useParams()
	const [mounted, setMounted] = useState(false)

	const {
		data: product,
		isLoading,
		isError,
	} = useQuery<ProductType>({
		queryKey: ['product', params.id],
		queryFn: async () => {
			const res = await api.get(`/products/${params.id}`)
			return res.data
		},
		enabled: !!params.id,
		retry: false,
	})

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (isLoading) return <Loading />

	if (isError || !product) {
		return <div className='container-responsive'>Product not found</div>
	}

	return (
		<div className='container-responsive'>
			<FullProductCard {...product} />
		</div>
	)
}
