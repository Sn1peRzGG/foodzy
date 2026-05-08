import { prisma } from '@/prisma/prisma'
import ProductList from '@/src/components/ProductsList'

export default async function ProductsPage() {
	const products = await prisma.product.findMany()

	return (
		<div className='w-full flex flex-col items-center px-4 py-8'>
			<ProductList initialProducts={products} />
		</div>
	)
}
