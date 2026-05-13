import ConfigButton from '@/src/components/ui/ConfigButton'
import UserCard from '@/src/components/ui/UserCard'
import api from '@/src/lib/api'
import { UserType } from '@/src/types/user'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

async function getUser() {
	const cookieStore = await cookies()
	const token = cookieStore.get('jwt')?.value

	if (!token) return null

	try {
		const decoded: any = jwtDecode(token)

		const response = await api.get(`/users/${decoded.userId}`, {
			headers: { Cookie: `jwt=${token}` },
		})

		return response.data as UserType
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to load user profile. Please try again later.')
	}
}

export default async function AccountPage() {
	const user = await getUser()

	if (!user) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
				<h2 className='text-2xl font-bold'>You are not authorized.</h2>
				<p className='text-gray-500'>
					Please log in to your account to view the profile.
				</p>
			</div>
		)
	}

	return (
		<div className='flex flex-col w-full gap-6 md:gap-8 lg:gap-10 relative mt-6 px-4'>
			<div className='flex flex-col gap-2 md:gap-3 lg:gap-5'>
				<h2 className='text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-[#FF6868] tracking-[0.175em] uppercase'>
					User Profile
				</h2>
				<p className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-[1.315]'>
					Welcome back, {user.firstName}
				</p>
			</div>

			<UserCard user={user} />

			<ConfigButton role={user.role} />
		</div>
	)
}
