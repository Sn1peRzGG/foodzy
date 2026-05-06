import products from '../../../data/products.json'
import { ProductType } from '../../types/product'
import BlogCard from '../ui/BlogCard'
import ControlButton from '../ui/ControlButton'

const productsData: ProductType[] = products

export default function SpecialSection() {
	return (
		<div className='flex flex-col w-full gap-6 md:gap-8 lg:gap-10 relative mt-6'>
			<div className='flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 lg:gap-12'>
				<div className='flex flex-col justify-start gap-2 md:gap-3 lg:gap-10 flex-1'>
					<h2 className='text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-[#FF6868] tracking-[0.175em] uppercase'>
						Special Dishes
					</h2>
					<p className='text-xl sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold leading-[1.315] max-w-[15ch]'>
						Standout Dishes From Our Menu
					</p>
				</div>

				<div className='flex gap-2 md:gap-3 lg:gap-12.5 shrink-0 my-auto pr-8'>
					<ControlButton
						orientation='left'
						backgroundColor='#EFEFEF'
						textColor='#6F6E6E'
					/>
					<ControlButton
						orientation='right'
						backgroundColor='#F53E32'
						textColor='white'
					/>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-10 justify-items-center w-full mt-8 md:mt-10 lg:mt-16'>
				{productsData.map(product => (
					<BlogCard key={product.id} {...product} />
				))}
			</div>
		</div>
	)
}
