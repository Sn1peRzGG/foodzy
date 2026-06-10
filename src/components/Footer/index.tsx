'use client'

import {
	companyData,
	contactData,
	footerImageData,
} from '@/constants/footerConfig'
import socialData from '@/constants/socialItems.json'
import api from '@/src/lib/api'
import { CategoryType } from '@/src/types/category'
import { useQuery } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SocialItem {
	name: string
	href: string
	path: string
}

const socialMediaData: SocialItem[] = socialData

export default function Footer() {
	const { data: categories = [] } = useQuery<CategoryType[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await api.get('/categories')
			return res.data
		},
		staleTime: 1000 * 60 * 10,
	})

	return (
		<footer className='relative w-full bg-main-bg border-t border-border-main pt-12 xl:pt-16 pb-6'>
			<div className='w-full px-4 sm:px-8 xl:px-16 mx-auto max-w-7xl'>
				<div className='flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-12'>
					<div className='w-full lg:w-1/3 flex flex-col items-start'>
						<div className='flex flex-row items-center justify-start gap-2'>
							<div className='rounded-[14px] bg-card-bg w-10 h-10 flex items-center justify-center shadow-sm'>
								<Image src='/logo.png' alt='Logo' width={40} height={40} />
							</div>
							<div className='flex flex-col justify-center'>
								<h2 className='text-[18px] font-bold'>Foodzy</h2>
								<p className='text-[10px] text-text-subtle font-semibold'>
									A Treasure of Tastes
								</p>
							</div>
						</div>

						<p className='text-sm text-text-subtle mt-4 flex flex-col gap-1'>
							<span>Foodzy is the biggest market of grocery products.</span>
							<span>Get your daily needs from our store.</span>
						</p>

						<div className='flex flex-col mt-6 gap-4 w-full'>
							{contactData.map((contact, index) => {
								const IconComponent = contact.icon
								return (
									<div key={index} className='flex items-start gap-3'>
										<div className='w-5 h-5 mt-0.5 shrink-0'>
											<IconComponent size={20} color='#F53E32' />
										</div>
										<span className='text-text-subtle text-sm tracking-[0.48px] wrap-break-word'>
											{contact.label}
										</span>
									</div>
								)
							})}
						</div>
					</div>

					<div className='w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-6 xl:gap-8'>
						<div className='flex flex-col gap-4'>
							<h2 className='font-bold text-[18px]'>Company</h2>
							<div className='flex flex-col gap-2.5'>
								{companyData.map(company => (
									<span
										className='text-[14px] tracking-[0.48px] leading-6.5 font-normal text-text-subtle cursor-pointer hover:text-text-main transition-colors'
										key={company}
									>
										{company}
									</span>
								))}
							</div>
						</div>

						<div className='flex flex-col gap-4'>
							<h2 className='font-bold text-[18px]'>Category</h2>
							<div className='flex flex-col gap-2.5'>
								{categories.length > 0 ? (
									categories.map(category => (
										<Link
											href={`/products?search=&category=${encodeURIComponent(category._id)}`}
											key={category._id}
											className='text-[14px] tracking-[0.48px] leading-6.5 font-normal text-text-subtle hover:text-text-main transition-colors'
										>
											{category.name}
										</Link>
									))
								) : (
									<span className='text-xs text-text-subtle'>Loading...</span>
								)}
							</div>
						</div>

						<div className='flex flex-col gap-4 col-span-1 sm:col-span-2 md:col-span-1'>
							<h2 className='font-bold text-[18px]'>
								Subscribe Our Newsletter
							</h2>

							<div className='h-11 w-full max-w-md rounded-[5px] border border-border-main bg-card-bg flex flex-row flex-nowrap items-center justify-between px-4 focus-within:border-border-strong transition-colors'>
								<input
									type='email'
									placeholder='Your email...'
									className='h-full flex-1 min-w-0 text-[14px] text-text-main focus:outline-none bg-transparent placeholder:text-text-subtle'
								/>
								<button
									className='cursor-pointer pl-2 shrink-0 flex items-center justify-center'
									aria-label='Subscribe'
								>
									<Send
										size={18}
										className='transform rotate-45 -translate-y-0.5'
									/>
								</button>
							</div>

							<div className='flex h-9 mt-2 gap-2'>
								{socialMediaData.map(social => (
									<Link
										key={social.name}
										href={social.href}
										target='_blank'
										className='rounded-[5px] border border-border-main w-9 h-9 flex items-center justify-center hover:bg-ui-hover transition-colors'
									>
										<svg
											viewBox='0 0 24 24'
											className='w-5 h-5 fill-current text-text-main'
										>
											<path d={social.path} />
										</svg>
									</Link>
								))}
							</div>

							<div className='flex flex-wrap gap-2 mt-2'>
								{footerImageData.map((image, idx) => (
									<Image
										src={image.src}
										alt={image.alt}
										width={60}
										height={60}
										key={idx}
										className='rounded-[5px] object-cover'
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='w-full border-t border-border-main flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6'>
					<p className='text-sm text-text-subtle'>
						© 2026 Foodzy. All rights reserved.
					</p>
					<div className='flex gap-4 text-sm text-text-subtle'>
						<span className='cursor-pointer hover:text-text-main transition-colors'>
							Privacy Policy
						</span>
						<span className='cursor-pointer hover:text-text-main transition-colors'>
							Terms of Service
						</span>
					</div>
				</div>
			</div>

			<div className='absolute inset-0 pointer-events-none hidden lg:block'>
				<Image
					src='/footer_lemon.png'
					alt='Lemon'
					width={60}
					height={60}
					className='absolute top-[40%] -left-2'
				/>
				<Image
					src='/footer_tomato.png'
					alt='Tomato'
					width={70}
					height={60}
					className='absolute -top-6 right-10'
				/>
				<Image
					src='/footer_pepper.png'
					alt='Pepper'
					width={120}
					height={60}
					className='absolute bottom-5 right-10'
				/>
			</div>
		</footer>
	)
}
