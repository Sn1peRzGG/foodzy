import socialData from '@/constants/socialItems.json'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SocialItem {
	name: string
	href: string
	path: string
}

const socialMediaData: SocialItem[] = socialData

const Banner = () => {
	return (
		<div className='relative w-full h-80 sm:h-96 lg:h-225 overflow-hidden'>
			<Image
				src='/banner.png'
				alt='Banner'
				fill
				priority
				className='object-cover object-center pointer-events-none'
				quality={90}
				sizes='100vw'
			/>

			<Link
				href={'/products'}
				className='absolute group hidden xl:flex bg-[#CBB777] rounded-full flex-row cursor-pointer z-10 
                   left-1/2 -translate-x-1/2 bottom-36
                   lg:left-75 lg:bottom-30 lg:translate-x-0'
			>
				<div className='bg-[#36241E] py-2.5 pl-5 pr-3.5 lg:py-3 lg:pl-6 lg:pr-4 flex items-center justify-center rounded-l-full'>
					<ArrowRight
						size={20}
						color='#F9E5C3'
						className='transition-all duration-200 group-hover:translate-x-1 lg:size-5.5'
					/>
				</div>
				<div className='py-2.5 pl-3.5 pr-5 lg:py-3 lg:pl-4 lg:pr-6 flex items-center justify-center'>
					<span className='text-lg lg:text-2xl font-extrabold text-[#36241E] whitespace-nowrap'>
						Order Now
					</span>
				</div>
			</Link>

			<div
				className='absolute z-10 w-full px-6 flex flex-row items-center justify-between gap-4
                   bottom-6 left-0
                   lg:flex-col lg:items-center lg:justify-center lg:gap-7 lg:w-auto lg:px-0 lg:bottom-14 lg:left-auto lg:right-50 4xl:right-70'
			>
				<div className='flex flex-col justify-center items-start lg:items-center gap-1.5 lg:gap-3 h-auto lg:h-14 lg:w-32'>
					<span className='text-[11px] lg:text-[13px] font-bold text-brand-gold whitespace-nowrap'>
						Follow Us Now
					</span>
					<div className='flex flex-row gap-1.5'>
						{socialMediaData.map(social => (
							<Link
								key={social.name}
								href={social.href}
								target='_blank'
								className='rounded-full w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center hover:bg-brand-cream-hover bg-brand-cream transition-colors'
							>
								<svg
									viewBox='0 0 24 24'
									className='w-3.5 h-3.5 lg:w-4 lg:h-4 fill-current'
								>
									<path d={social.path} />
								</svg>
							</Link>
						))}
					</div>
				</div>

				<div className='flex flex-col justify-center items-end lg:items-center text-right lg:text-center'>
					<span className='text-brand-gold text-[12px] lg:text-[14px] font-extrabold whitespace-nowrap'>
						<a href='tel:+15551234567' className='hover:underline'>
							Call Us: +1 (555) 123-4567
						</a>
					</span>
					<Link
						href={'/'}
						className='font-normal text-[11px] lg:text-[13px] text-[#FFF5DB] hover:underline'
					>
						foodzy.com
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Banner
