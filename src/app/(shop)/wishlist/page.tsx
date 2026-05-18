'use client'

import { useUser } from '@/src/hooks/useUser'

export default function WishlistPage() {
	const { data: user } = useUser()

	return (
		<div className='container-responsive'>
			Wishlist:{' '}
			<ul>
				{user?.wishlist?.map(productId => (
					<li key={productId}>Product ID: {productId}</li>
				))}
			</ul>
		</div>
	)
}
