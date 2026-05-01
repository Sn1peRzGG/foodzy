import Banner from '@/src/components/Banner'
import CategorySection from '@/src/components/CategorySection'
import PromoSection from '@/src/components/PromoSection'
import SpecialSection from '@/src/components/SpecialSection'

export default function Home() {
	return (
		<main>
			<Banner />
			<CategorySection />
			<SpecialSection />
			<PromoSection />
		</main>
	)
}
