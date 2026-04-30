import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='flex flex-col relative h-128 w-full bg-[#F7F7F8] border-t border-[#E9E9E9]'>
			<div className='grow'></div>

			<div className='w-2/3 h-102 px-3 flex items-end justify-center mx-auto'>
				<div className='w-full h-14 border-t border-[#E9E9E9] flex items-center justify-center gap-2'>
					<p className='text-sm'>© 2025</p>
					<span className='text-sm text-[#F53E32] font-medium'>Foodzy</span>
					<p className='text-sm'>, All rights reserved.</p>
				</div>
			</div>

			<div className='absolute inset-0 pointer-events-none'>
				<Image
					src='/footer_lemon.png'
					loading='eager'
					alt='Lemon'
					width={60}
					height={60}
					className='absolute top-50 -left-2.5 p-1'
				/>
				<Image
					src='/footer_tomato.png'
					loading='eager'
					alt='Tomato'
					width={70}
					height={60}
					className='absolute -top-6 right-25 p-1'
				/>
				<Image
					src='/footer_pepper.png'
					loading='eager'
					alt='Pepper'
					width={120}
					height={60}
					className='absolute bottom-5 right-54 p-1'
				/>
			</div>
		</footer>
	)
}
