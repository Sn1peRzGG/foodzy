'use client'

import { FormInput } from '@/src/components/ui/FormFields'
import api from '@/src/lib/api'
import { getApiError } from '@/src/utils/getApiError'
import { getFieldErrors } from '@/src/utils/getFieldErrors'
import { ArrowRight, Lock, LogIn, Mail } from 'lucide-react'
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
				'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'

			isValid = false
		}

		setErrors(newErrors)

		return isValid
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setErrors({
			email: '',
			password: '',
		})

		if (!validate()) {
			return
		}

		setLoading(true)

		const loadingToast = toast.loading('Authenticating...')

		try {
			await api.post('/auth/login', {
				email: formData.email,
				password: formData.password,
			})

			toast.success('Welcome back!', {
				id: loadingToast,
			})

			localStorage.setItem('isLoggedIn', 'true')
			router.push('/account')
			router.refresh()
		} catch (error) {
			const fieldErrors = getFieldErrors(error)

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
						placeholder='Enter Your email'
						value={formData.email}
						error={errors.email}
						icon={<Mail size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								email: e.target.value,
							}))
						}
						required
					/>

					<FormInput
						label='Password'
						type='password'
						placeholder='Enter Your password'
						value={formData.password}
						error={errors.password}
						icon={<Lock size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								password: e.target.value,
							}))
						}
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
						{loading ? 'Signing in...' : 'Sign in'}

						{!loading && (
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
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
