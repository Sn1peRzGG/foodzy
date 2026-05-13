'use client'

import { FormInput } from '@/src/components/ui/FormInput'
import api from '@/src/lib/api'
import { ArrowRight, Lock, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const validate = () => {
		let isValid = true

		const newErrors = {
			email: '',
			password: '',
		}

		if (!EMAIL_REGEX.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
			isValid = false
		}

		if (!PASSWORD_REGEX.test(formData.password)) {
			newErrors.password =
				'Password must be 8+ chars with uppercase, lowercase, and numbers'

			isValid = false
		}

		setErrors(newErrors)

		return isValid
	}

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault()

		if (!validate()) return

		setLoading(true)

		const loadToast = toast.loading('Authenticating...')

		try {
			const response = await api.post('/auth/login', {
				email: formData.email,
				password: formData.password,
			})

			if (response.status === 200 || response.status === 201) {
				toast.success('Login successful', {
					id: loadToast,
				})

				router.push('/account')
			}
		} catch (error: any) {
			toast.error(
				error.response?.data?.message || 'Invalid email or password',
				{
					id: loadToast,
				},
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex flex-1 items-center justify-center px-4 py-8'>
			<div className='w-full max-w-md'>
				<div className='mb-8 text-center'>
					<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#64B496] text-white shadow-xl shadow-[#64B496]/30'>
						<LogIn size={28} />
					</div>

					<h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
						Welcome Back
					</h1>

					<p className='mt-2 text-gray-500'>
						Please enter your details to sign in
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className='space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50'
				>
					<FormInput
						label='Email Address'
						type='email'
						placeholder='e.g. admin@test.com'
						value={formData.email}
						error={errors.email}
						icon={<Mail size={18} />}
						onChange={e =>
							setFormData({
								...formData,
								email: e.target.value,
							})
						}
						required
					/>

					<FormInput
						label='Password'
						type='password'
						placeholder='••••••••'
						value={formData.password}
						error={errors.password}
						icon={<Lock size={18} />}
						onChange={e =>
							setFormData({
								...formData,
								password: e.target.value,
							})
						}
						required
					/>

					<div className='text-right text-sm'>
						<Link
							href='/forgot-password'
							className='group relative inline-block font-semibold text-[#64B496]'
						>
							Forgot password?
							<span className='absolute left-0 -bottom-0.5 h-0.5 w-0 bg-[#64B496] transition-all duration-300 group-hover:w-full' />
						</Link>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='group relative flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#64B496] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#58a78a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'
					>
						{loading ? 'Signing in...' : 'Sign in'}

						{!loading && (
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
						)}
					</button>
				</form>

				<div className='mt-8 text-center'>
					<p className='text-sm text-gray-600'>
						Don't have an account?{' '}
						<Link
							href='/signup'
							className='group relative inline-block font-bold text-[#64B496]'
						>
							Create an account
							<span className='absolute left-0 -bottom-0.5 h-0.5 w-0 bg-[#64B496] transition-all duration-300 group-hover:w-full' />
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
