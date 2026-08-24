'use client'

interface BlogCardSkeletonProps {
	viewMode?: 'grid' | 'list'
}

export default function BlogCardSkeleton({
	viewMode = 'grid',
}: BlogCardSkeletonProps) {
	const isList = viewMode === 'list'
	const textPlaceholder = 'bg-ui-hover rounded animate-pulse'

	if (isList) {
		return (
			<div className='border border-border-main rounded-xl p-4 shadow-sm flex flex-row items-center gap-5 bg-card-bg min-w-0 w-full'>
				<div className='w-32 h-32 sm:w-40 sm:h-40 rounded-lg bg-ui-hover shrink-0 animate-pulse' />

				<div className='flex flex-col grow h-full py-0.5 min-w-0 justify-between'>
					<div className='min-w-0 w-full space-y-3'>
						<div className='flex items-center gap-3'>
							<div className={`h-3 w-20 ${textPlaceholder}`} />
							<div className={`h-3 w-24 ${textPlaceholder}`} />
						</div>
						<div className={`h-5 w-3/4 ${textPlaceholder}`} />
						<div className='space-y-1.5 max-w-xl'>
							<div className={`h-3.5 w-full ${textPlaceholder}`} />
							<div className={`h-3.5 w-5/6 ${textPlaceholder}`} />
						</div>
					</div>
					<div className='border-t border-border-main pt-3 mt-4 flex justify-end gap-2 w-full'>
						<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ui-hover animate-pulse' />
						<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ui-hover animate-pulse' />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='border border-border-main rounded-xl p-4 shadow-sm flex flex-col justify-between bg-card-bg min-w-0 w-full'>
			<div className='w-full aspect-square rounded-lg bg-ui-hover mb-4 animate-pulse' />

			<div className='flex flex-col grow min-w-0'>
				<div className='flex items-center gap-3 mb-2.5'>
					<div className={`h-3 w-20 ${textPlaceholder}`} />
					<div className={`h-3 w-24 ${textPlaceholder}`} />
				</div>

				<div className={`h-5 w-4/5 mb-3 ${textPlaceholder}`} />

				<div className='space-y-1.5 mb-5'>
					<div className={`h-3.5 w-full ${textPlaceholder}`} />
					<div className={`h-3.5 w-2/3 ${textPlaceholder}`} />
				</div>

				<div className='border-t border-border-main pt-3 mt-auto flex justify-end gap-2 w-full'>
					<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ui-hover animate-pulse' />
					<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ui-hover animate-pulse' />
				</div>
			</div>
		</div>
	)
}
