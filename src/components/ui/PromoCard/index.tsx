import Image from 'next/image'

interface PromoBlockProps {
	title: string
	description: string
	imageUrl: string
}

export default function PromoBlock(props: PromoBlockProps) {
	return (
		<div className='flex flex-col sm:flex-row gap-4 lg:gap-6 px-4 py-4 rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] items-start sm:items-center w-full'>
			<div className='shrink-0 flex items-center justify-center rounded-full w-14 h-14 sm:w-18 lg:w-20 lg:h-20 4xl:w-24 4xl:h-24 shadow-[0_2px_4px_0_rgba(0,0,0,0.075)] bg-white'>
				<Image
					src={props.imageUrl}
					alt={props.title}
					width={45}
					height={45}
					className='w-1/2 h-auto'
				/>
			</div>

			<div className='flex flex-col gap-1 flex-1'>
				<h3 className='font-semibold text-lg md:text-xl xl:text-2xl 4xl:text-3xl leading-tight text-gray-800'>
					{props.title}
				</h3>
				<p className='font-medium text-xs md:text-sm xl:text-base 4xl:text-[20px] text-gray-500 leading-relaxed'>
					{props.description}
				</p>
			</div>
		</div>
	)
}
