'use client'

import { useUser } from '@/src/hooks/useUser'
import { UserType } from '@/src/types/user'
import { Trash2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Loading from '../../loading'

export default function WishlistPage() {
	const { data: user, isLoading } = useUser() as {
		data: UserType | undefined
		isLoading: boolean
	}

	const handleRemoveFromWishlist = (productId: string) => {
		console.log(`Product ${productId} removed from wishlist`)
	}

	const handleAddToCart = (productId: string) => {
		console.log(`Product ${productId} added to cart from wishlist`)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className='container-responsive p-6'>
			<h1 className='text-2xl font-bold mb-6'>My Wishlist</h1>

			{user?.wishlist && user.wishlist.length > 0 ? (
				<table className='w-full text-[#444444] border-collapse'>
					<thead>
						<tr className='bg-[#E9E9E9] text-[15px] font-semibold'>
							<th className='py-4 pl-4 text-left rounded-tl-[5px]'>Product</th>
							<th className='py-4 text-center'>Price</th>
							<th className='py-4 text-center'>Stock Status</th>
							<th className='py-4 text-center rounded-tr-[5px]'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-[#E9E9E9]'>
						{user.wishlist.map(product => (
							<tr
								key={product._id}
								className='text-[16px] font-normal hover:bg-gray-50/50 transition-colors border-0 bg-[#F7F7F8]'
							>
								<td className='py-4 px-4 flex flex-row items-center'>
									<div className='relative w-15 h-15 border border-[#E9E9E9] rounded-[5px] overflow-hidden bg-white shrink-0'>
										{product.imageUrl && (
											<Image
												src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
												alt={product.name}
												fill
												className='object-contain pointer-events-none p-1'
												unoptimized
											/>
										)}
									</div>
									<div className='flex flex-col ml-5'>
										<span className='font-medium'>{product.name}</span>
										<span className='text-xs text-gray-400 line-clamp-1 max-w-50'>
											{product.description || 'No description'}
										</span>
									</div>
								</td>

								<td className='py-6 text-center tabular-nums font-semibold text-black'>
									${product.price.toFixed(2)}
								</td>

								<td className='py-6 text-center'>
									<span className='text-sm text-green-600 bg-green-50 px-2 py-1 rounded'>
										In Stock
									</span>
								</td>

								<td className='py-6 text-center'>
									<div className='flex items-center justify-center gap-2'>
										<button
											onClick={() => handleAddToCart(product._id)}
											className='p-2 text-gray-600 hover:text-black transition-colors cursor-pointer'
											title='Add to Cart'
										>
											<ShoppingCart size={18} />
										</button>
										<button
											className='p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
											onClick={() => handleRemoveFromWishlist(product._id)}
											title='Remove'
										>
											<Trash2 size={18} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className='border border-dashed border-gray-200 rounded-xl py-20 text-center'>
					<p className='text-gray-500'>Your wishlist is currently empty.</p>
				</div>
			)}
		</div>
	)
}
