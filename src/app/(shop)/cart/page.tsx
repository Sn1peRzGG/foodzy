'use client'

import CartQuantityInput from '@/src/components/ui/CartQuantityInput'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loading from '../../loading'
import Link from 'next/link'
import { useUserActions } from '@/src/hooks/useUserActions'

export default function CartPage() {
	const [mounted, setMounted] = useState(false)
	const { user, isLoading, loadingStates, removeFromCart, updateCartQuantity } =
		useUserActions()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	if (isLoading) return <Loading />

	return (
		<div className='container-responsive p-6'>
			<h1 className='text-2xl font-bold mb-6'>My Cart</h1>

			{user?.cart && user.cart.length > 0 ? (
				<table className='w-full text-[#444444] border-collapse table-fixed'>
					<thead>
						<tr className='bg-[#E9E9E9] text-[15px] font-semibold'>
							<th className='py-4 pl-4 text-left rounded-tl-[5px] w-[40%]'>
								Product
							</th>
							<th className='py-4 text-center w-[15%]'>Price</th>
							<th className='py-4 text-center w-[20%]'>Quantity</th>
							<th className='py-4 text-center w-[15%]'>Total</th>
							<th className='py-4 text-center rounded-tr-[5px] w-[10%]'>
								Action
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-[#E9E9E9]'>
						{user.cart.map(item => (
							<tr key={item.product._id} className='bg-[#F7F7F8]'>
								<td className='py-4 px-4 flex flex-row items-center overflow-hidden'>
									<div className='relative w-15 h-15 border border-[#E9E9E9] rounded-[5px] overflow-hidden bg-white shrink-0'>
										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}
											alt={item.product.name}
											fill
											className='object-contain p-1 pointer-events-none'
											unoptimized
										/>
									</div>
									<Link
										href={`/products/${item.product.productId}`}
										className='ml-5 font-medium truncate hover:text-primary'
									>
										{item.product.name}
									</Link>
								</td>

								<td className='py-6 text-center tabular-nums font-semibold text-black'>
									${item.product.price.toFixed(2)}
								</td>

								<td className='py-6 text-center'>
									<CartQuantityInput
										item={item}
										isLoading={loadingStates[item.product._id] === 'update'}
										onUpdate={updateCartQuantity}
									/>
								</td>

								<td className='py-6 text-center tabular-nums font-semibold text-black'>
									${(item.product.price * item.quantity).toFixed(2)}
								</td>

								<td className='py-6 text-center'>
									<button
										disabled={!!loadingStates[item.product._id]}
										className={`p-2 rounded-full transition-colors ${
											loadingStates[item.product._id] === 'remove'
												? 'text-red-500 bg-red-500/10 opacity-70 cursor-not-allowed'
												: 'text-gray-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer'
										}`}
										onClick={() => removeFromCart(item.product._id)}
									>
										{loadingStates[item.product._id] === 'remove' ? (
											<Loader2 size={18} className='animate-spin' />
										) : (
											<Trash2 size={18} />
										)}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className='border border-dashed border-gray-200 rounded-xl py-20 text-center'>
					<p className='text-gray-500'>Your cart is currently empty.</p>
				</div>
			)}
		</div>
	)
}
