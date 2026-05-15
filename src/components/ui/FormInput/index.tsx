import { Eye, EyeOff } from 'lucide-react'
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
						w-full rounded-xl border bg-white py-3 text-gray-900 outline-none transition-all
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
