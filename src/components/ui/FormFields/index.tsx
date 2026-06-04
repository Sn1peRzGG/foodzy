'use client'

import * as Select from '@radix-ui/react-select'
import {
	Check,
	ChevronDown,
	Eye,
	EyeOff,
	Image as ImageIcon,
} from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	icon?: React.ReactNode
}

export const FormInput = ({
	label,
	error,
	icon,
	type,
	...props
}: FormInputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	const isPassword = type === 'password'
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

	return (
		<div className='w-full space-y-1.5 text-left'>
			<label className='ml-0.5 text-sm font-semibold text-gray-700'>
				{label}
			</label>

			<div className='group relative'>
				{icon && (
					<div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary'>
						{icon}
					</div>
				)}

				<input
					{...props}
					type={inputType}
					className={`
            w-full rounded-xl border bg-white py-3 text-gray-900 outline-none transition-all text-sm font-medium
            ${icon ? 'pl-10 pr-10' : 'px-4'}
            ${
							error
								? 'border-red-400 focus:ring-4 focus:ring-red-50'
								: 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-[#64B496]/15'
						}
          `}
				/>

				{isPassword && (
					<button
						type='button'
						onClick={() => setShowPassword(prev => !prev)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-primary cursor-pointer'
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				)}
			</div>

			{error && (
				<p className='ml-1 mt-1 text-xs font-medium text-red-500'>{error}</p>
			)}
		</div>
	)
}

interface FormFileFieldProps {
	label: string
	previewUrl: string | null
	error?: string | null
	disabled?: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormFileField = ({
	label,
	previewUrl,
	error,
	disabled,
	onChange,
}: FormFileFieldProps) => {
	return (
		<div className='w-full space-y-1.5 text-left'>
			<label className='ml-0.5 text-sm font-semibold text-gray-700'>
				{label}
			</label>

			<div
				className={`flex items-center gap-4 p-3 bg-white rounded-xl border transition-all ${
					error
						? 'border-red-400 focus-within:ring-4 focus-within:ring-red-50'
						: 'border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-[#64B496]/15'
				}`}
			>
				<div className='w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0 relative flex items-center justify-center text-gray-400 font-bold text-xs shadow-2xs'>
					{previewUrl ? (
						<Image
							src={previewUrl}
							alt='Preview'
							fill
							unoptimized
							className='object-cover'
						/>
					) : (
						<ImageIcon size={20} className='text-gray-300' />
					)}
				</div>

				<label
					className={`inline-flex items-center justify-center py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer ${
						disabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					<span>Choose Image</span>
					<input
						type='file'
						accept='image/jpeg, image/png, image/webp'
						disabled={disabled}
						onChange={onChange}
						className='hidden'
					/>
				</label>
			</div>

			{error && (
				<p className='ml-1 mt-1 text-xs font-medium text-red-500'>{error}</p>
			)}
		</div>
	)
}

interface SelectOption {
	value: string
	label: string
}

interface FormSelectProps {
	label: string
	value: string
	options: SelectOption[]
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	required?: boolean
	error?: string
}

export function FormSelect({
	label,
	value,
	options,
	onChange,
	placeholder = 'Select an option...',
	disabled = false,
	required = false,
	error,
}: FormSelectProps) {
	return (
		<div className='w-full space-y-1.5 text-left'>
			<label className='ml-0.5 text-sm font-semibold text-gray-700'>
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
            w-full h-11.5 px-4 flex items-center justify-between rounded-xl border bg-white 
            text-sm font-medium text-gray-900 outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group data-placeholder:text-gray-400
            ${
							error
								? 'border-red-400 focus:ring-4 focus:ring-red-50'
								: 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-[#64B496]/15'
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
									className='w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 focus:bg-gray-50 outline-none cursor-pointer select-none data-[state=checked]:bg-primary data-[state=checked]:text-white transition-colors'
								>
									<Select.ItemText>{option.label}</Select.ItemText>

									<Select.ItemIndicator>
										<Check className='w-4 h-4' />
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
