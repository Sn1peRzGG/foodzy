import Banner from '@/src/components/Banner'
import CategorySection from '@/src/components/CategorySection'
import PromoSection from '@/src/components/PromoSection'
import SpecialSection from '@/src/components/SpecialSection'

export default function Home() {
	return (
		<>
			<Banner />
			<div className='w-full flex flex-col items-center px-4'>
				<div className='w-full md:w-11/12 xl:w-4/5 4xl:w-1/2 max-w-400'>
					<CategorySection />
					<SpecialSection />
					<PromoSection />
				</div>
			</div>
		</>
	)
}
