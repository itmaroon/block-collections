
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleSelect';
import { NomalSelect } from './initSelect';
import { useStyleIframe } from '../iframeFooks';
import { useState } from '@wordpress/element';
import { nanoid } from 'nano-id';

import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	Notice,
	Modal,
	ToggleControl,
	RangeControl,
	RadioControl,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';
import {
	useBlockProps,
	RichText,
	BlockAlignmentControl,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import './editor.scss';

//スペースのリセットバリュー
const padding_resetValues = {
	top: '10px',
	left: '10px',
	right: '10px',
	bottom: '10px',
}

//ボーダーのリセットバリュー
const border_resetValues = {
	top: '0px',
	left: '0px',
	right: '0px',
	bottom: '0px',
}

const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
];

export default function Edit({ attributes, setAttributes }) {
	const {
		selectValues,
		folder_val,
		optionColor,
		hoverBgColor,
		font_style_option,
		margin_value,
		padding_value,
		backgroundColor,
		backgroundGradient,
		radius_value,
		border_value,
		className,
	} = attributes;

	//選択された要素のキー配列
	const [selectedValues, setSelectedValues] = useState([]);

	//オプション要素の情報編集モーダルの操作
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [optionToDelete, setOptionToDelete] = useState(null);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const openDeleteModal = (item) => {
		setOptionToDelete(item);
		setIsDeleteModalOpen(true);
	};
	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setOptionToDelete(null);
	};
	const confirmDelete = () => {
		if (optionToDelete) {
			handleOptionDelete(optionToDelete.id);
		}
		closeDeleteModal();
	};
	//オプション値の編集ハンドラ
	const handleOptionChange = (key, value) => {
		setSelectedOption(prevData => ({ ...prevData, [key]: value }));
	};

	//オプション新規追加
	const handleOptionAddNew = () => {
		const id = nanoid(10);
		setSelectedOption({ id: id, value: '', label: '', classname: '' });
		openModal();
	};
	//オプションの更新
	const handleNoticeClick = (item) => {
		setSelectedOption(item);
		openModal();
	};

	// オプション要素の削除
	const handleOptionDelete = (idToDelete) => {
		// IDをもとに該当する要素を削除
		const updatedValues = selectValues.filter(item => item.id !== idToDelete);
		setAttributes({ selectValues: updatedValues });
	};

	//オプション値の保存
	const handleOptionSave = () => {
		if (selectedOption && selectValues.some(item => item.id === selectedOption.id)) {
			// Update existing item
			const updatedValues = selectValues.map(item => {
				if (item.id === selectedOption.id) {
					return selectedOption;
				}
				return item;
			});
			setAttributes({ selectValues: updatedValues });
		} else {
			// Add new item
			setAttributes({ selectValues: [...selectValues, selectedOption] });
		}

		closeModal()
	};

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={
					__("Select Element Settings", 'itmar_block_collections')
				}
					initialOpen={true}
					className="select_design_ctrl"
				>
					<TextControl
						label={__("Place Folder Display", 'itmar_block_collections')}
						value={folder_val}
						onChange={(newVal) => setAttributes({ folder_val: newVal })}
					/>
					<PanelBody title={__("Option info Setting", 'itmar_block_collections')}>
						<Button
							label={__('add', 'itmar_block_collections')}
							icon={"insert"}
							onClick={handleOptionAddNew}
						/>
						{selectValues.map((item) => (
							<Notice
								key={item.id}
								status="info"
								onRemove={() => openDeleteModal(item)}
							>
								<span onClick={() => handleNoticeClick(item)}>{item.label}</span>
							</Notice>
						))}
					</PanelBody>

				</PanelBody>

			</InspectorControls>

			<InspectorControls group="styles">

				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="select_design_ctrl">
					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: backgroundColor,
								gradientValue: backgroundGradient,

								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ backgroundColor: newValue }),
								onGradientChange: (newValue) => setAttributes({ backgroundGradient: newValue }),
							},
						]}
					/>
					<BoxControl
						label={__("Margin Setting", 'itmar_block_collections')}
						values={margin_value}
						onChange={value => setAttributes({ margin_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_value}
						onChange={value => setAttributes({ padding_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl
							colors={[{ color: '#72aee6' }, { color: '#000' }, { color: '#fff' }]}
							onChange={(newValue) => setAttributes({ border_value: newValue })}
							value={border_value}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_value}
							onChange={(newBrVal) =>
								setAttributes({ radius_value: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>
				</PanelBody>

				<PanelBody title={__("Option Style Settings", 'itmar_block_collections')} initialOpen={false} className="select_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_option}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Option Color Setting", 'itmar_block_collections')}
						settings={[{
							colorValue: optionColor,
							label: __("Choose Text color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ optionColor: newValue }),
						},
						{
							colorValue: hoverBgColor,
							label: __("Choose Background color on mouse hover", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ hoverBgColor: newValue }),
						},
						]}
					/>


				</PanelBody>
			</InspectorControls>

			{isModalOpen && (
				<Modal
					title={__("Option Info Edit", 'itmar_block_collections')}
					onRequestClose={closeModal}
				>
					<TextControl
						label={__("Display Label", 'itmar_block_collections')}
						value={selectedOption.label}
						onChange={(newVal) => handleOptionChange('label', newVal)}
					/>
					<TextControl
						label={__("Option Value", 'itmar_block_collections')}
						value={selectedOption.value}
						onChange={(newVal) => handleOptionChange('value', newVal)}
					/>
					<TextControl
						label={__("Class Name", 'itmar_block_collections')}
						value={selectedOption.classname}
						onChange={(newVal) => handleOptionChange('classname', newVal)}
					/>
					<Button variant="primary" onClick={handleOptionSave}>
						{__("Save Changes", 'itmar_block_collections')}
					</Button>
				</Modal>
			)}

			{isDeleteModalOpen && (
				<Modal
					title={__("Confirm Deletion", 'itmar_block_collections')}
					onRequestClose={closeDeleteModal}
				>
					<p>{__("Are you sure you want to delete this item?", 'itmar_block_collections')}</p>
					<Button variant="primary" onClick={confirmDelete}>{__("Yes, Delete", 'itmar_block_collections')}</Button>
					<Button variant="secondary" onClick={closeDeleteModal}>{__("Cancel", 'itmar_block_collections')}</Button>
				</Modal>
			)}

			<div {...useBlockProps()}>
				<StyleComp attributes={attributes} >
					<NomalSelect
						onOptionSelect={(selIndex) => {
							if (selectedValues.includes(selIndex)) {
								return; // 既に選択されている場合はそのまま
							}
							const newArray = [...selectedValues, selIndex]
							setSelectedValues(newArray)
						}}
						onOptionDeselect={(selIndex) => {
							const newArray = selectedValues.filter(index => index !== selIndex);
							setSelectedValues(newArray);
						}}
					>
						<select name="category" class="nomal" multiple data-placeholder={folder_val}>
							{
								selectValues.map((option_item, index) => {
									return (<option id={option_item.id} className={option_item.classname} value={option_item.value} selected={selectedValues.includes(index)}>{option_item.label}</option>)
								})
							}
						</select>
					</NomalSelect>
				</StyleComp>
			</div >
		</>
	);
}
