import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
    dateI18n,    // 日付をフォーマットし、サイトのロケールに変換
    format,      // 日付のフォーマット
    __experimentalGetSettings   // WordPress の一般設定の日付フォーマットにする
} from '@wordpress/date';

import { 
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	Disabled,
	PanelBody,
	PanelRow,
	QueryControls,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const { serverSideRender: ServerSideRender } = wp;

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	const {
		numberOfItems,
		displayDate,
		displayThumbnail
	} = attributes;

	const posts = useSelect(
		( select ) => {
				return select( 'core' ).getEntityRecords( 'postType', 'post', {
						'per_page': numberOfItems,
						'_embed': true
				});
		},
		[ numberOfItems ]
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content Settings', 'block-location' ) }>
					<PanelRow>
						<QueryControls
							numberOfItems={ numberOfItems }
							onNumberOfItemsChange={ ( value ) =>
								setAttributes( { numberOfItems: value } )
							}
							minItems={ 1 }
							maxItems={ 10 }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Featured Image', 'block-location' ) }
							checked={ displayThumbnail }
							onChange={ () =>
								setAttributes( { displayThumbnail: !displayThumbnail } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
								label={ __( 'Show Date', 'block-location' ) }
								checked={ displayDate }
								onChange={ () =>
									setAttributes( { displayDate: !displayDate } )
								}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<Disabled>
					<ServerSideRender
							block='itmar/pickup-posts'
							attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
		
	);
}
