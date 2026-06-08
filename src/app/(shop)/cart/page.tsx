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
			<h1 className='text-3xl font-extrabold mb-8 tracking-tight text-text-main'>
				My Cart
			</h1>

			{user?.cart && user.cart.length > 0 ? (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
					<div className='lg:col-span-2 overflow-x-auto rounded-xl border border-border-main shadow-sm'>
						<table className='w-full text-text-muted border-collapse table-fixed min-w-150'>
							<thead>
								<tr className='bg-ui-hover text-[15px] font-semibold text-text-muted'>
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
										className='bg-main-bg hover:bg-main-bg transition-colors'
									>
										<td className='py-5 px-6 flex flex-row items-center overflow-hidden'>
											<div className='relative w-16 h-16 border border-border-main rounded-lg overflow-hidden bg-card-bg shrink-0 shadow-sm'>
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
												className='ml-5 font-semibold text-text-muted truncate hover:text-primary transition-colors'
											>
												{item.product.name}
											</Link>
										</td>

										<td className='py-5 text-center tabular-nums font-medium text-text-main'>
											${item.product.price.toFixed(2)}
										</td>

										<td className='py-5 text-center'>
											<div className='inline-block bg-card-bg rounded-md shadow-sm border border-border-main p-0.5'>
												<CartQuantityInput
													item={item}
													isLoading={
														loadingStates[item.product._id] === 'update'
													}
													onUpdate={updateCartQuantity}
												/>
											</div>
										</td>

										<td className='py-5 text-center tabular-nums font-bold text-text-main'>
											${(item.product.price * item.quantity).toFixed(2)}
										</td>

										<td className='py-5 text-center'>
											<button
												disabled={!!loadingStates[item.product._id]}
												className={`p-2.5 rounded-full transition-all duration-200 ${
													loadingStates[item.product._id] === 'remove'
														? 'text-red-500 bg-red-50 opacity-70 cursor-not-allowed'
														: 'text-text-subtle hover:text-red-600 hover:bg-red-50 cursor-pointer'
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

					<div className='bg-card-bg rounded-xl border border-border-main p-6 shadow-sm sticky top-6'>
						<h2 className='text-xl font-bold text-text-main mb-5 pb-4 border-b border-border-main'>
							Order Summary
						</h2>

						<div className='space-y-4 mb-6'>
							<div className='flex justify-between text-text-muted text-sm'>
								<span>Subtotal</span>
								<span className='font-medium text-text-main'>
									${cartTotal.toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between text-text-muted text-sm'>
								<span>Shipping</span>
								<span className='font-medium text-green-600'>Free</span>
							</div>
							<hr className='border-border-main my-2' />
							<div className='flex justify-between items-baseline'>
								<span className='text-base font-bold text-text-main'>
									Total
								</span>
								<span className='text-2xl font-black text-text-main tracking-tight'>
									${cartTotal.toFixed(2)}
								</span>
							</div>
						</div>

						<Link
							href='/checkout'
							className='w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-text-main font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md dark:shadow-black/40:shadow-lg active:scale-[0.98]'
						>
							Proceed to Checkout
							<ArrowRight size={18} />
						</Link>

						<Link
							href='/products'
							className='w-full mt-3 flex items-center justify-center gap-2 text-sm text-text-muted hover:text-text-muted font-medium py-2 transition-colors'
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			) : (
				<div className='border-2 border-dashed border-border-main rounded-2xl py-24 px-4 text-center max-w-md mx-auto mt-12 bg-main-bg/50'>
					<div className='mx-auto w-16 h-16 bg-ui-hover rounded-full flex items-center justify-center text-text-subtle mb-4 shadow-sm'>
						<ShoppingBag size={28} />
					</div>
					<h3 className='text-lg font-bold text-text-main mb-1'>
						Your cart is empty
					</h3>
					<p className='text-text-muted text-sm mb-6 max-w-xs mx-auto'>
						Looks like you haven&apos;t added anything to your cart yet.
					</p>
					<Link
						href='/products'
						className='inline-flex items-center justify-center bg-main-bg hover:bg-main-bg text-text-main font-medium text-sm py-2.5 px-6 rounded-xl transition-colors shadow-sm'
					>
						Start Shopping
					</Link>
				</div>
			)}
		</div>
	)
}
