'use client'

import { FormInput } from '@/src/components/ui/FormInput'
import api from '@/src/lib/api'
import { getApiError } from '@/src/lib/get-api-error'
import { getFieldErrors } from '@/src/lib/get-field-errors'
import {
	ArrowRight,
	House,
	Lock,
	LogIn,
	Mail,
	MapPin,
	Phone,
	User,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const PHONE_REGEX = /^\+?[1-9]\d{9,14}$/

export default function SignupPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		city: '',
		address: '',
	})

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		city: '',
		address: '',
	})

	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const validate = () => {
		let isValid = true

		const newErrors = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			city: '',
			address: '',
		}

		if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
			newErrors.email = 'Invalid email format'
			isValid = false
		}

		if (!formData.password || !PASSWORD_REGEX.test(formData.password)) {
			newErrors.password =
				'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
			isValid = false
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match'
			isValid = false
		}

		if (!formData.firstName || formData.firstName.trim().length < 2) {
			newErrors.firstName = 'First name must be at least 2 characters'
			isValid = false
		}

		if (formData.firstName && formData.firstName.length > 50) {
			newErrors.firstName = 'First name must be at most 50 characters'
			isValid = false
		}

		if (!formData.lastName || formData.lastName.trim().length < 2) {
			newErrors.lastName = 'Last name must be at least 2 characters'
			isValid = false
		}

		if (formData.lastName && formData.lastName.length > 50) {
			newErrors.lastName = 'Last name must be at most 50 characters'
			isValid = false
		}

		if (!formData.phoneNumber || !PHONE_REGEX.test(formData.phoneNumber)) {
			newErrors.phoneNumber = 'Invalid phone number'
			isValid = false
		}

		if (formData.city && formData.city.length > 100) {
			newErrors.city = 'City must be at most 100 characters'
			isValid = false
		}

		if (formData.address && formData.address.length > 255) {
			newErrors.address = 'Address must be at most 255 characters'
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
			confirmPassword: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			city: '',
			address: '',
		})

		if (!validate()) return

		setLoading(true)

		const loadingToast = toast.loading('Creating account...')

		const payload = {
			email: formData.email,
			password: formData.password,
			firstName: formData.firstName,
			lastName: formData.lastName,
			phoneNumber: formData.phoneNumber,
			city: formData.city?.trim() || undefined,
			address: formData.address?.trim() || undefined,
		}

		try {
			await api.post('/users', payload)

			toast.success('Account created!', { id: loadingToast })

			await api.post('/auth/login', {
				email: payload.email,
				password: payload.password,
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
					<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-[#64B496]/30'>
						<LogIn size={28} />
					</div>

					<h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
						Create Account
					</h1>

					<p className='mt-2 text-gray-500'>
						Fill in your details to get started
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className='space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50'
				>
					<FormInput
						label='First Name'
						type='text'
						placeholder='Enter Your First Name'
						value={formData.firstName}
						error={errors.firstName}
						icon={<User size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								firstName: e.target.value,
							}))
						}
						required
					/>

					<FormInput
						label='Last Name'
						type='text'
						placeholder='Enter Your Last Name'
						value={formData.lastName}
						error={errors.lastName}
						icon={<User size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								lastName: e.target.value,
							}))
						}
						required
					/>

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
						label='Phone Number'
						type='text'
						placeholder='Enter Your phone number'
						value={formData.phoneNumber}
						error={errors.phoneNumber}
						icon={<Phone size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								phoneNumber: e.target.value,
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

					<FormInput
						label='Confirm Password'
						type='password'
						placeholder='Confirm Your password'
						value={formData.confirmPassword}
						error={errors.confirmPassword}
						icon={<Lock size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								confirmPassword: e.target.value,
							}))
						}
						required
					/>

					<FormInput
						label='City'
						type='text'
						placeholder='Enter Your city'
						value={formData.city}
						error={errors.city}
						icon={<MapPin size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								city: e.target.value,
							}))
						}
					/>

					<FormInput
						label='Address'
						type='text'
						placeholder='Enter Your address'
						value={formData.address}
						error={errors.address}
						icon={<House size={18} />}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								address: e.target.value,
							}))
						}
					/>

					<div className='text-right text-sm'>
						<Link
							href='/forgot-password'
							className='group relative inline-block font-semibold text-primary'
						>
							Forgot password?
							<span className='absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full' />
						</Link>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='group relative flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-[#58a78a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'
					>
						{loading ? 'Signing up...' : 'Sign up'}

						{!loading && (
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
						)}
					</button>
				</form>

				<div className='mt-8 text-center'>
					<p className='text-sm text-gray-600'>
						Already have an account?{' '}
						<Link
							href='/login'
							className='group relative inline-block font-bold text-primary'
						>
							Sign in
							<span className='absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full' />
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
