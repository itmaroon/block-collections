
import { __ } from '@wordpress/i18n';

import './editor.scss';


import { 
	useBlockProps,
	InnerBlocks,
	
} from '@wordpress/block-editor';




export default function Edit(props) {
	return (
		<>
			<div { ...useBlockProps() }>
				<InnerBlocks
					template={[
						['itmar/design-title',{}],
						['core/column',{className: 'image_text' },
							[
								['itmar/draggable-image', {}],
								['core/paragraph',{ placeholder: 'ブログ本文を入れてください' } ]
							]
						]
					]}
					templateLock="all"
				/>
			</div>
			
		</>
	);
}
