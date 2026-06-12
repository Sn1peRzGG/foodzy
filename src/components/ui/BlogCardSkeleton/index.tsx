'use client'

interface BlogCardSkeletonProps {
	viewMode?: 'grid' | 'list'
}

export default function BlogCardSkeleton({
	viewMode = 'grid',
}: BlogCardSkeletonProps) {
	const isList = viewMode === 'list'
	const commonClasses =
		'animate-pulse bg-card-bg border border-border-main rounded-xl overflow-hidden shadow-sm w-full min-w-0'
	const textPlaceholder = 'bg-ui-hover rounded'

	return (
		<div
			className={`${commonClasses} grid ${
				isList
					? 'grid-cols-1 md:grid-cols-[288px_1fr] h-auto md:h-52'
					: 'grid-cols-1'
			}`}
		>
			<div
				className={`w-full bg-ui-hover shrink-0 ${
					isList ? 'h-48 md:h-full' : 'aspect-16/10'
				}`}
			/>

			<div className='p-4 sm:p-5 grid grid-rows-[auto_1fr_auto] gap-1.5 min-w-0 w-full relative min-h-35 md:min-h-full'>
				<div className='flex flex-col gap-2 w-full min-w-0'>
					<div className='flex items-center gap-1.5'>
						<div className='w-3.5 h-3.5 rounded-full bg-ui-hover' />
						<div className={`h-3 w-24 ${textPlaceholder}`} />
					</div>

					<div className={`h-5 w-3/4 mt-1 ${textPlaceholder}`} />
				</div>

				<div className='w-full min-w-0 mt-2 space-y-1.5 pr-24'>
					<div className={`h-3.5 w-full ${textPlaceholder}`} />
					<div className={`h-3.5 w-5/6 ${textPlaceholder}`} />
				</div>

				<div className='absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex items-center gap-2 pl-2 p-1 rounded-xl border border-border-main/20 bg-card-bg/90 backdrop-blur-sm'>
					<div className='w-9 h-9 rounded-lg bg-ui-hover' />
					<div className='w-9 h-9 rounded-lg bg-ui-hover' />
				</div>
			</div>
		</div>
	)
}
