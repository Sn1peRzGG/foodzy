import AccordionItem from '@/src/components/ui/AccordionItem'
import { Accordion } from '@base-ui/react/accordion'
import accordionItems from '@/data/accordionItems.json'
import Image from 'next/image'

export default function FAQPage() {
	return (
		<div className='container-responsive flex flex-row gap-6'>
			<Image
				src={'/faq.jpg'}
				alt='FAQ Image'
				width={600}
				height={400}
				className='rounded-[5px] aspect-auto pointer-events-none'
			/>
			<Accordion.Root className='flex w-2/3 max-w-[calc(100vw-8rem)] flex-col justify-center text-gray-900 gap-3'>
				{accordionItems.map(accordion => (
					<AccordionItem key={accordion.label} {...accordion} />
				))}
			</Accordion.Root>
		</div>
	)
}
