'use client'

import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

interface SelectOption {
	value: string
	label: string
}

interface AdminSelectProps {
	label: string
	value: string
	options: SelectOption[]
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	required?: boolean
	error?: string
}

export default function AdminSelect({
	label,
	value,
	options,
	onChange,
	placeholder = 'Select an option...',
	disabled = false,
	required = false,
	error,
}: AdminSelectProps) {
	return (
		<div className='ml-1 space-y-1.5 text-left p-0.5 focus-within:relative focus-within:z-10'>
			<label className='ml-0.5 text-xs font-bold uppercase tracking-wider text-gray-500'>
				{label}
			</label>

			<Select.Root
				key={value}
				value={value}
				onValueChange={onChange}
				disabled={disabled}
				required={required}
			>
				<Select.Trigger
					className={`
            w-full h-11 px-3.5 flex items-center justify-between rounded-xl border bg-white 
            text-sm font-medium text-gray-900 outline-hidden transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group data-placeholder:text-gray-400
            ${
							error
								? 'border-red-400 focus:ring-4 focus:ring-red-50'
								: 'border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10'
						}
          `}
				>
					<Select.Value placeholder={placeholder} />
					<Select.Icon>
						<ChevronDown className='w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0' />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Content
						position='popper'
						sideOffset={6}
						align='start'
						style={{ width: 'var(--radix-select-trigger-width)' }}
						className='z-100 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden will-change-[transform,opacity] animate-in fade-in slide-in-from-top-1 duration-150'
					>
						<Select.Viewport className='p-1.5 space-y-0.5 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
							{options.map(option => (
								<Select.Item
									key={option.value}
									value={option.value}
									className='w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold rounded-lg text-gray-700 hover:bg-gray-100 focus:bg-gray-100 outline-hidden cursor-pointer select-none data-[state=checked]:bg-gray-900 data-[state=checked]:text-white transition-colors'
								>
									<Select.ItemText>{option.label}</Select.ItemText>

									<Select.ItemIndicator>
										<Check className='w-3.5 h-3.5' />
									</Select.ItemIndicator>
								</Select.Item>
							))}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			{error && (
				<p className='ml-1 mt-1 text-xs font-medium text-red-500'>{error}</p>
			)}
		</div>
	)
}
