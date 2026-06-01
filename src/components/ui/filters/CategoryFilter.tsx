'use client'

import { useProducts } from '@/src/hooks/useProducts'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Category {
	_id: string
	name: string
}

export default function CategoryFilter() {
	const { getParam, setParam } = useProducts()
	const currentCategory = getParam('category') || 'all'

	const { data: categories = [], isLoading } = useQuery<Category[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await axios.get<Category[]>(
				`${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
			)
			return data
		},
		staleTime: 1000 * 60 * 10,
	})

	return (
		<div className='border-b border-gray-100 pb-5 last:border-0 last:pb-0'>
			<h4 className='text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 select-none'>
				Categories
			</h4>
			<div className='space-y-1.5 max-h-60 overflow-y-auto pr-1'>
				<button
					type='button'
					onClick={() => setParam('category', 'all')}
					className={`w-full text-left p-2 rounded-md text-sm transition-colors cursor-pointer ${
						currentCategory === 'all'
							? 'bg-gray-50 text-primary font-bold'
							: 'text-gray-600 hover:bg-gray-50'
					}`}
				>
					All Categories
				</button>

				{isLoading ? (
					<div className='text-xs text-gray-400 p-2 animate-pulse'>
						Loading...
					</div>
				) : (
					categories.map(category => (
						<button
							key={category._id}
							type='button'
							onClick={() => setParam('category', category._id)}
							className={`w-full text-left p-2 rounded-md text-sm transition-colors cursor-pointer ${
								currentCategory === category._id
									? 'bg-gray-50 text-primary font-bold'
									: 'text-gray-600 hover:bg-gray-50'
							}`}
						>
							{category.name}
						</button>
					))
				)}
			</div>
		</div>
	)
}
