import Image from 'next/image'

const Banner = () => {
	return (
		<div className='relative w-full h-225 overflow-hidden'>
			<Image
				src='/banner.png'
				alt='Banner'
				fill
				priority
				className='object-cover'
				quality={90}
				sizes='100vw'
			/>
		</div>
	)
}

export default Banner
