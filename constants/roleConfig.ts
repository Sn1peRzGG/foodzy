import { Crown, ShieldCheck, UserIcon } from 'lucide-react'

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
		bg: 'bg-accent/10 text-accent border border-accent/20 shadow-xs',
		nameColor: 'text-accent font-black tracking-wide',
		icon: Crown,
		hasBadge: true,
	},
	ADMIN: {
		label: 'Admin',
		bg: 'bg-primary/10 text-primary border border-primary/20 shadow-xs',
		nameColor: 'text-primary font-extrabold tracking-wide',
		icon: ShieldCheck,
		hasBadge: true,
	},
	USER: {
		label: 'Customer',
		bg: 'bg-ui-hover text-text-muted border border-border-main shadow-xs',
		nameColor: 'text-text-main font-semibold',
		icon: UserIcon,
		hasBadge: false,
	},
}
