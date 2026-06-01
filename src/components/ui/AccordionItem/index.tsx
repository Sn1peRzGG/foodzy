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
			className='border border-[#E9E9E9] rounded-[5px] overflow-hidden bg-white'
		>
			<Accordion.Header className='flex'>
				<Accordion.Trigger className='group relative flex w-full items-center justify-between gap-4 bg-white p-4 text-[16px] text-left font-normal hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-gray-400 cursor-pointer transition-colors'>
					<span className='text-black font-medium'>{label}</span>
					<ChevronRight
						size={20}
						className='mr-2 shrink-0 text-gray-500 transition-transform duration-200 ease-out group-data-[state=open]:rotate-90'
					/>
				</Accordion.Trigger>
			</Accordion.Header>

			<Accordion.Content className='overflow-hidden text-base text-[#7A7A7A] bg-white border-t border-[#E9E9E9] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp'>
				<div className='p-4 text-[15px] leading-relaxed'>{content}</div>
			</Accordion.Content>
		</Accordion.Item>
	)
}
