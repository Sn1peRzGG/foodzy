import { prisma } from '@/prisma/prisma'
import Image from 'next/image'

export default async function AccountPage() {
	const user = await prisma.user.findFirst({
		where: {
			userId: 1,
		},
	})

	if (!user) {
		return <div>User not found</div>
	}

	return (
		<div>
			<div>
				<h1>User Profile</h1>
				<p>ID: {user.userId}</p>
				<p>Email: {user.email}</p>
				<p>Name: {user.firstName}</p>
				<Image
					src={user.avatarUrl}
					alt='Profile Picture'
					width={40}
					height={40}
					className='rounded-full'
				/>
			</div>
		</div>
	)
}
