import { __ } from "@wordpress/i18n";

import { StyleComp } from "./StyleSelect";
import { NomalSelect } from "./initSelect";
import { useStyleIframe } from "../iframeFooks";
//import ShadowStyle, { ShadowElm } from "../ShadowStyle";
import { useState, useEffect, useRef } from "@wordpress/element";
//import { useElementBackgroundColor, useIsIframeMobile } from "../CustomFooks";
import LabelBox from "../LabelBox ";
import { nanoid } from "nanoid";
import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
} from "itmar-block-packages";
import { TypographyControls } from "itmar-block-packages";

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
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import {
	useBlockProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import "./editor.scss";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "10px",
	left: "10px",
	right: "10px",
	bottom: "10px",
};

//ボーダーのリセットバリュー
const border_resetValues = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

export default function Edit({ attributes, setAttributes, context }) {
	const {
		inputName,
		selPattern,
		selectValues,
		selectedValues,
		folder_val,
		required,
		bgColor,
		optionColor,
		hoverBgColor,
		font_style_option,
		default_pos,
		mobile_pos,
		bgSelectColor,
		bgSelectGradient,
		radius_value,
		border_value,
		labelContent,
		labelWidth,
		labelVertAlign,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_element,
		shadow_result,
		is_shadow,
		className,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor }, //背景色をブロックのルートにインラインでセット
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({
				shadow_element: { ...shadow_element, baseColor: baseColor },
			});
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) {
				setAttributes({ shadow_result: new_shadow.style });
			}
		}
	}, [baseColor]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	// selPatternがtrueの場合、multiple属性を持つオブジェクトを返す
	const selectAttributes = selPattern === "multi" ? { multiple: true } : {};

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//親コンポーネントからのラベル幅の指定があればそれを採用して記録する
	const label_width = context["itmar/label_width"] || "auto";
	useEffect(() => {
		setAttributes({ labelWidth: label_width });
	}, [label_width]);

	//選択要素のクリア
	useEffect(() => {
		setAttributes({ selectedValues: [] });
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
		setSelectedOption((prevData) => ({ ...prevData, [key]: value }));
	};

	//オプション新規追加
	const handleOptionAddNew = () => {
		const id = nanoid(5);
		setSelectedOption({ id: id, value: "", label: "", classname: "" });
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
		const updatedValues = selectValues.filter((item) => item.id !== idToDelete);
		setAttributes({ selectValues: updatedValues });
	};

	//オプション値の保存
	const handleOptionSave = () => {
		if (
			selectedOption &&
			selectValues.some((item) => item.id === selectedOption.id)
		) {
			// Update existing item
			const updatedValues = selectValues.map((item) => {
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

		closeModal();
	};

	function renderContent() {
		return (
			<>
				<NomalSelect
					onOptionSelect={(selID) => {
						if (selID == undefined) {
							//undefinedのときは設定を解除
							setAttributes({ selectedValues: [] });
							return;
						}
						if (selectedValues.includes(selID)) {
							return; // 既に選択されている場合はそのまま
						}
						//複数選択のときは複数配列、単数選択の時は単数配列
						const newArray =
							selPattern === "multi" ? [...selectedValues, selID] : [selID];
						setAttributes({ selectedValues: newArray });
					}}
					onOptionDeselect={(selID) => {
						const newArray = selectedValues.filter((index) => index !== selID);
						setAttributes({ selectedValues: newArray });
					}}
				>
					<select
						class="nomal"
						{...selectAttributes}
						name={inputName}
						data-placeholder={folder_val}
					>
						{selPattern === "single" && (
							<option value="">
								{__("Please Select.", "block-collections")}
							</option>
						)}
						{selectValues.map((option_item) => {
							return (
								<option
									id={option_item.id}
									className={option_item.classname}
									value={option_item.value}
									selected={selectedValues.includes(option_item.id)}
								>
									{option_item.label}
								</option>
							);
						})}
					</select>
				</NomalSelect>

				<LabelBox
					attributes={{
						required,
						labelContent,
						font_style_label,
						bgColor_label,
						bgGradient_label,
						textColor_label,
						radius_label,
						border_label,
						padding_label,
						labelSpace,
						labelWidth,
						labelVertAlign,
						shadow_result,
						is_shadow,
						isMobile,
						className,
					}}
					setAttributes={setAttributes}
				/>
			</>
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Select Element Settings", "block-collections")}
					initialOpen={true}
					className="select_design_ctrl"
				>
					<PanelRow>
						<TextControl
							label={__("name attribute name", "block-collections")}
							value={inputName}
							onChange={(newVal) => setAttributes({ inputName: newVal })}
						/>
					</PanelRow>
					<label className="components-base-control__label">
						{__("Select Pattern", "block-collections")}
					</label>
					<PanelRow className="itmar_select_row">
						<RadioControl
							selected={selPattern}
							options={[
								{
									label: __("Single Select", "block-collections"),
									value: "single",
								},
								{
									label: __("Nulti Select", "block-collections"),
									value: "multi",
								},
							]}
							onChange={(changeOption) => {
								setAttributes({ selPattern: changeOption });
							}}
						/>
					</PanelRow>

					<TextControl
						label={__("Place Folder Display", "block-collections")}
						value={folder_val}
						onChange={(newVal) => setAttributes({ folder_val: newVal })}
					/>
					<PanelBody
						className={"itmar_notice_select_panel"}
						title={__("Option info Setting", "block-collections")}
					>
						<Button
							label={__("add", "block-collections")}
							icon={"insert"}
							onClick={handleOptionAddNew}
						/>
						{selectValues.map((item) => (
							<Notice
								key={item.id}
								status="info"
								onRemove={() => openDeleteModal(item)}
							>
								<span onClick={() => handleNoticeClick(item)}>
									{item.label}
								</span>
							</Notice>
						))}
					</PanelBody>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="select_design_ctrl"
				>
					<PanelColorGradientSettings
						title={__("Background Color Setting", "block-collections")}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor: newValue }),
							},
							{
								colorValue: bgSelectColor,
								gradientValue: bgSelectGradient,

								label: __(
									"Choose Select Background color",
									"block-collections"
								),
								onColorChange: (newValue) => {
									setAttributes({
										bgSelectColor: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ bgSelectGradient: newValue }),
							},
						]}
					/>
					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.margin_value : mobile_pos.margin_value
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, margin_value: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, margin_value: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "block-collections")
								: __("Padding settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.padding_value : mobile_pos.padding_value
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, padding_value: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, padding_value: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<PanelBody
						title={__("Border Settings", "block-collections")}
						initialOpen={false}
						className="border_design_ctrl"
					>
						<BorderBoxControl
							colors={[
								{ color: "#72aee6" },
								{ color: "#000" },
								{ color: "#fff" },
							]}
							onChange={(newValue) => setAttributes({ border_value: newValue })}
							value={border_value}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_value}
							onChange={(newBrVal) =>
								setAttributes({
									radius_value:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								})
							}
						/>
					</PanelBody>
					<ToggleControl
						label={__("Is Shadow", "block-collections")}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal });
						}}
					/>
					{is_shadow && (
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState });
							}}
						/>
					)}
				</PanelBody>

				<PanelBody
					title={__("Option Style Settings", "block-collections")}
					initialOpen={false}
					className="select_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_option}
						onChange={(newStyle) => {
							setAttributes({ font_style_option: newStyle });
						}}
						isMobile={isMobile}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Option Color Setting", "block-collections")}
						settings={[
							{
								colorValue: optionColor,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ optionColor: newValue }),
							},
							{
								colorValue: hoverBgColor,
								label: __(
									"Choose Background color on mouse hover",
									"block-collections"
								),
								onColorChange: (newValue) =>
									setAttributes({ hoverBgColor: newValue }),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			{isModalOpen && (
				<Modal
					title={__("Option Info Edit", "block-collections")}
					onRequestClose={closeModal}
				>
					<TextControl
						label={__("Display Label", "block-collections")}
						value={selectedOption.label}
						onChange={(newVal) => handleOptionChange("label", newVal)}
					/>
					<TextControl
						label={__("Option Value", "block-collections")}
						value={selectedOption.value}
						onChange={(newVal) => handleOptionChange("value", newVal)}
					/>
					<TextControl
						label={__("Class Name", "block-collections")}
						value={selectedOption.classname}
						onChange={(newVal) => handleOptionChange("classname", newVal)}
					/>
					<Button variant="primary" onClick={handleOptionSave}>
						{__("Save Changes", "block-collections")}
					</Button>
				</Modal>
			)}

			{isDeleteModalOpen && (
				<Modal
					title={__("Confirm Deletion", "block-collections")}
					onRequestClose={closeDeleteModal}
				>
					<p>
						{__(
							"Are you sure you want to delete this item?",
							"block-collections"
						)}
					</p>
					<Button variant="primary" onClick={confirmDelete}>
						{__("Yes, Delete", "block-collections")}
					</Button>
					<Button variant="secondary" onClick={closeDeleteModal}>
						{__("Cancel", "block-collections")}
					</Button>
				</Modal>
			)}

			<div {...blockProps}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>
		</>
	);
}
