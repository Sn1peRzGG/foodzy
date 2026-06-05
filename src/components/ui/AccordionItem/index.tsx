'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronRight } from 'lucide-react'

interface AccordionItemProps {
	label: string
	content: string
	value: string
}

export default function AccordionItem({
	label,
	content,
	value,
}: AccordionItemProps) {
	return (
		<Accordion.Item
			value={value}
			className='border border-border-main/80 rounded-xl overflow-hidden bg-card-bg transition-all duration-300 focus-within:border-primary/50'
		>
			<Accordion.Header className='flex'>
				<Accordion.Trigger className='group relative flex w-full items-center justify-between gap-4 bg-card-bg p-4 text-[16px] text-left font-normal hover:bg-main-bg/50 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer transition-colors'>
					<span className='text-text-main font-semibold group-hover:text-primary group-data-[state=open]:text-primary transition-colors'>
						{label}
					</span>

					<ChevronRight
						size={18}
						className='shrink-0 text-text-subtle transition-all duration-300 ease-in-out group-hover:text-primary group-data-[state=open]:rotate-90 group-data-[state=open]:text-primary'
					/>
				</Accordion.Trigger>
			</Accordion.Header>

			<Accordion.Content className='overflow-hidden text-base text-text-subtle bg-main-bg/20 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up'>
				<div className='p-4 text-[15px] leading-relaxed border-t border-border-main/40 text-text-muted'>
					{content}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	)
}
