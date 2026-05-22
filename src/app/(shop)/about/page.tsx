import Image from 'next/image'

export default function AboutPage() {
	return (
		<div className='flex flex-col gap-10'>
			<div className='container-responsive flex flex-row gap-10'>
				<div className='flex flex-col'>
					<h2 className='text-[36px] font-bold text-[#212529]'>About Us</h2>
					<div className='flex flex-col mt-6 text-[#7A7A7A] gap-7'>
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

					<div className='bg-[#F7F7F8] border flex flex-row justify-between border-[#E9E9E9] px-3 py-6 rounded-[5px] mt-6'>
						<div className='font-bold flex flex-col py-1.5 px-12'>
							<span className='text-[#F53E32] text-[60px] text-center'>
								0.1<span className='text-[#7A7A7A] text-[30px]'>k</span>
							</span>
							<span className='text-[#212529] text-[16px] font-semibold text-center'>
								Vendors
							</span>
						</div>
						<div className='font-bold flex flex-col py-1.5 px-12'>
							<span className='text-[#F53E32] text-[60px] text-center'>
								23<span className='text-[#7A7A7A] text-[30px]'>k</span>
							</span>
							<span className='text-[#212529] text-[16px] font-semibold text-center'>
								Customers
							</span>
						</div>
						<div className='font-bold flex flex-col py-1.5 px-12'>
							<span className='text-[#F53E32] text-[60px] text-center'>
								2<span className='text-[#7A7A7A] text-[30px]'>k</span>
							</span>
							<span className='text-[#212529] text-[16px] font-semibold text-center'>
								Products
							</span>
						</div>
					</div>
				</div>

				<Image
					src={'/faq.jpg'}
					alt='About Us Image'
					width={600}
					height={400}
					className='rounded-[5px] aspect-auto pointer-events-none'
				/>
			</div>

			<div className='container-responsive w-full justify-between flex flex-row gap-6'>
				<div className='w-1/4 bg-[#F7F7F8] border border-[#E9E9E9] rounded-[5px] px-4 pb-4'>
					<h2 className='font-semibold text-[18px] text-[#2B2B2D]'>
						Product Packing
					</h2>
					<span>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas,
						perferendis dicta rem numquam nemo commodi laborum. Cumque non
						inventore unde corrupti asperiores fugiat eius? Ratione veniam
						incidunt dolor cumque at.
					</span>
				</div>
				<div className='w-1/4 bg-[#F7F7F8] border border-[#E9E9E9] rounded-[5px] px-4 pb-4'>
					<h2 className='font-semibold text-[18px] text-[#2B2B2D]'>
						Product Packing
					</h2>
					<span>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas,
						perferendis dicta rem numquam nemo commodi laborum. Cumque non
						inventore unde corrupti asperiores fugiat eius? Ratione veniam
						incidunt dolor cumque at.
					</span>
				</div>
				<div className='w-1/4 bg-[#F7F7F8] border border-[#E9E9E9] rounded-[5px] px-4 pb-4'>
					<h2 className='font-semibold text-[18px] text-[#2B2B2D]'>
						Product Packing
					</h2>
					<span>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas,
						perferendis dicta rem numquam nemo commodi laborum. Cumque non
						inventore unde corrupti asperiores fugiat eius? Ratione veniam
						incidunt dolor cumque at.
					</span>
				</div>
				<div className='w-1/4 bg-[#F7F7F8] border border-[#E9E9E9] rounded-[5px] px-4 pb-4'>
					<h2 className='font-semibold text-[18px] text-[#2B2B2D]'>
						Product Packing
					</h2>
					<span>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas,
						perferendis dicta rem numquam nemo commodi laborum. Cumque non
						inventore unde corrupti asperiores fugiat eius? Ratione veniam
						incidunt dolor cumque at.
					</span>
				</div>
			</div>
		</div>
	)
}
