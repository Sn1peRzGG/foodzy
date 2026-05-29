export default function Loading() {
	return (
		<div className='flex h-[50vh] w-full items-center justify-center'>
			<div className='relative flex items-center justify-center'>
				<div className='absolute size-16 rounded-full border-4 border-primary/20' />
				<div className='size-16 animate-spin rounded-full border-4 border-primary border-t-transparent' />
			</div>

			<span className='sr-only'>Loading...</span>
		</div>
	)
}
