import Image from 'next/image'
import PromoCard from '../ui/PromoCard'

export default function PromoSection() {
	return (
		<div className='flex flex-col md:flex-row font-nunito mb-10 px-4 md:px-6 lg:px-8 w-full gap-6 md:gap-8 lg:gap-12 lg:w-3/4 mx-auto'>
			<div className='shrink-0 flex justify-center md:justify-start w-full md:w-auto'>
				<Image
					src='/promo.png'
					alt='Promo Image'
					width={578}
					height={526}
					className='rounded-[29px] w-full h-auto'
					priority
				/>
			</div>

			<div className='flex flex-col justify-center flex-1 gap-6 md:gap-8'>
				<h2 className='font-bold text-gray-800 text-2xl md:text-3xl lg:text-[50px] leading-[1.2]'>
					Why People Choose us?
				</h2>

				<div className='flex flex-col gap-3 md:gap-4 lg:gap-9'>
					<PromoCard
						title='Convenient and Reliable'
						description='Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.'
						image='/delivery_icon.png'
					/>
					<PromoCard
						title='Variety of Options'
						description='From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.'
						image='/menu_icon.png'
					/>
					<PromoCard
						title='Eat Burger'
						description='Our burgers are grilled to perfection, with juicy patties and flavorful toppings that make every bite a delicious experience.'
						image='/burger_icon.png'
					/>
				</div>
			</div>
		</div>
	)
}
