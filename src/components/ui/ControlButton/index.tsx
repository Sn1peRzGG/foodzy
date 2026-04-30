import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ControlButtonProps {
	orientation: 'left' | 'right'
	backgroundColor: string
	textColor: string
}

export default function ControlButton({
	orientation,
	backgroundColor,
	textColor,
}: ControlButtonProps) {
	const Icon = orientation === 'left' ? ChevronLeft : ChevronRight

	return (
		<button
			style={{ backgroundColor: backgroundColor, color: textColor }}
			className='w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full transition-colors duration-300 cursor-pointer hover:opacity-80'
		>
			{orientation === 'left' ? (
				<ChevronLeft className='h-5 w-5 md:h-6 md:w-6' />
			) : (
				<ChevronRight className='h-5 w-5 md:h-6 md:w-6' />
			)}
		</button>
	)
}
