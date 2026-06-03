import { UserRole } from '../types/user'

const ROLE_LEVELS: Record<UserRole, number> = {
	USER: 1,
	ADMIN: 2,
	OWNER: 3,
}

export function hasAccess(
	userRole: UserRole | undefined,
	requiredRole: UserRole,
): boolean {
	if (!userRole) return false

	return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole]
}
