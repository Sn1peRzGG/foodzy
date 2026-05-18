import { Accordion } from '@base-ui/react/accordion'
import { ChevronRight } from 'lucide-react'

interface AccordionItemProps {
	label: string
	content: string
}

export default function AccordionItem(accordion: AccordionItemProps) {
	return (
		<Accordion.Item className='border border-[#E9E9E9] rounded-[5px]'>
			<Accordion.Header>
				<Accordion.Trigger className='group relative flex w-full items-center justify-between gap-4 bg-white p-4 text-[16px] text-left font-normal hover:bg-gray-100 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-gray-400 cursor-pointer border-b border-[#E9E9E9]'>
					{accordion.label}
					<ChevronRight
						size={20}
						className='mr-2 shrink-0 transition-all ease-out group-data-panel-open:rotate-90'
					/>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Panel className='overflow-hidden text-base text-[#7A7A7A] transition-[height] ease-out data-ending-style:h-0 data-starting-style:h-0 bg-white'>
				<div className='p-3'>{accordion.content}</div>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
