'use client'

import AccordionItem from '@/src/components/ui/AccordionItem'
import * as Accordion from '@radix-ui/react-accordion'
import accordionItems from '@/constants/accordionItems.json'
import Image from 'next/image'

export default function FAQPage() {
	return (
		<div className='container-responsive flex flex-col lg:flex-row gap-8 items-start py-8'>
			<div className='w-full lg:w-1/3 relative aspect-4/3 lg:aspect-auto lg:h-112.5 shrink-0'>
				<Image
					src='/faq.jpg'
					alt='FAQ Image'
					fill
					className='rounded-[5px] object-cover pointer-events-none'
					unoptimized
				/>
			</div>

			<Accordion.Root
				type='single'
				collapsible
				className='flex w-full lg:w-2/3 flex-col text-gray-900 gap-3'
			>
				{accordionItems.map(accordion => (
					<AccordionItem
						key={accordion.label}
						value={accordion.label}
						{...accordion}
					/>
				))}
			</Accordion.Root>
		</div>
	)
}
