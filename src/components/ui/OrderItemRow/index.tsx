'use client'

import { BASE_URL } from '@/src/lib/api'
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
		<div className='flex items-center justify-between gap-4 p-3 sm:p-4 w-full bg-card-bg hover:bg-main-bg/30 transition-colors'>
			<div className='flex items-center gap-3.5 min-w-0 flex-1'>
				<div className='relative w-12 h-12 border border-border-main rounded-lg overflow-hidden bg-card-bg shrink-0 p-1 flex items-center justify-center shadow-md dark:shadow-black/40'>
					<Image
						src={`${BASE_URL}${item.product.imageUrl}`}
						alt={item.product.name || 'Product'}
						fill
						className='object-contain p-1 pointer-events-none'
						unoptimized
					/>
				</div>

				<div className='min-w-0 flex-1'>
					<p className='text-sm font-semibold text-text-muted truncate leading-snug mb-0.5'>
						{item.product.name}
					</p>
					<p className='text-xs text-text-subtle tabular-nums'>
						{item.quantity} pcs. × ${currentPrice.toFixed(2)}
					</p>
				</div>
			</div>

			<span className='text-sm font-bold text-text-main tabular-nums shrink-0 pl-2'>
				${totalPrice.toFixed(2)}
			</span>
		</div>
	)
}
