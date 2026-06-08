const FORBIDDEN_WORDS = [
	'http://',
	'https://',
	'www.',
	'.com',
	'.org',
	'.net',
	'.edu',
	'free',
	'scam',
	'crypto',
	'bitcoin',
	'promocode',
	'promo code',
	'discount code',
	'coupon',
	'cashback',
	'cash back',
	'buy here',
	'click here',
	'cure',
	'heal disease',
	'miracle drug',
	'lose weight fast',
	'weight loss pill',
]

export function checkForbiddenWords(text: string): string[] {
	const trimmed = text.trim()
	if (!trimmed) return []

	const lowerText = trimmed.toLowerCase()

	const normalizedText = lowerText
		.replace(/[@4]/g, 'a')
		.replace(/[\$5]/g, 's')
		.replace(/0/g, 'o')
		.replace(/1/g, 'i')
		.replace(/[^a-z0-9\s]/g, ' ')

	const wordsInReview = normalizedText.split(/\s+/)

	return FORBIDDEN_WORDS.filter(word => {
		if (word.includes('.') || word.includes('://') || word.includes(' ')) {
			return lowerText.includes(word)
		}

		const pattern = word.split('').join('+[^a-z0-9]*')
		const fuzzyRegex = new RegExp(`\\b${pattern}\\b`, 'i')

		if (fuzzyRegex.test(lowerText)) return true

		return wordsInReview.some(userWord => {
			if (userWord === word) return true

			if (
				Math.abs(userWord.length - word.length) <= 1 &&
				userWord.length >= 4
			) {
				let matches = 0
				for (const char of word) {
					if (userWord.includes(char)) matches++
				}
				return matches / word.length >= 0.85
			}
			return false
		})
	})
}
