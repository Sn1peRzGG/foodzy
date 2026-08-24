export function formatDate(dateInput: string | Date | number): string {
	if (!dateInput) return ''

	return new Date(dateInput).toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
}
