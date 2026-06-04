import axios from 'axios'

export type FieldErrors = Record<string, string>

export function getFieldErrors(error: unknown): FieldErrors {
	if (!axios.isAxiosError(error)) return {}

	const errors = error.response?.data?.errors

	if (!errors) return {}

	const formatted: FieldErrors = {}

	Object.entries(errors).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			formatted[key] = value[0]
		}
	})

	return formatted
}
