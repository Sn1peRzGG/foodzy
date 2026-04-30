import Image from 'next/image'

interface PromoBlockProps {
	title: string
	description: string
	image: string
}

export default function PromoBlock({
	title,
	description,
	image,
}: PromoBlockProps) {
	return (
		<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6.5 px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4.5 rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] items-start sm:items-center w-full lg:w-158.75'>
			<div className='shrink-0 flex items-center justify-center rounded-full w-14 h-14 sm:w-18 md:w-20 lg:w-22.5 lg:h-22.5 shadow-[0_2.09px_4.19px_0_rgba(0,0,0,0.075)] bg-white'>
				<Image
					src={image}
					alt={title}
					width={45}
					height={45}
					className='w-7 h-7 sm:w-9 md:w-10 lg:w-11'
				/>
			</div>

			<div className='flex flex-col gap-1 md:gap-1.5 flex-1'>
				<h3 className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight'>
					{title}
				</h3>
				<p className='font-medium text-xs sm:text-sm md:text-base lg:text-[20px] text-gray-500 leading-[1.3]'>
					{description}
				</p>
			</div>
		</div>
	)
}
