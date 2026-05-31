'use client'

import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from 'react'

interface BreadcrumbsContextType {
	labels: Record<string, string>
	setLabel: (id: string, name: string) => void
}

export const BreadcrumbsContext = createContext<
	BreadcrumbsContextType | undefined
>(undefined)

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
	const [labels, setLabels] = useState<Record<string, string>>({})

	const setLabel = useCallback((id: string, name: string) => {
		setLabels(prev => {
			if (prev[id] === name) return prev
			return { ...prev, [id]: name }
		})
	}, [])

	return (
		<BreadcrumbsContext.Provider value={{ labels, setLabel }}>
			{children}
		</BreadcrumbsContext.Provider>
	)
}

export function useBreadcrumbs() {
	const context = useContext(BreadcrumbsContext)
	if (!context) {
		throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider')
	}
	return context
}
