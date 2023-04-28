
import { __ } from '@wordpress/i18n';

import './editor.scss';
import { useState, useEffect } from '@wordpress/element';
import { registerBlockStyle, unregisterBlockStyle  } from '@wordpress/blocks';
import metadata from './block.json';

import { 
	useBlockProps,
	InnerBlocks,
	RichText,
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	InspectorAdvancedControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink,
	Button
} from '@wordpress/components';


export default function Edit(props) {
	const {
		attributes,
		setAttributes,
	} = props;

	const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
	let blockProps = useBlockProps();
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

			if(viewportSize.width < 768){
				unregisterBlockStyle( metadata.name, 'left' );
				unregisterBlockStyle( metadata.name, 'right' );
				unregisterBlockStyle( metadata.name, 'float_left' );
				unregisterBlockStyle( metadata.name, 'float_right' );
				setAttributes({className: 'is-style-top'});
			}else{
				registerBlockStyle( metadata.name, {
					name: 'float_right',
					label: '画像を右フロート',	
				});
				registerBlockStyle( metadata.name, {
					name: 'float_left',
					label: '画像を左フロート',	
				});
				registerBlockStyle( metadata.name, {
					name: 'right',
					label: '画像を右',	
				});
				registerBlockStyle( metadata.name, {
					name: 'left',
					label: '画像を左',	
				});
			}
			
    };

    window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [viewportSize]);

	return (
		
		<>
			<p>Viewport width: {viewportSize.width}</p>
      <p>Viewport height: {viewportSize.height}</p>
			
			<div 
				{ ...blockProps }
				//className={attributes.className.replace('is-style-right', '')}
			>
				<InnerBlocks
					template={[
						['core/heading',{ placeholder: '小見出しを入れてください。' , level: 2}],
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
