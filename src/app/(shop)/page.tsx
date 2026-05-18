import Banner from '@/src/components/Banner'
import CategorySection from '@/src/components/CategorySection'
import PromoSection from '@/src/components/PromoSection'
import SpecialSection from '@/src/components/SpecialSection'

export default function Home() {
	return (
		<>
			<Banner />
			<div className='w-full flex flex-col items-center px-4'>
				<div className='container-responsive'>
					<CategorySection />
					<SpecialSection />
					<PromoSection />
				</div>
			</div>
		</>
	)
}
