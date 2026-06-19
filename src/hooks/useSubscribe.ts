import { useMutation } from '@tanstack/react-query'
import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import api from '@/src/lib/api'

export function useSubscribe() {
	const [email, setEmail] = useState('')

	const { mutate, isPending } = useMutation({
		mutationFn: async (emailValue: string) => {
			const res = await api.post('/subscribers', { email: emailValue })
			return res.data
		},
		onSuccess: () => {
			toast.success('Subscribed successfully!')
			setEmail('')
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Something went wrong'
			toast.error(errorMessage)
		},
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!email.trim()) {
			toast.error('Please enter your email')
			return
		}

		mutate(email)
	}

	return {
		email,
		setEmail,
		handleSubmit,
		isPending,
	}
}
