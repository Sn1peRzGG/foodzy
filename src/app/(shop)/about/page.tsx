import Image from 'next/image'

export default function AboutPage() {
	return (
		<div className='flex flex-col gap-14 py-8 bg-main-bg min-h-screen'>
			<div className='container-responsive flex flex-col lg:flex-row gap-10 items-center lg:items-start'>
				<div className='flex flex-col flex-1'>
					<h2 className='text-[36px] font-bold text-text-main tracking-tight'>
						About Us
					</h2>
					<div className='flex flex-col mt-6 text-text-subtle gap-5 text-base leading-relaxed'>
						<span>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
							autem, expedita modi in reprehenderit consectetur, voluptatibus
							doloremque repellat fuga alias quisquam id quaerat, enim cumque
							hic vero beatae eum eveniet!
						</span>
						<span>
							Quia, aliquam! Hic, minus illum culpa at minima magni pariatur
							magnam! Harum eius a, aliquid inventore, dolore facere quisquam
							queryat fugit, veritatis eveniet amet! Quod porro expedita
							accusantium! Non, ab.
						</span>
						<span>
							Ullam molestias ipsam odit dolorum placeat nam alias ab atque,
							voluptatibus reprehenderit optio aliquam sunt ducimus doloremque
							qui quisquam quis eum. Unde, consequuntur! Sapiente tempore
							praesentium quasi sit. Iusto, laboriosam.
						</span>
					</div>

					<div className='bg-card-bg border flex flex-col sm:flex-row justify-between border-border-main p-6 rounded-xl mt-8 shadow-sm gap-6'>
						<div className='font-bold flex flex-col items-center flex-1 py-2'>
							<span className='text-accent text-[48px] sm:text-[60px] leading-none font-extrabold tracking-tight'>
								0.1
								<span className='text-text-subtle text-[24px] sm:text-[30px] font-medium'>
									k
								</span>
							</span>
							<span className='text-text-muted text-[14px] sm:text-[16px] font-semibold mt-2 uppercase tracking-wider'>
								Vendors
							</span>
						</div>
						<div className='font-bold flex flex-col items-center border-y sm:border-y-0 sm:border-x border-border-main/50 flex-1 py-2'>
							<span className='text-accent text-[48px] sm:text-[60px] leading-none font-extrabold tracking-tight'>
								23
								<span className='text-text-subtle text-[24px] sm:text-[30px] font-medium'>
									k
								</span>
							</span>
							<span className='text-text-main text-[14px] sm:text-[16px] font-semibold mt-2 uppercase tracking-wider'>
								Customers
							</span>
						</div>
						<div className='font-bold flex flex-col items-center flex-1 py-2'>
							<span className='text-accent text-[48px] sm:text-[60px] leading-none font-extrabold tracking-tight'>
								2
								<span className='text-text-subtle text-[24px] sm:text-[30px] font-medium'>
									k
								</span>
							</span>
							<span className='text-text-muted text-[14px] sm:text-[16px] font-semibold mt-2 uppercase tracking-wider'>
								Products
							</span>
						</div>
					</div>
				</div>

				<div className='flex-1 w-full max-w-150 lg:max-w-none'>
					<Image
						src={'/faq.jpg'}
						alt='About Us Image'
						width={600}
						height={400}
						className='rounded-xl w-full object-cover shadow-md pointer-events-none border border-border-main/30'
					/>
				</div>
			</div>

			<div className='container-responsive w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className='bg-card-bg border border-border-main rounded-xl p-6 shadow-sm hover:bg-main-bg/50 hover:border-border-main/80 transition-all duration-200 group flex flex-col gap-3'
					>
						<div className='flex items-center gap-3'>
							<div className='w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
								<span className='text-accent text-sm font-bold'>✓</span>
							</div>
							<h2 className='font-bold text-[18px] text-text-main tracking-tight group-hover:text-accent transition-colors'>
								Product Packing
							</h2>
						</div>
						<p className='text-sm text-text-subtle leading-relaxed mt-1'>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas,
							perferendis dicta rem numquam nemo commodi laborum. Cumque non
							inventore unde corrupti.
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
