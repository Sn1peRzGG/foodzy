import { getCurrentUser } from '@/src/lib/get-current-user'

export default async function WishlistPage() {
	const user = await getCurrentUser()

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
