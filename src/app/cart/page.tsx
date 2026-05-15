import { getCurrentUser } from '@/src/lib/get-current-user'

export default async function CartPage() {
	const user = await getCurrentUser()

	return (
		<div className='container-responsive'>
			Cart:{' '}
			<ul>
				{user?.cart?.map(product => (
					<li key={product.productId}>
						Product ID: {product.productId} - Count: {product.quantity}
					</li>
				))}
			</ul>
		</div>
	)
}
