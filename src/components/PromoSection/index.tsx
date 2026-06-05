import PromoCard from '@/src/components/ui/PromoCard'
import Image from 'next/image'

export default function PromoSection() {
	return (
		<div className='flex flex-col md:flex-row items-center justify-between font-nunito my-10 w-full gap-8 lg:gap-12 xl:gap-16'>
			<div className='w-full md:w-1/2 lg:w-[45%] flex justify-center md:justify-start'>
				<Image
					src='/promo.png'
					alt='Promo Image'
					width={578}
					height={526}
					className='rounded-[29px] w-full h-auto max-w-144.5'
					priority
				/>
			</div>

			<div className='flex flex-col justify-center w-full md:w-1/2 lg:w-[50%] gap-6 md:gap-8'>
				<h2 className='font-bold text-text-muted text-3xl lg:text-4xl 3xl:text-[50px] leading-[1.2] text-center md:text-left'>
					Why People Choose us?
				</h2>

				<div className='flex flex-col gap-4 lg:gap-6 4xl:gap-9'>
					<PromoCard
						title='Convenient and Reliable'
						description='Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.'
						imageUrl='/delivery_icon.png'
					/>
					<PromoCard
						title='Variety of Options'
						description='From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.'
						imageUrl='/menu_icon.png'
					/>
					<PromoCard
						title='Eat Burger'
						description='Our burgers are grilled to perfection, with juicy patties and flavorful toppings that make every bite a delicious experience.'
						imageUrl='/burger_icon.png'
					/>
				</div>
			</div>
		</div>
	)
}
