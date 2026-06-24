'use client'

import * as Select from '@radix-ui/react-select'
import {
	Check,
	ChevronDown,
	Eye,
	EyeOff,
	Image as ImageIcon,
	X,
	Upload,
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
			<label className='ml-0.5 text-sm font-semibold text-text-muted'>
				{label}
			</label>

			<div className='group relative'>
				{icon && (
					<div className='absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle transition-colors group-focus-within:text-primary'>
						{icon}
					</div>
				)}

				<input
					{...props}
					type={inputType}
					className={`
            w-full rounded-xl border bg-card-bg py-3 text-text-main outline-none transition-all text-sm font-medium
            ${icon ? 'pl-10 pr-10' : 'px-4'}
            ${
							error
								? 'border-accent focus:ring-4 focus:ring-accent/10'
								: 'border-border-main focus:border-primary focus:ring-4 focus:ring-[#64B496]/15'
						}
          `}
				/>

				{isPassword && (
					<button
						type='button'
						onClick={() => setShowPassword(prev => !prev)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle transition-colors hover:text-primary cursor-pointer'
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				)}
			</div>

			<div
				className={`grid transition-all duration-300 ease-out ${
					error ? 'grid-rows-[1fr] mt-1' : 'grid-rows-[0fr] mt-0'
				}`}
			>
				<div className='overflow-hidden'>
					<p
						className={`ml-1 text-xs font-semibold text-accent transition-all duration-300 ${
							error
								? 'opacity-100 translate-y-0 scale-100'
								: 'opacity-0 -translate-y-1 scale-95'
						}`}
					>
						{error}
					</p>
				</div>
			</div>
		</div>
	)
}

interface FormFileFieldProps {
	label: string
	previewUrl: string | null
	error?: string | null
	disabled?: boolean
	onChange: (file: File) => void
	onError?: (error: string | null) => void
	onRemove?: () => void
}

export const FormFileField = ({
	label,
	previewUrl,
	error,
	disabled,
	onChange,
	onError,
	onRemove,
}: FormFileFieldProps) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (file.size > 4 * 1024 * 1024) {
			if (onError) onError('File size exceeds 4MB limit')
			return
		}

		if (onError) onError(null)
		onChange(file)
	}

	return (
		<div className='w-full space-y-1.5 text-left'>
			<label className='ml-0.5 text-sm font-semibold text-text-muted'>
				{label}
			</label>

			<div
				className={`flex items-center gap-4 p-3 bg-card-bg rounded-xl border transition-all ${
					error
						? 'border-accent focus-within:ring-4 focus-within:ring-accent/10'
						: 'border-border-main focus-within:border-primary focus-within:ring-4 focus-within:ring-[#64B496]/15'
				}`}
			>
				<div className='w-14 h-14 rounded-xl bg-main-bg border border-border-main overflow-hidden shrink-0 relative flex items-center justify-center text-text-subtle font-bold text-xs shadow-md dark:shadow-black/40'>
					{previewUrl ? (
						<Image
							src={previewUrl}
							alt='Preview'
							fill
							unoptimized
							className='object-cover'
						/>
					) : (
						<ImageIcon size={20} className='text-text-subtle/70' />
					)}
				</div>

				<div className='flex items-center gap-2.5 flex-1'>
					<label
						className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-card-bg border border-border-strong rounded-xl text-sm font-bold text-text-main shadow-sm transition-all active:scale-95 cursor-pointer select-none
              ${
								disabled
									? 'opacity-50 cursor-not-allowed'
									: 'hover:bg-ui-hover hover:border-primary/40 text-text-main'
							}`}
					>
						<Upload size={16} className='text-primary' />
						<span>{previewUrl ? 'Change Image' : 'Choose Image'}</span>
						<input
							type='file'
							accept='image/jpeg, image/png, image/webp'
							disabled={disabled}
							onChange={handleInputChange}
							className='hidden'
						/>
					</label>

					{previewUrl && onRemove && (
						<button
							type='button'
							disabled={disabled}
							onClick={onRemove}
							className='p-2.5 bg-card-bg border border-border-strong rounded-xl text-accent shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50 hover:bg-accent/10 hover:border-accent/30 hover:text-accent-hover'
							title='Remove image'
						>
							<X size={18} />
						</button>
					)}
				</div>
			</div>

			<div
				className={`grid transition-all duration-300 ease-out ${
					error ? 'grid-rows-[1fr] mt-1' : 'grid-rows-[0fr] mt-0'
				}`}
			>
				<div className='overflow-hidden'>
					<p
						className={`ml-1 text-xs font-semibold text-accent transition-all duration-300 ${
							error
								? 'opacity-100 translate-y-0 scale-100'
								: 'opacity-0 -translate-y-1 scale-95'
						}`}
					>
						{error}
					</p>
				</div>
			</div>
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
			<label className='ml-0.5 text-sm font-semibold text-text-muted'>
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
            w-full h-11.5 px-4 flex items-center justify-between rounded-xl border bg-card-bg 
            text-sm font-medium text-text-main outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group data-placeholder:text-text-subtle
            ${
							error
								? 'border-accent focus:ring-4 focus:ring-accent/10'
								: 'border-border-main focus:border-primary focus:ring-4 focus:ring-[#64B496]/15'
						}
          `}
				>
					<Select.Value placeholder={placeholder} />
					<Select.Icon>
						<ChevronDown className='w-4 h-4 text-text-subtle transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0' />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Content
						position='popper'
						sideOffset={6}
						align='start'
						style={{ width: 'var(--radix-select-trigger-width)' }}
						className='z-100 bg-card-bg border border-border-main rounded-xl shadow-lg overflow-hidden will-change-[transform,opacity] animate-in fade-in slide-in-from-top-1 duration-150'
					>
						<Select.Viewport className='p-1.5 space-y-0.5 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
							{options.map(option => (
								<Select.Item
									key={option.value}
									value={option.value}
									className='w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg text-text-muted hover:bg-main-bg focus:bg-main-bg outline-none cursor-pointer select-none data-[state=checked]:bg-primary data-[state=checked]:text-text-main transition-colors'
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

			<div
				className={`grid transition-all duration-300 ease-out ${
					error ? 'grid-rows-[1fr] mt-1' : 'grid-rows-[0fr] mt-0'
				}`}
			>
				<div className='overflow-hidden'>
					<p
						className={`ml-1 text-xs font-semibold text-accent transition-all duration-300 ${
							error
								? 'opacity-100 translate-y-0 scale-100'
								: 'opacity-0 -translate-y-1 scale-95'
						}`}
					>
						{error}
					</p>
				</div>
			</div>
		</div>
	)
}
