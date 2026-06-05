'use client'

import { useUserActions } from '@/src/hooks/useUserActions'
import { ArrowLeft, CreditCard, Loader2, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Loading from '../../loading'

export default function CheckoutPage() {
	const [mounted, setMounted] = useState(false)
	const router = useRouter()

	const { user, isLoading, createOrder, loadingStates } = useUserActions()

	const [city, setCity] = useState('')
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const isCheckingOut = loadingStates['checkout_process'] === 'checkout'

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (user) {
			setCity(user.city || '')
			setAddress(user.address || '')
			setPhoneNumber(user.phoneNumber || '')
		}
	}, [user])

	if (!mounted) return null
	if (isLoading) return <Loading />

	const hasItems = user?.cart && user.cart.length > 0

	const cartTotal = user?.cart
		? user.cart.reduce(
				(total, item) => total + item.product.price * item.quantity,
				0,
			)
		: 0

	const checkout = async () => {
		if (!city.trim() || !address.trim() || !phoneNumber.trim()) {
			return toast.error('Please fill in all fields')
		}

		try {
			await createOrder({ city, address, phoneNumber })

			router.push('/')
		} catch (error) {
			console.error('Error placing order:', error)
		}
	}

	return (
		<div className='container-responsive p-6 max-w-7xl mx-auto'>
			<div className='mb-6'>
				<Link
					href='/cart'
					className='inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-muted transition-colors'
				>
					<ArrowLeft size={16} />
					Back to Cart
				</Link>
			</div>

			<h1 className='text-3xl font-extrabold mb-8 tracking-tight text-text-main'>
				Checkout
			</h1>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
				<div className='lg:col-span-2 space-y-6'>
					<div className='bg-card-bg rounded-xl border border-border-main p-6 shadow-sm'>
						<h2 className='text-xl font-bold text-text-main mb-5 pb-4 border-b border-border-main flex items-center gap-2'>
							Shipping Details
						</h2>

						<form className='space-y-4' onSubmit={e => e.preventDefault()}>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-text-muted mb-1.5'>
										City
									</label>
									<input
										type='text'
										disabled={isCheckingOut}
										value={city}
										onChange={e => setCity(e.target.value)}
										placeholder='e.g. Kyiv'
										className='w-full px-4 py-2.5 bg-main-bg border border-border-main rounded-xl focus:outline-none focus:border-primary focus:bg-card-bg transition-all text-sm disabled:opacity-60'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-text-muted mb-1.5'>
										Phone Number
									</label>
									<input
										type='tel'
										disabled={isCheckingOut}
										value={phoneNumber}
										onChange={e => setPhoneNumber(e.target.value)}
										placeholder='e.g. +380501234567'
										className='w-full px-4 py-2.5 bg-main-bg border border-border-main rounded-xl focus:outline-none focus:border-primary focus:bg-card-bg transition-all text-sm disabled:opacity-60'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-text-muted mb-1.5'>
									Address
								</label>
								<input
									type='text'
									disabled={isCheckingOut}
									value={address}
									onChange={e => setAddress(e.target.value)}
									placeholder='e.g. Khreshchatyk St, 15, app. 4'
									className='w-full px-4 py-2.5 bg-main-bg border border-border-main rounded-xl focus:outline-none focus:border-primary focus:bg-card-bg transition-all text-sm disabled:opacity-60'
								/>
							</div>
						</form>
					</div>

					<div className='bg-card-bg rounded-xl border border-border-main p-6 shadow-sm'>
						<h2 className='text-xl font-bold text-text-main mb-5 pb-4 border-b border-border-main flex items-center gap-2'>
							Payment Method
						</h2>
						<div className='border-2 border-primary bg-primary/5 rounded-xl p-4 flex items-center gap-4'>
							<div className='p-2.5 bg-primary rounded-lg text-text-main shrink-0 shadow-sm'>
								<CreditCard size={20} />
							</div>
							<div>
								<p className='text-sm font-bold text-text-main'>
									Cash on Delivery
								</p>
								<p className='text-xs text-text-muted'>
									Pay with cash upon receiving your order.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='space-y-4 sticky top-6'>
					<div className='bg-card-bg rounded-xl border border-border-main p-6 shadow-sm'>
						<h2 className='text-xl font-bold text-text-main mb-5 pb-4 border-b border-border-main'>
							Your Order
						</h2>

						<div className='max-h-64 overflow-y-auto pr-2 mb-6 space-y-4 custom-scrollbar'>
							{user?.cart?.map((item, index) => (
								<div
									key={item.product._id}
									className={`flex items-center justify-between gap-4 pb-4 ${
										index !== user.cart.length - 1
											? 'border-b border-border-main'
											: ''
									}`}
								>
									<div className='flex items-center gap-4 min-w-0 flex-1'>
										<div className='relative w-12 h-12 border border-border-main rounded-lg overflow-hidden bg-card-bg shrink-0 shadow-sm'>
											<Image
												src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}
												alt={item.product.name}
												fill
												className='object-contain p-1 pointer-events-none'
												unoptimized
											/>
										</div>
										<div className='min-w-0 flex-1'>
											<p className='text-sm font-semibold text-text-muted truncate leading-tight mb-1'>
												{item.product.name}
											</p>
											<p className='text-xs text-text-muted tabular-nums leading-none'>
												{item.quantity} pcs. × ${item.product.price.toFixed(2)}
											</p>
										</div>
									</div>

									<div className='text-right shrink-0'>
										<span className='text-sm font-bold text-text-main tabular-nums block'>
											${(item.product.price * item.quantity).toFixed(2)}
										</span>
									</div>
								</div>
							))}
						</div>

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

						<button
							type='button'
							disabled={isCheckingOut || !hasItems}
							className='w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-text-main font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-md dark:shadow-black/40:shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={checkout}
						>
							{isCheckingOut ? (
								<>
									<Loader2 size={18} className='animate-spin' />
									Processing...
								</>
							) : (
								'Place Order'
							)}
						</button>
					</div>

					<div className='flex items-center justify-center gap-2 text-xs text-text-subtle font-medium py-1'>
						<ShieldCheck size={14} className='text-green-600' />
						Secure Checkout Protocol Active
					</div>
				</div>
			</div>
		</div>
	)
}
