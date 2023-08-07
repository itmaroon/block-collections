
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes } = props
	const blockProps = useBlockProps();
	const { content } = attributes;
	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent })
	}
	return (
		<div {...blockProps}>
			<RichText
				tagName="p"
				onChange={onChangeContent}
				allowedFormats={['core/bold', 'core/italic', 'core/link']}
				value={content}
				placeholder={__('Write your text...')}
			/>
		</div>
	);
}
