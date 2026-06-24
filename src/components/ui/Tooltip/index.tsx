import { HelpCircle } from 'lucide-react'

interface TooltipProps {
	text: string
}

export function Tooltip({ text }: TooltipProps) {
	return (
		<div className='group relative inline-block ml-1.5 cursor-help text-text-muted hover:text-primary transition-colors'>
			<HelpCircle size={14} className='inline-block align-middle' />

			<div className='absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 hidden group-hover:block rounded-lg bg-gray-900 p-2 text-xs font-medium text-white shadow-lg dark:bg-gray-800'>
				{text}
				<div className='absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 bg-gray-900 rotate-45 dark:bg-gray-800' />
			</div>
		</div>
	)
}
