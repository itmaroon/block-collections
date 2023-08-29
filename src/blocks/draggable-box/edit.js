import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	PanelRow,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import './editor.scss';
import DraggableBox from '../DraggableBox';

export default function Edit(props) {
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			templateLock: false
		}
	);
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
					title={__("Moving distance", 'itmar_block_collections')}
					initialOpen={true}
				>
					<PanelRow
						className='distance_row'
					>
						<UnitControl
							dragDirection="e"
							onChange={(value) => chagePositionX(value)}
							label={__("Lateral direction", 'itmar_block_collections')}
							value={movePosition.x}
						/>
						<UnitControl
							dragDirection="e"
							onChange={(value) => chagePositionY(value)}
							label={__("Longitudinal direction", 'itmar_block_collections')}
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
							{__("Reset", 'itmar_block_collections')}
						</Button>
					</PanelRow>
				</PanelBody>

			</InspectorControls>
			<div {...useBlockProps(newStyle)}>
				<DraggableBox
					position={position}
					onPositionChange={(position) => setAttributes({ position: position })}
				>
					<div {...innerBlocksProps}></div>
				</DraggableBox>

			</div>
		</>
	);
}