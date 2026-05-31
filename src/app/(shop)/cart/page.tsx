'use client'

import CartQuantityInput from '@/src/components/ui/CartQuantityInput'
import { useUserActions } from '@/src/hooks/useUserActions'
import { ArrowRight, Loader2, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '../../loading'

export default function CartPage() {
	const [mounted, setMounted] = useState(false)
	const { user, isLoading, loadingStates, removeFromCart, updateCartQuantity } =
		useUserActions()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	if (isLoading) return <Loading />

	const cartTotal = user?.cart
		? user.cart.reduce(
				(total, item) => total + item.product.price * item.quantity,
				0,
			)
		: 0

	return (
		<div className='container-responsive p-6 max-w-7xl mx-auto'>
			<h1 className='text-3xl font-extrabold mb-8 tracking-tight text-gray-900'>
				My Cart
			</h1>

			{user?.cart && user.cart.length > 0 ? (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
					<div className='lg:col-span-2 overflow-x-auto rounded-xl border border-gray-100 shadow-sm'>
						<table className='w-full text-[#444444] border-collapse table-fixed min-w-150'>
							<thead>
								<tr className='bg-[#E9E9E9] text-[15px] font-semibold text-gray-700'>
									<th className='py-4 pl-6 text-left rounded-tl-xl w-[40%]'>
										Product
									</th>
									<th className='py-4 text-center w-[15%]'>Price</th>
									<th className='py-4 text-center w-[20%]'>Quantity</th>
									<th className='py-4 text-center w-[15%]'>Total</th>
									<th className='py-4 text-center rounded-tr-xl w-[10%]'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-[#E9E9E9]'>
								{user.cart.map(item => (
									<tr
										key={item.product._id}
										className='bg-[#F7F7F8] hover:bg-gray-50 transition-colors'
									>
										<td className='py-5 px-6 flex flex-row items-center overflow-hidden'>
											<div className='relative w-16 h-16 border border-[#E9E9E9] rounded-lg overflow-hidden bg-white shrink-0 shadow-sm'>
												<Image
													src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}
													alt={item.product.name}
													fill
													className='object-contain p-1 pointer-events-none'
													unoptimized
												/>
											</div>
											<Link
												href={`/products/${item.product._id}`}
												className='ml-5 font-semibold text-gray-800 truncate hover:text-primary transition-colors'
											>
												{item.product.name}
											</Link>
										</td>

										<td className='py-5 text-center tabular-nums font-medium text-gray-900'>
											${item.product.price.toFixed(2)}
										</td>

										<td className='py-5 text-center'>
											<div className='inline-block bg-white rounded-md shadow-sm border border-gray-200 p-0.5'>
												<CartQuantityInput
													item={item}
													isLoading={
														loadingStates[item.product._id] === 'update'
													}
													onUpdate={updateCartQuantity}
												/>
											</div>
										</td>

										<td className='py-5 text-center tabular-nums font-bold text-gray-950'>
											${(item.product.price * item.quantity).toFixed(2)}
										</td>

										<td className='py-5 text-center'>
											<button
												disabled={!!loadingStates[item.product._id]}
												className={`p-2.5 rounded-full transition-all duration-200 ${
													loadingStates[item.product._id] === 'remove'
														? 'text-red-500 bg-red-50 opacity-70 cursor-not-allowed'
														: 'text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer'
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
					</div>

					<div className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6'>
						<h2 className='text-xl font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100'>
							Order Summary
						</h2>

						<div className='space-y-4 mb-6'>
							<div className='flex justify-between text-gray-600 text-sm'>
								<span>Subtotal</span>
								<span className='font-medium text-gray-900'>
									${cartTotal.toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between text-gray-600 text-sm'>
								<span>Shipping</span>
								<span className='font-medium text-green-600'>Free</span>
							</div>
							<hr className='border-gray-100 my-2' />
							<div className='flex justify-between items-baseline'>
								<span className='text-base font-bold text-gray-900'>Total</span>
								<span className='text-2xl font-black text-gray-900 tracking-tight'>
									${cartTotal.toFixed(2)}
								</span>
							</div>
						</div>

						<Link
							href='/checkout'
							className='w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg active:scale-[0.98]'
						>
							Proceed to Checkout
							<ArrowRight size={18} />
						</Link>

						<Link
							href='/products'
							className='w-full mt-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium py-2 transition-colors'
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			) : (
				<div className='border-2 border-dashed border-gray-200 rounded-2xl py-24 px-4 text-center max-w-md mx-auto mt-12 bg-gray-50/50'>
					<div className='mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-sm'>
						<ShoppingBag size={28} />
					</div>
					<h3 className='text-lg font-bold text-gray-900 mb-1'>
						Your cart is empty
					</h3>
					<p className='text-gray-500 text-sm mb-6 max-w-xs mx-auto'>
						Looks like you haven&apos;t added anything to your cart yet.
					</p>
					<Link
						href='/products'
						className='inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm py-2.5 px-6 rounded-xl transition-colors shadow-sm'
					>
						Start Shopping
					</Link>
				</div>
			)}
		</div>
	)
}
