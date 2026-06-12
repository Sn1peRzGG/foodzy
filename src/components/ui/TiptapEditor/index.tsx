'use client'

import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'isomorphic-dompurify'
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Heading1,
	Heading2,
	Italic,
	List,
	ListOrdered,
	Palette,
	Strikethrough,
	Underline as UnderlineIcon,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

interface TiptapEditorProps {
	label: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
	error?: string
}

const SANITIZE_CONFIG = {
	ALLOWED_TAGS: [
		'p',
		'br',
		'strong',
		'em',
		'u',
		's',
		'h1',
		'h2',
		'ul',
		'ol',
		'li',
		'span',
	],
	ALLOWED_ATTR: ['style'],
}

const TEXT_COLORS = [
	{ label: 'Default', value: 'inherit' },
	{ label: 'Primary', value: 'var(--color-primary)' },
	{ label: 'Accent', value: 'var(--color-accent)' },
	{ label: 'Muted', value: 'var(--color-text-muted)' },
	{ label: 'Gold', value: 'var(--color-brand-gold)' },
]

export default function TiptapEditor({
	label,
	value,
	onChange,
	placeholder = 'Write something...',
	error,
}: TiptapEditorProps) {
	const isUpdatingRef = useRef(false)

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2],
				},
			}),
			Underline,
			TextStyle,
			Color,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Placeholder.configure({
				placeholder,
				emptyEditorClass:
					'before:text-text-subtle before:content-[attr(data-placeholder)] before:float-left before:pointer-events-none before:h-0 text-sm font-medium',
			}),
		],
		content: DOMPurify.sanitize(value || '<p></p>', SANITIZE_CONFIG),
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					'tiptap-editor-content w-full min-h-[150px] max-h-[300px] overflow-y-auto px-4 py-3 text-text-main outline-none text-sm font-medium prose prose-sm max-w-none',
			},
		},
		onUpdate: ({ editor }) => {
			isUpdatingRef.current = true
			onChange(editor.getHTML())
			setTimeout(() => {
				isUpdatingRef.current = false
			}, 0)
		},
	})

	useEffect(() => {
		if (!editor) return
		if (isUpdatingRef.current) return

		const currentHTML = editor.getHTML()
		const sanitizedIncomingValue = DOMPurify.sanitize(
			value || '<p></p>',
			SANITIZE_CONFIG,
		)

		if (sanitizedIncomingValue !== currentHTML) {
			editor.commands.setContent(sanitizedIncomingValue, { emitUpdate: false })
			editor.view.dispatch(editor.view.state.tr)
		}
	}, [value, editor])

	if (!editor) return null

	const currentAttributes = editor.getAttributes('textStyle')
	const activeColor = TEXT_COLORS.find(
		color =>
			color.value !== 'inherit' && currentAttributes.color === color.value,
	)

	return (
		<div className='w-full space-y-1 text-left group/editor'>
			<label className='ml-0.5 text-xs font-semibold text-text-muted uppercase tracking-wider'>
				{label}
			</label>

			<div
				className={[
					'flex flex-col w-full bg-card-bg rounded-xl border transition-all duration-200 overflow-hidden',
					error
						? 'border-red-400 focus-within:ring-4 focus-within:ring-red-50'
						: 'border-border-main focus-within:border-primary focus-within:ring-4 focus-within:ring-[#64B496]/15',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<div className='flex flex-wrap items-center gap-1 p-1.5 bg-card-bg border-b border-border-main select-none shrink-0'>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('bold')
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<Bold size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('italic')
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<Italic size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('underline')
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<UnderlineIcon size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('strike')
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<Strikethrough size={16} />
					</button>

					<div className='w-px h-4 bg-border-main mx-1' />

					<button
						type='button'
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('heading', { level: 1 })
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<Heading1 size={16} />
					</button>
					<button
						type='button'
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('heading', { level: 2 })
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<Heading2 size={16} />
					</button>

					<div className='w-px h-4 bg-border-main mx-1' />

					<button
						type='button'
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('bulletList')
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<List size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive('orderedList')
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<ListOrdered size={16} />
					</button>

					<div className='w-px h-4 bg-border-main mx-1' />

					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('left').run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive({ textAlign: 'left' })
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<AlignLeft size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('center').run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive({ textAlign: 'center' })
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<AlignCenter size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('right').run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive({ textAlign: 'right' })
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<AlignRight size={16} />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('justify').run()}
						className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
							editor.isActive({ textAlign: 'justify' })
								? 'bg-primary/10 text-primary font-semibold'
								: 'text-text-subtle hover:text-text-main hover:bg-main-bg'
						}`}
					>
						<AlignJustify size={16} />
					</button>

					<div className='w-px h-4 bg-border-main mx-1' />

					<div className='relative group/colors'>
						<div
							className='p-1.5 rounded-lg text-text-subtle hover:bg-main-bg cursor-pointer transition-colors flex items-center gap-1'
							style={{ color: activeColor ? activeColor.value : undefined }}
						>
							<Palette
								size={16}
								className={activeColor ? 'scale-110 drop-shadow-sm' : ''}
							/>
						</div>
						<div className='absolute left-0 top-full pt-2 hidden group-hover/colors:flex flex-col gap-0.5 p-1 bg-card-bg border border-border-main rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-100 min-w-25 before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-[""]'>
							{TEXT_COLORS.map(color => (
								<button
									key={color.label}
									type='button'
									onClick={() => {
										if (color.value === 'inherit') {
											editor.chain().focus().unsetColor().run()
										} else {
											editor.chain().focus().setColor(color.value).run()
										}
									}}
									className={`w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-ui-hover transition-colors cursor-pointer flex items-center justify-between ${
										(color.value === 'inherit' && !activeColor) ||
										activeColor?.value === color.value
											? 'bg-main-bg font-bold'
											: 'text-text-muted hover:text-text-main'
									}`}
									style={{
										color: color.value !== 'inherit' ? color.value : undefined,
									}}
								>
									{color.label}
									{((color.value === 'inherit' && !activeColor) ||
										activeColor?.value === color.value) && (
										<span className='w-1.5 h-1.5 rounded-full bg-current' />
									)}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className='relative w-full grow'>
					<EditorContent editor={editor} />
				</div>
			</div>

			{error && (
				<p className='ml-1 mt-1 text-xs font-medium text-red-500'>{error}</p>
			)}
		</div>
	)
}
