'use client'

import Image from 'next/image'

type OrderItemRowProps = {
	item: {
		quantity: number
		priceAtPurchase?: number
		product?: {
			_id: string
			name: string
			imageUrl: string
			price?: number
		}
	}
}

export default function OrderItemRow({ item }: OrderItemRowProps) {
	if (!item.product) return null

	const currentPrice = item.priceAtPurchase ?? item.product.price ?? 0
	const totalPrice = currentPrice * item.quantity

	return (
		<div className='flex items-center justify-between gap-4 p-3 sm:p-4 w-full bg-white hover:bg-gray-50/30 transition-colors'>
			<div className='flex items-center gap-3.5 min-w-0 flex-1'>
				<div className='relative w-12 h-12 border border-gray-100 rounded-lg overflow-hidden bg-white shrink-0 p-1 flex items-center justify-center shadow-3xs'>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}
						alt={item.product.name || 'Product'}
						fill
						className='object-contain p-1 pointer-events-none'
						unoptimized
					/>
				</div>

				<div className='min-w-0 flex-1'>
					<p className='text-sm font-semibold text-gray-800 truncate leading-snug mb-0.5'>
						{item.product.name}
					</p>
					<p className='text-xs text-gray-400 tabular-nums'>
						{item.quantity} pcs. × ${currentPrice.toFixed(2)}
					</p>
				</div>
			</div>

			<span className='text-sm font-bold text-gray-950 tabular-nums shrink-0 pl-2'>
				${totalPrice.toFixed(2)}
			</span>
		</div>
	)
}
