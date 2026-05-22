'use client'

import api from '@/src/lib/api'
import { CategoryType } from '@/src/types/category'
import { useQuery } from '@tanstack/react-query'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import socialData from '@/data/socialItems.json'

interface ContactItem {
	icon: React.ComponentType<{ size?: number; color?: string }>
	label: string
}

interface SocialItem {
	name: string
	href: string
	path: string
}

interface ImageItem {
	src: string
	alt: string
}

const contactData: ContactItem[] = [
	{
		icon: MapPin,
		label: '51 Green St.Huntington ohio beach ontario, NY 11746 KY 4783, USA.',
	},
	{ icon: Mail, label: 'example@email.com' },
	{ icon: Phone, label: '+1 (555) 123-4567' },
]

const companyData: string[] = [
	'About Us',
	'Delivery Information',
	'Privacy Policy',
	'Terms & Conditions',
	'Contact Us',
	'Support Center',
]

const socialMediaData: SocialItem[] = socialData

const imageData: ImageItem[] = [
	{ src: '/product_1.jpg', alt: 'Product 1' },
	{ src: '/product_2.jpg', alt: 'Product 2' },
	{ src: '/product_3.jpg', alt: 'Product 3' },
	{ src: '/product_4.jpg', alt: 'Product 4' },
	{ src: '/product_5.jpg', alt: 'Product 5' },
]

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
		<footer className='flex flex-col relative h-auto 2xl:h-128 w-full bg-[#F7F7F8] border-t border-[#E9E9E9] pt-12 xl:pt-16 2xl:pt-0 pb-6 2xl:pb-0'>
			<div className='hidden 2xl:block grow'></div>

			<div className='w-full px-6 sm:px-12 2xl:px-0 2xl:w-2/3 h-auto 2xl:h-102 flex flex-col items-center 2xl:items-end justify-center mx-auto max-w-360'>
				<div className='w-full h-full flex flex-col xl:flex-row gap-12 xl:gap-6 2xl:gap-0'>
					<div className='w-full xl:w-[30%] 2xl:w-1/3 xl:pr-4 flex flex-col items-start'>
						<div className='flex flex-row items-center justify-start gap-2'>
							<div className='rounded-[14px] bg-white w-10 h-10 flex items-center justify-center shadow-sm'>
								<Image src='/logo.png' alt='Logo' width={40} height={40} />
							</div>
							<div className='flex flex-col justify-center'>
								<h2 className='text-[18px] font-bold'>Foodzy</h2>
								<p className='text-[10px] text-[#818181] font-semibold'>
									A Treasure of Tastes
								</p>
							</div>
						</div>

						<p className='text-sm text-[#7A7A7A] mt-3 flex flex-col'>
							<span>Foodzy is the biggest market of grocery products.</span>
							<span>Get your daily needs from our store.</span>
						</p>

						<div className='flex flex-col mt-7 gap-4 w-full'>
							{contactData.map((contact, index) => {
								const IconComponent = contact.icon
								return (
									<div
										key={index}
										className='flex items-start sm:items-center gap-3'
									>
										<div className='w-5 h-5 mt-0.5 sm:mt-0 shrink-0'>
											<IconComponent size={20} color='#F53E32' />
										</div>
										<span className='text-[#777777] text-sm tracking-[0.48px]'>
											{contact.label}
										</span>
									</div>
								)
							})}
						</div>
					</div>

					<div className='w-full xl:w-[70%] 2xl:w-2/3 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 2xl:flex 2xl:flex-row 2xl:justify-between gap-8 xl:gap-4 2xl:gap-0'>
						<div className='flex flex-col gap-4'>
							<h2 className='font-bold text-[18px] whitespace-nowrap'>
								Company
							</h2>
							<div className='flex flex-col gap-2.5 2xl:gap-4'>
								{companyData.map(company => (
									<span
										className='text-[14px] tracking-[0.48px] leading-6.5 font-normal text-[#777777] whitespace-nowrap cursor-pointer hover:text-black'
										key={company}
									>
										{company}
									</span>
								))}
							</div>
						</div>

						<div className='flex flex-col gap-4'>
							<h2 className='font-bold text-[18px] whitespace-nowrap'>
								Category
							</h2>
							<div className='flex flex-col gap-2.5 2xl:gap-4'>
								{categories.length > 0 ? (
									categories.map(category => (
										<Link
											href={`/products?search=&category=${encodeURIComponent(category.name)}`}
											key={category.categoryId}
											className='text-[14px] tracking-[0.48px] leading-6.5 font-normal text-[#777777] whitespace-nowrap hover:text-black'
										>
											{category.name}
										</Link>
									))
								) : (
									<span className='text-xs text-gray-400'>Loading...</span>
								)}
							</div>
						</div>

						<div className='flex flex-col max-w-full sm:max-w-md 2xl:max-w-none col-span-full sm:col-span-1 xl:col-span-1 2xl:col-span-0'>
							<h2 className='font-bold text-[18px] whitespace-nowrap'>
								Subscribe Our Newsletter
							</h2>

							<div className='h-11 w-full xl:max-w-95 2xl:w-104 mt-4 rounded-[5px] border border-[#E9E9E9] bg-white flex items-center justify-between px-4 focus-within:border-gray-400 transition-colors'>
								<input
									type='email'
									placeholder='Your email...'
									className='h-full flex-1 text-[14px] text-black focus:outline-none bg-transparent placeholder:text-gray-400'
								/>
								<button className='cursor-pointer pl-2'>
									<Send
										size={18}
										className='transform rotate-45 -translate-y-0.5'
									/>
								</button>
							</div>

							<div className='flex h-9 mt-6 gap-1'>
								{socialMediaData.map(social => (
									<Link
										key={social.name}
										href={social.href}
										target='_blank'
										className='rounded-[5px] border border-[#E1DFDF] w-9 h-9 flex items-center justify-center hover:bg-gray-50'
									>
										<svg
											viewBox='0 0 24 24'
											className='w-5 h-5 fill-current text-black'
										>
											<path d={social.path} />
										</svg>
									</Link>
								))}
							</div>

							<div className='flex flex-wrap gap-3 mt-6 flex-row'>
								{imageData.map(image => (
									<Image
										src={image.src}
										alt={image.alt}
										width={74}
										height={74}
										key={image.alt}
										className='rounded-[5px]'
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='w-full h-14 border-t border-[#E9E9E9] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mt-12 2xl:mt-0'>
					<p className='text-sm text-[#777777] sm:text-black'>© 2026</p>
					<div className='flex'>
						<span className='text-sm text-[#F53E32] font-medium'>Foodzy</span>
						<p className='text-sm text-[#777777] sm:text-black'>
							, All rights reserved.
						</p>
					</div>
				</div>
			</div>

			<div className='absolute inset-0 pointer-events-none hidden md:block'>
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
