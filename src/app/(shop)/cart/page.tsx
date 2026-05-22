'use client'

import { useUser } from '@/src/hooks/useUser'
import { UserType } from '@/src/types/user'
import { NumberField } from '@base-ui/react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Loading from '../../loading'

export default function CartPage() {
	const { data: user, isLoading } = useUser() as {
		data: UserType | undefined
		isLoading: boolean
	}

	const handleUpdateQuantity = (productId: string, newQuantity: number) => {
		console.log(`Quantity for product ${productId} updated to: ${newQuantity}`)
	}

	const handleRemoveItem = (productId: string) => {
		console.log(`Product with ID ${productId} removed from cart`)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className='container-responsive p-6'>
			<h1 className='text-2xl font-bold mb-6'>My Cart</h1>

			{user?.cart && user.cart.length > 0 ? (
				<table className='w-full text-[#444444] border-collapse'>
					<thead>
						<tr className='bg-[#E9E9E9] text-[15px] font-semibold'>
							<th className='py-4 pl-4 text-left rounded-tl-[5px]'>Product</th>
							<th className='py-4 text-center'>Price</th>
							<th className='py-4 text-center'>Quantity</th>
							<th className='py-4 text-center'>Total</th>
							<th className='py-4 text-center rounded-tr-[5px]'>Action</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-[#E9E9E9]'>
						{user.cart.map(item => (
							<tr
								key={item.product._id}
								className='text-[16px] font-normal hover:bg-gray-50/50 transition-colors border-0 bg-[#F7F7F8]'
							>
								<td className='py-4 px-4 flex flex-row items-center'>
									<div className='relative w-15 h-15 border border-[#E9E9E9] rounded-[5px] overflow-hidden bg-white shrink-0'>
										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}
											alt={item.product.name}
											fill
											className='object-contain pointer-events-none p-1'
											unoptimized
										/>
									</div>
									<span className='ml-5 font-medium'>{item.product.name}</span>
								</td>

								<td className='py-6 text-center tabular-nums'>
									${item.product.price.toFixed(2)}
								</td>

								<td className='py-6 text-center'>
									<NumberField.Root
										defaultValue={item.quantity}
										min={1}
										max={100}
										onValueChange={value => {
											if (value !== null) {
												handleUpdateQuantity(item.product._id, value)
											}
										}}
										className='inline-flex items-center rounded-[5px] bg-white border border-[#E9E9E9] h-8 overflow-hidden text-black'
									>
										<NumberField.Group className='flex h-8 items-center'>
											<NumberField.Decrement className='h-full px-2.5 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors border-r border-[#E9E9E9]'>
												<Minus size={14} />
											</NumberField.Decrement>

											<NumberField.Input className='h-full w-10 text-center text-sm tabular-nums focus:outline-none focus:ring-0 bg-transparent' />

											<NumberField.Increment className='h-full px-2.5 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors border-l border-[#E9E9E9]'>
												<Plus size={14} />
											</NumberField.Increment>
										</NumberField.Group>
									</NumberField.Root>
								</td>

								<td className='py-6 text-center font-semibold tabular-nums text-black'>
									${(item.product.price * item.quantity).toFixed(2)}
								</td>

								<td className='py-6 text-center'>
									<button
										className='p-2 text-gray-400 hover:text-red-500 transition-colors mx-auto cursor-pointer flex items-center justify-center'
										onClick={() => handleRemoveItem(item.product._id)}
									>
										<Trash2 size={18} />
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
