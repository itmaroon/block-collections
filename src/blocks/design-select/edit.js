
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleSelect';
import { NomalSelect } from './initSelect';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';
import { useState, useEffect } from '@wordpress/element';
import { nanoid } from 'nanoid';

import {
	Button,
	PanelBody,
	PanelRow,
	Notice,
	Modal,
	RadioControl,
	TextControl,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
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
		selPattern,
		selectValues,
		folder_val,
		bgColor,
		optionColor,
		hoverBgColor,
		font_style_option,
		margin_value,
		padding_value,
		bgSelectColor,
		bgSelectGradient,
		radius_value,
		border_value,
		shadow_element,
		is_shadow,
		className,
	} = attributes;

	//背景色をブロックのルートにインラインでセット
	const blockProps = useBlockProps({ style: { backgroundColor: bgColor } });

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);


	// selPatternがtrueの場合、multiple属性を持つオブジェクトを返す
	const selectAttributes = selPattern === 'multi' ? { multiple: true } : {};

	//選択された要素のキー配列
	const [selectedValues, setSelectedValues] = useState([]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//選択要素のクリア
	useEffect(() => {
		setSelectedValues([]);
	}, [selPattern]);

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
		const id = nanoid(5);
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

	function renderContent() {
		return (
			<NomalSelect
				onOptionSelect={(selID) => {
					if (selectedValues.includes(selID)) {
						return; // 既に選択されている場合はそのまま
					}
					//複数選択のときは複数配列、単数選択の時は単数配列
					const newArray = selPattern === 'multi' ? [...selectedValues, selID] : [selID];
					setSelectedValues(newArray)
				}}
				onOptionDeselect={(selID) => {
					const newArray = selectedValues.filter(index => index !== selID);
					setSelectedValues(newArray);
				}}
			>
				<select
					class="nomal"
					{...selectAttributes}
					data-placeholder={folder_val}
				>
					{
						selectValues.map((option_item) => {
							return (<option id={option_item.id} className={option_item.classname} value={option_item.value} selected={selectedValues.includes(option_item.id)}>{option_item.label}</option>)
						})
					}
				</select>
			</NomalSelect>
		)
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={
					__("Select Element Settings", 'itmar_block_collections')
				}
					initialOpen={true}
					className="select_design_ctrl"
				>
					<label className="components-base-control__label">{__("Select Pattern", 'itmar_block_collections')}</label>
					<PanelRow className='itmar_select_row'>
						<RadioControl
							selected={selPattern}
							options={[
								{ label: __("Single Select", 'itmar_block_collections'), value: 'single' },
								{ label: __("Nulti Select", 'itmar_block_collections'), value: 'multi' },

							]}
							onChange={(changeOption) => { setAttributes({ selPattern: changeOption }); }
							}
						/>
					</PanelRow>

					<TextControl
						label={__("Place Folder Display", 'itmar_block_collections')}
						value={folder_val}
						onChange={(newVal) => setAttributes({ folder_val: newVal })}
					/>
					<PanelBody
						className={'itmar_notice_select_panel'}
						title={__("Option info Setting", 'itmar_block_collections')}
					>
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
								colorValue: bgColor,
								label: __("Choose Block Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ bgColor: newValue }),
							},
							{
								colorValue: bgSelectColor,
								gradientValue: bgSelectGradient,

								label: __("Choose Select Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setAttributes({ bgSelectColor: newValue === undefined ? '' : newValue });
								},
								onGradientChange: (newValue) => setAttributes({ bgSelectGradient: newValue }),
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
					<ToggleControl
						label={__('Is Shadow', 'itmar_block_collections')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
				</PanelBody>

				<PanelBody title={__("Option Style Settings", 'itmar_block_collections')} initialOpen={false} className="select_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_option}
						onChange={(newStyle) => {
							setAttributes({ font_style_option: newStyle })
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

			<div {...blockProps}>
				<StyleComp attributes={attributes} >
					{is_shadow ? (
						<ShadowStyle
							shadowStyle={{ ...shadow_element, backgroundColor: bgColor }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						>
							{renderContent()}
						</ShadowStyle>
					) : (
						renderContent()
					)}

				</StyleComp>
			</div >
		</>
	);
}
