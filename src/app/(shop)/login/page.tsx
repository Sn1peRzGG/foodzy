'use client'

import { FormInput } from '@/src/components/ui/FormFields'
import api from '@/src/lib/api'
import { getApiError } from '@/src/utils/getApiError'
import { getFieldErrors } from '@/src/utils/getFieldErrors'
import { ArrowRight, Loader2, Lock, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

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
		const newErrors = {
			email: '',
			password: '',
		}
		let isValid = true

		if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
			isValid = false
		}

		if (!formData.password || !PASSWORD_REGEX.test(formData.password)) {
			newErrors.password =
				'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
			isValid = false
		}

		return { isValid, newErrors }
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const { isValid, newErrors } = validate()

		if (!isValid) {
			setErrors(newErrors)
			return
		}

		setErrors({
			email: '',
			password: '',
		})

		setLoading(true)
		const loadingToast = toast.loading('Authenticating...')

		try {
			await api.post('/auth/login', {
				email: formData.email,
				password: formData.password,
			})

			toast.success('Welcome back!', { id: loadingToast })

			localStorage.setItem('isLoggedIn', 'true')
			router.push('/account')
			router.refresh()
		} catch (error) {
			const fieldErrors = getFieldErrors(error)

			// Matches signup logic: Server validation messages update the state fields,
			// while the main API response string goes directly to the toast message.
			setErrors(prev => ({
				...prev,
				...fieldErrors,
			}))

			toast.error(getApiError(error), {
				id: loadingToast,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='container-responsive flex flex-1 items-center justify-center'>
			<div className='w-full max-w-md'>
				<div className='mb-8 text-center'>
					<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-text-main shadow-xl shadow-primary/20'>
						<LogIn size={28} />
					</div>

					<h1 className='text-3xl font-extrabold tracking-tight text-text-main'>
						Welcome Back
					</h1>

					<p className='mt-2 text-text-muted'>
						Please enter your details to sign in
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className='space-y-6 rounded-2xl border border-border-main bg-card-bg p-8 shadow-xl shadow-black/3 dark:shadow-black/20'
				>
					<FormInput
						label='Email Address'
						type='email'
						placeholder='john.doe@example.com'
						value={formData.email}
						error={errors.email}
						icon={<Mail size={18} />}
						onChange={e => {
							setFormData(prev => ({ ...prev, email: e.target.value }))
							if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
						}}
						required
					/>

					<FormInput
						label='Password'
						type='password'
						placeholder='••••••••'
						value={formData.password}
						error={errors.password}
						icon={<Lock size={18} />}
						onChange={e => {
							setFormData(prev => ({ ...prev, password: e.target.value }))
							if (errors.password)
								setErrors(prev => ({ ...prev, password: '' }))
						}}
						required
					/>

					<div className='text-right text-sm'>
						<Link
							href='/forgot'
							className='group relative inline-block font-semibold text-primary'
						>
							Forgot password?
							<span className='absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full' />
						</Link>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='group relative flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-bold text-text-main transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'
					>
						{loading ? (
							<span className='flex items-center gap-2'>
								<Loader2 className='h-4 w-4 animate-spin' />
								Processing...
							</span>
						) : (
							<>
								Sign in
								<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</>
						)}
					</button>
				</form>

				<div className='mt-8 text-center'>
					<p className='text-sm text-text-muted'>
						Don&apos;t have an account?{' '}
						<Link
							href='/signup'
							className='group relative inline-block font-bold text-primary'
						>
							Create an account
							<span className='absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full' />
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
