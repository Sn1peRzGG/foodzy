import { Mail, MapPin, Phone } from 'lucide-react'

export interface ContactItem {
	icon: React.ComponentType<{ size?: number; color?: string }>
	label: string
}

export const contactData: ContactItem[] = [
	{
		icon: MapPin,
		label: '51 Green St.Huntington ohio beach ontario, NY 11746 KY 4783, USA.',
	},
	{ icon: Mail, label: 'example@email.com' },
	{ icon: Phone, label: '+1 (555) 123-4567' },
]

export const companyData: string[] = [
	'About Us',
	'Delivery Information',
	'Privacy Policy',
	'Terms & Conditions',
	'Contact Us',
	'Support Center',
]

export interface ImageItem {
	src: string
	alt: string
}

export const footerImageData: ImageItem[] = [
	{ src: '/product_1.jpg', alt: 'Product 1' },
	{ src: '/product_2.jpg', alt: 'Product 2' },
	{ src: '/product_3.jpg', alt: 'Product 3' },
	{ src: '/product_4.jpg', alt: 'Product 4' },
	{ src: '/product_5.jpg', alt: 'Product 5' },
]
