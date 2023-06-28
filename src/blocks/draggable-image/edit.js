import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	PanelRow,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import './editor.scss';
import DraggableBox from '../DraggableBox';

export default function Edit(props) {
	//ブロック属性の読み込み
	const {
		attributes,
		setAttributes
	} = props;

	const {
		position,
		unit_x,
		unit_y
	} = attributes;

	//インスペクター内のコントロールからの操作
	//横移動
	const chagePositionX = (value) => {
		if (value === "") {
			const newPos = { ...position, x: 0 }
			setAttributes({ position: newPos });
		} else {
			const unit_value = value.match(/(-*[0-9]+)([^0-9]+)/);
			const newPos = { ...position, x: parseInt(unit_value[1]) };
			setAttributes({ position: newPos });
			setAttributes({ unit_x: unit_value[2] });
		}
	}
	//縦移動
	const chagePositionY = (value) => {
		if (value === "") {
			const newPos = { ...position, y: 0 }
			setAttributes({ position: newPos });
		} else {
			const unit_value = value.match(/(-*[0-9]+)([^0-9]+)/);
			const newPos = { ...position, y: parseInt(unit_value[1]) };
			setAttributes({ position: newPos });
			setAttributes({ unit_y: unit_value[2] });
		}
	}
	//リセット
	const resetPos = () => {
		const newPos = { "x": 0, "y": 0 };
		setAttributes({ position: newPos });
		setAttributes({ unit_x: 'px', unit_y: 'px' });
	}

	//移動後の位置
	const movePosition = { x: `${position.x}${unit_x}`, y: `${position.y}${unit_y}` }

	const newStyle = {
		style: {
			width: 'fit-content',
			height: 'fit-content',
			// left: position.x,
			transform: `translate(${position.x}${unit_x}, ${position.y}${unit_y})`
		}
	}

	return (
		<>
			<InspectorControls >
				<PanelBody
					title={__('移動距離', 'cb_location')}
					initialOpen={true}
				>
					<PanelRow
						className='distance_row'
					>
						<UnitControl
							dragDirection="e"
							onChange={(value) => chagePositionX(value)}
							label='横方向'
							value={movePosition.x}
						/>
						<UnitControl
							dragDirection="e"
							onChange={(value) => chagePositionY(value)}
							label='縦方向'
							value={movePosition.y}
						/>
					</PanelRow>
					<PanelRow
						className='reset_row'
					>
						<Button
							variant="secondary"
							onClick={() => resetPos()}
						>
							リセット
						</Button>
					</PanelRow>
				</PanelBody>

			</InspectorControls>
			<div {...useBlockProps(newStyle)}>
				<DraggableBox
					position={position}
					onPositionChange={(position) => setAttributes({ position: position })}
				>
					<InnerBlocks
						template={[
							['core/image', {}],
						]}
						templateLock="all"
					/>
				</DraggableBox>

			</div>
		</>
	);
}