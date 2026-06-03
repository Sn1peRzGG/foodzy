import { Crown, ShieldAlert, UserIcon } from 'lucide-react'

export const ROLE_CONFIG: Record<
	string,
	{
		label: string
		bg: string
		nameColor: string
		icon: any
		hasBadge?: boolean
	}
> = {
	OWNER: {
		label: 'Owner',
		bg: 'bg-red-600 text-white border-red-700 shadow-xs',
		nameColor: 'text-red-600 font-black',
		icon: Crown,
		hasBadge: true,
	},
	ADMIN: {
		label: 'Admin',
		bg: 'bg-blue-600 text-white border-blue-700 shadow-xs',
		nameColor: 'text-blue-600 font-extrabold',
		icon: ShieldAlert,
		hasBadge: true,
	},
	USER: {
		label: 'Customer',
		bg: 'bg-slate-100 text-slate-700 border-slate-200 shadow-xs',
		nameColor: 'text-slate-800 font-bold',
		icon: UserIcon,
		hasBadge: false,
	},
}
