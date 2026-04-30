import Banner from '@/components/Banner'
import CategorySection from '@/components/CategorySection'
import PromoSection from '@/components/PromoSection'
import SpecialSection from '@/components/SpecialSection'

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
