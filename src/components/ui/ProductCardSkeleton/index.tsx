'use client'

interface ProductCardSkeletonProps {
	viewMode: 'grid' | 'list'
}

export default function ProductCardSkeleton({
	viewMode,
}: ProductCardSkeletonProps) {
	const commonClasses =
		'animate-pulse bg-card-bg border border-border-main rounded-xl p-4 shadow-sm'
	const textPlaceholder = 'bg-ui-hover rounded'

	if (viewMode === 'list') {
		return (
			<div
				className={`relative flex flex-row items-center gap-5 ${commonClasses}`}
			>
				<div className='w-32 h-32 sm:w-40 sm:h-40 bg-ui-hover rounded-lg overflow-hidden relative shrink-0 z-10' />

				<div className='flex flex-col grow h-full py-1 gap-2'>
					<div className='flex items-center justify-between gap-2'>
						<div className={`h-4 w-28 ${textPlaceholder}`} />
						<div className={`h-4 w-12 ${textPlaceholder}`} />
					</div>

					<div className={`h-6 w-3/4 mt-1 ${textPlaceholder}`} />

					<div className='space-y-1 mt-1'>
						<div className={`h-3 w-full ${textPlaceholder}`} />
						<div className={`h-3 w-5/6 ${textPlaceholder}`} />
					</div>

					<div className='flex items-center justify-between border-t border-border-main pt-3 mt-auto'>
						<div className={`h-7 w-20 ${textPlaceholder}`} />
						<div className='flex gap-2'>
							<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ui-hover' />
							<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ui-hover' />
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`relative flex flex-col justify-between ${commonClasses}`}>
			<div className='w-full aspect-square bg-ui-hover rounded-lg mb-4' />

			<div className='flex items-center justify-between gap-2 mb-2'>
				<div className={`h-4 w-24 ${textPlaceholder}`} />
				<div className={`h-4 w-10 ${textPlaceholder}`} />
			</div>

			<div className={`h-5 w-11/12 mb-2 ${textPlaceholder}`} />

			<div className='space-y-1.5 mb-4'>
				<div className={`h-3.5 w-full ${textPlaceholder}`} />
				<div className={`h-3.5 w-4/5 ${textPlaceholder}`} />
			</div>

			<div className='flex items-center justify-between border-t border-border-main pt-3 mt-auto'>
				<div className={`h-7 w-20 ${textPlaceholder}`} />
				<div className='flex gap-2'>
					<div className='w-10 h-10 rounded-lg bg-ui-hover' />
					<div className='w-10 h-10 rounded-lg bg-ui-hover' />
				</div>
			</div>
		</div>
	)
}
