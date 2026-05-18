'use client'

import { useUser } from '@/src/hooks/useUser'

export default function CartPage() {
	const { data: user } = useUser()

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
