
import { useBlockProps } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const {
		labelContent,
		className
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<label class="fit-label">
				{labelContent}
				<input type="email" name="email" className="contact_text" />
			</label>
		</div>
	);
}
