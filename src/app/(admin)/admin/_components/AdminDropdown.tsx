'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface DropdownOption {
	value: string
	label: string
	badgeStyle?: string
}

interface AdminDropdownProps {
	value: string
	options: DropdownOption[]
	onChange: (value: string) => void
	disabled?: boolean
	className?: string
}

export default function AdminDropdown({
	value,
	options,
	onChange,
	disabled = false,
	className = '',
}: AdminDropdownProps) {
	const currentOption = options.find(option => option.value === value)

	return (
		<DropdownMenu.Root modal={false}>
			<DropdownMenu.Trigger asChild>
				<button
					type='button'
					disabled={disabled}
					className={`min-w-37.5 flex items-center justify-between gap-2 bg-card-bg border border-border-main rounded-lg px-3 py-2 text-xs font-bold text-text-muted shadow-sm hover:bg-main-bg hover:border-border-strong transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer ${className}`}
				>
					<span className='truncate'>{currentOption?.label}</span>
					<ChevronDown className='w-4 h-4 text-text-subtle transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180' />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={8}
					align='start'
					style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
					className='z-100 bg-card-bg border border-border-main rounded-xl shadow-lg overflow-hidden will-change-[transform,opacity]'
				>
					<div className='max-h-60 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
						{options.map(option => {
							const isSelected = option.value === value

							return (
								<DropdownMenu.Item key={option.value} asChild>
									<button
										type='button'
										onClick={() => onChange(option.value)}
										className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer outline-none ${
											isSelected
												? 'bg-main-bg text-text-main'
												: 'text-text-muted hover:bg-ui-hover focus:bg-ui-hover'
										}`}
									>
										<span>{option.label}</span>

										{option.badgeStyle && !isSelected && (
											<span
												className={`w-2 h-2 rounded-full shrink-0 shadow-sm ${
													option.badgeStyle.includes('green')
														? 'bg-green-500'
														: option.badgeStyle.includes('red')
															? 'bg-accent'
															: option.badgeStyle.includes('blue')
																? 'bg-blue-500'
																: option.badgeStyle.includes('amber')
																	? 'bg-amber-500'
																	: option.badgeStyle.includes('indigo')
																		? 'bg-indigo-500'
																		: 'bg-gray-400'
												}`}
											/>
										)}
									</button>
								</DropdownMenu.Item>
							)
						})}
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
