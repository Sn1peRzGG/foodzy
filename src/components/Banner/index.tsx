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
		<div className='relative w-full h-50 lg:h-225 overflow-hidden'>
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
				className='absolute group bg-[#CCB777] rounded-full flex flex-row cursor-pointer z-10 left-75 bottom-30'
			>
				<div className='bg-[#36241E] py-3 pl-6 pr-4 flex items-center justify-center rounded-l-full'>
					<ArrowRight
						size={22}
						color='#F9E5C3'
						className='transition-all duration-200 group-hover:translate-x-1'
					/>
				</div>
				<div className='py-3 pl-4 pr-6'>
					<span className='text-2xl font-extrabold text-[#402F25]'>
						Order Now
					</span>
				</div>
			</Link>

			<div className='absolute bottom-14 right-50 4xl:right-70 flex flex-col items-center gap-7'>
				<div className='h-14 w-32 gap-3 flex flex-col justify-center items-center'>
					<span className='text-[13px] font-bold text-[#CBB678]'>
						Follow Us Now
					</span>
					<div className='flex flex-row gap-1.5'>
						{socialMediaData.map(social => (
							<Link
								key={social.name}
								href={social.href}
								target='_blank'
								className='rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#ffe9a9] bg-[#FFF6DC]'
							>
								<svg viewBox='0 0 24 24' className='w-4 h-4 fill-current'>
									<path d={social.path} />
								</svg>
							</Link>
						))}
					</div>
				</div>

				<div className='flex flex-col justify-center'>
					<span className='text-[#CBB777] text-[14px] font-extrabold'>
						Call Us: +1 (555) 123-4567
					</span>
					<Link
						href={'http://localhost:3000/'}
						className='font-normal text-[13px] text-[#FFF5DB]'
					>
						foodzy.com
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Banner
