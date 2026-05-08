import { prisma } from '@/prisma/prisma'
import { notFound } from 'next/navigation'

interface Props {
	params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params

	const product = await prisma.product.findFirst({
		where: {
			productId: Number(id),
		},
	})

	if (!product) {
		notFound()
	}

	return (
		<div>
			<h1>Product Name: {product.name}</h1>
		</div>
	)
}
