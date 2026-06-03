'use client'

import React from 'react'
import Image from 'next/image'
import { Image as ImageIcon, AlertCircle } from 'lucide-react'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export const AdminTextField = ({ label, ...props }: TextFieldProps) => {
	return (
		<div className='ml-1 space-y-1.5 text-left p-0.5 focus-within:relative focus-within:z-10'>
			<label className='ml-0.5 text-xs font-bold uppercase tracking-wider text-gray-500'>
				{label}
			</label>
			<input
				{...props}
				className='w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 bg-white outline-hidden focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all disabled:opacity-50'
			/>
		</div>
	)
}

interface FileFieldProps {
	label: string
	previewUrl: string | null
	fileError: string | null
	disabled?: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AdminFileField = ({
	label,
	previewUrl,
	fileError,
	disabled,
	onChange,
}: FileFieldProps) => {
	return (
		<div className='ml-1 space-y-1.5 text-left p-0.5'>
			<label className='ml-0.5 text-xs font-bold uppercase tracking-wider text-gray-500'>
				{label}
			</label>

			<div
				className={`flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-dashed transition-colors ${
					fileError ? 'border-red-300 bg-red-50/10' : 'border-gray-200'
				}`}
			>
				<div className='w-16 h-16 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0 relative flex items-center justify-center text-gray-400 font-bold text-xs shadow-xs'>
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
					className={`inline-flex items-center justify-center h-9 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer ${
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

			{fileError && (
				<div className='flex items-center gap-1.5 text-red-600 text-xs font-semibold mt-1 ml-0.5'>
					<AlertCircle size={14} />
					<span>{fileError}</span>
				</div>
			)}
		</div>
	)
}
