
import { useBlockProps, RichText  } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const blockProps=useBlockProps.save()
	const { 
		btnContent, 
		boxShadowStyle,
	} = attributes;
	

	return (
		<div { ...useBlockProps.save( boxShadowStyle ) }>
			<RichText.Content
					tagName="p"
					value={ btnContent }
					style={ { textAlign: "center" } }		
				/>
		</div>
	);
}
