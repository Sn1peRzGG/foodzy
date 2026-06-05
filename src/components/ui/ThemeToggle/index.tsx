'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div className='h-12 w-12' />
	}

	const isDark = resolvedTheme === 'dark'

	const toggleTheme = () => {
		const nextTheme = isDark ? 'light' : 'dark'

		setTheme(nextTheme)

		const maxAge = 31536000
		document.cookie = `theme=${nextTheme}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`
		document.cookie = `dark_theme=${String(nextTheme === 'dark')}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`
	}

	return (
		<button
			onClick={toggleTheme}
			className='order-1 group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-main/20'
			aria-label='Toggle theme'
		>
			{isDark ? (
				<Sun
					size={24}
					className='transition-transform duration-500 ease-in-out group-hover:rotate-45'
				/>
			) : (
				<Moon
					size={24}
					className='transition-transform duration-500 ease-in-out group-hover:-rotate-12'
				/>
			)}
		</button>
	)
}
