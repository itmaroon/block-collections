/**
 * コアブロックカスタマイズ高階コンポーネント
 *
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
	InspectorControls,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	RadioControl,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";

import { borderProperty } from "itmar-block-packages";

// カスタマイズ対象とするブロック
const allowedBlocks = [
	"core/paragraph",
	"core/list",
	"core/image",
	"core/quote",
	"core/table",
];

//block登録フック（カスタム属性の追加）
function addExSettings(settings, name) {
	if (allowedBlocks.includes(name)) {
		let newAttributes = {};
		let newStyles = [];

		newAttributes = {
			margin_val: {
				type: "object",
				default: {
					top: "1em",
					left: "1em",
					bottom: "1em",
					right: "1em",
				},
			},
			padding_val: {
				type: "object",
				default: {
					top: "1em",
					left: "1em",
					bottom: "1em",
					right: "1em",
				},
			},
		};

		if (name === "core/image") {
			newAttributes = {
				...newAttributes,
				scaleWidth: {
					type: "string",
					default: "100%",
				},
				scaleHeight: {
					type: "string",
					default: "100%",
				},
				isFitScale: {
					type: "boolean",
					default: false,
				},
			};
		}

		if (
			name === "core/paragraph" ||
			name === "core/list" ||
			name === "core/quote"
		) {
			newAttributes = {
				...newAttributes,
				lineHeight: {
					type: "number",
					default: 1.6,
				},
			};
		}

		if (
			name === "core/list" ||
			name === "core/quote" ||
			name === "core/table"
		) {
			newAttributes = {
				...newAttributes,
				radius_list: {
					type: "object",
					default: {
						topLeft: "0px",
						topRight: "0px",
						bottomRight: "0px",
						bottomLeft: "0px",
						value: "0px",
					},
				},
				border_list: {
					type: "object",
				},
			};
		}

		if (name === "core/list") {
			newAttributes = {
				...newAttributes,
				list_type: {
					type: "string",
					default: "UL",
				},
			};
		}

		if (name === "core/table") {
			newStyles = [
				...(settings.styles || []), // 既存のスタイルを保持
				{
					name: "gradient",
					label: __("Gradient", "block-collections"),
					isDefault: false,
				},
			];
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				...newAttributes,
			},
			styles: newStyles.length ? newStyles : settings.styles, // 新しいスタイルがある場合にのみ上書き
		};
	}

	//その他のブロック
	return settings;
}

addFilter(
	"blocks.registerBlockType",
	"itmar-ex-block/add-setting",
	addExSettings,
);

//BlockEditカスタムフック（インスペクターの追加）
const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
	//スペースのリセットバリュー
	const padding_resetValues = {
		top: "1em",
		left: "1em",
		right: "1em",
		bottom: "1em",
	};

	const units = [
		{ value: "px", label: "px" },
		{ value: "em", label: "em" },
		{ value: "rem", label: "rem" },
		{ value: "%", label: "%" },
	];

	return (props) => {
		const classNames = props.attributes.className
			? props.attributes.className.split(" ")
			: [];
		const hasItmarBlockClass = classNames.includes("itmar_ex_block");
		if (hasItmarBlockClass) {
			//itmar_ex_blockをクラス名に持つブロックに限定

			if (allowedBlocks.includes(props.name)) {
				const {
					lineHeight,
					margin_val,
					padding_val,
					border_list,
					radius_list,
					isFitScale,
					scaleWidth,
					scaleHeight,
				} = props.attributes;

				const setAttributes = props.setAttributes;
				return (
					<>
						<BlockEdit {...props} />

						{props.name === "core/image" && (
							<InspectorControls group="settings">
								<PanelBody
									title={__("Size of Image", "block-collections")}
									initialOpen={false}
								>
									<ToggleControl
										label={__("Fit Parent Element", "block-collections")}
										checked={isFitScale}
										onChange={(newValue) => {
											setAttributes({ isFitScale: newValue });
										}}
									/>
								</PanelBody>
							</InspectorControls>
						)}
						<InspectorControls group="styles">
							<PanelBody
								title={__("Dimension", "block-collections")}
								initialOpen={false}
							>
								<BoxControl
									label={__("Margin settings", "block-collections")}
									values={margin_val}
									onChange={(newValue) =>
										setAttributes({ margin_val: newValue })
									}
									units={units} // 許可する単位
									allowReset={true} // リセットの可否
									resetValues={padding_resetValues} // リセット時の値
								/>

								<BoxControl
									label={__("Padding settings", "block-collections")}
									values={padding_val}
									onChange={(newValue) =>
										setAttributes({ padding_val: newValue })
									}
									units={units} // 許可する単位
									allowReset={true} // リセットの可否
									resetValues={padding_resetValues} // リセット時の値
								/>
							</PanelBody>
							{(props.name === "core/paragraph" ||
								props.name === "core/list" ||
								props.name === "core/quote") && (
								<>
									<PanelBody
										title={__("LineHight settings", "block-collections")}
									>
										<RangeControl
											value={lineHeight}
											label={__("lineHeight", "block-collections")}
											max={3}
											min={1}
											step={0.1}
											onChange={(val) => setAttributes({ lineHeight: val })}
											withInputField={true}
										/>
									</PanelBody>
								</>
							)}
							{(props.name === "core/list" ||
								props.name === "core/quote" ||
								props.name === "core/table") && (
								<PanelBody
									title={__("Border settings", "block-collections")}
									initialOpen={false}
									className="border_design_ctrl"
								>
									<BorderBoxControl
										colors={[
											{ color: "#72aee6" },
											{ color: "#000" },
											{ color: "#fff" },
										]}
										onChange={(newValue) =>
											setAttributes({ border_list: newValue })
										}
										value={border_list}
									/>
									<BorderRadiusControl
										values={radius_list}
										onChange={(newBrVal) =>
											setAttributes({
												radius_list:
													typeof newBrVal === "string"
														? { value: newBrVal }
														: newBrVal,
											})
										}
									/>
								</PanelBody>
							)}
							{props.name === "core/image" && (
								<>
									<PanelBody
										title={__("Scale settings", "block-collections")}
										initialOpen={false}
									>
										<PanelRow className="distance_row">
											<UnitControl
												dragDirection="e"
												onChange={(value) => {
													setAttributes({ scaleWidth: value });
												}}
												label={__("Width", "block-collections")}
												value={scaleWidth}
												help={__(
													"If left blank, it will not be set.",
													"block-collections",
												)}
											/>
											<UnitControl
												dragDirection="e"
												onChange={(value) =>
													setAttributes({ scaleHeight: value })
												}
												label={__("Height", "block-collections")}
												value={scaleHeight}
												help={__(
													"If left blank, it will not be set.",
													"block-collections",
												)}
											/>
										</PanelRow>
									</PanelBody>
								</>
							)}
						</InspectorControls>
					</>
				);
			}
		}
		//その他のブロック
		return <BlockEdit {...props} />;
	};
}, "withInspectorControl");

addFilter(
	"editor.BlockEdit",
	"itmar-ex-block/with-inspector-control",
	withInspectorControl,
);

//BlockListBlockフック（編集画面のブロックの外観等の反映）
const applyExtraAttributesInEditor = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			//propsを展開
			const {
				attributes,
				name,
				isValid,
				wrapperProps = {}, // wrapperPropsが未定義の場合は空のオブジェクトをデフォルト値として設定
			} = props;

			const classNames = props.attributes.className
				? props.attributes.className.split(" ")
				: [];
			const hasItmarBlockClass = classNames.includes("itmar_ex_block");
			if (hasItmarBlockClass) {
				//itmar_ex_blockをクラス名に持つブロックに限定
				if (allowedBlocks.includes(name)) {
					if (isValid) {
						//属性の取り出し
						const {
							lineHeight,
							margin_val,
							padding_val,
							radius_list,
							border_list,
							isFitScale,
							scaleWidth,
							scaleHeight,
						} = attributes;

						//拡張したスタイル・クラス

						let extraStyle = {};
						let extraClassNames = wrapperProps.className
							? wrapperProps.className
							: ""; // 既存の className を取得、または空文字列を設定

						extraStyle = {
							margin: `${margin_val.top} ${margin_val.right} ${margin_val.bottom} ${margin_val.left}`,
							padding: `${padding_val.top} ${padding_val.right} ${padding_val.bottom} ${padding_val.left}`,
						};
						if (
							name === "core/paragraph" ||
							name === "core/list" ||
							name === "core/quote"
						) {
							extraStyle = {
								...extraStyle,
								lineHeight: lineHeight,
							};
						}

						if (name === "core/list" || name === "core/quote") {
							//角丸の設定
							const list_radius_prm =
								radius_list && Object.keys(radius_list).length === 1
									? radius_list.value
									: `${(radius_list && radius_list.topLeft) || ""} ${
											(radius_list && radius_list.topRight) || ""
									  } ${(radius_list && radius_list.bottomRight) || ""} ${
											(radius_list && radius_list.bottomLeft) || ""
									  }`;
							const list_border = borderProperty(border_list);
							extraStyle = {
								...extraStyle,
								borderRadius: list_radius_prm,
								...list_border,
							};
						}

						if (name === "core/image") {
							const setWidth =
								scaleWidth === "" ||
								scaleWidth === null ||
								scaleWidth === undefined
									? undefined
									: scaleWidth;
							const setHeight =
								scaleHeight === "" ||
								scaleHeight === null ||
								scaleHeight === undefined
									? undefined
									: scaleHeight;

							extraStyle = {
								...extraStyle,
								...(setWidth !== undefined && { width: setWidth }),
								...(setHeight !== undefined && { height: setHeight }),
							};
							if (attributes.align === "center") {
								//中央ぞろえの時
								extraStyle = {
									...extraStyle,
									margin: `${margin_val.top} auto ${margin_val.bottom}`,
								};
							}
							if (isFitScale) {
								//画像スタイルを合わせる
								extraClassNames += " fit-scale-image"; // クラス名を追加
							}
						}

						if (name === "core/table") {
							const list_border = borderProperty(border_list);
							extraStyle = {
								...extraStyle,
								borderCollapse: "collapse",
								...list_border,
							};
						}
						//既存スタイルとマージ
						const newWrapperProps = {
							...wrapperProps,
							style: { ...wrapperProps.style, ...extraStyle },
							className: extraClassNames.trim(), // trim() で余分なスペースを削除
						};

						return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
					}
				}
			}

			//デフォルト
			return <BlockListBlock {...props} />;
		};
	},
	"applyExtraAttributesInEditor",
);

addFilter(
	"editor.BlockListBlock",
	"block-collections/extra-attributes-in-editor",
	applyExtraAttributesInEditor,
);

//blocks.getSaveContent.extraPropsフック（フロントエンドへの反映）
const applyExtraAttributesInFrontEnd = (props, blockType, attributes) => {
	if (props.className?.match(/itmar_ex_block/)) {
		//markdown-block内のブロックに限定
		if (allowedBlocks.includes(blockType.name)) {
			//属性の取り出し
			const {
				lineHeight,
				margin_val,
				padding_val,
				radius_list,
				border_list,
				isFitScale,
				scaleWidth,
				scaleHeight,
			} = attributes;

			//拡張したスタイル
			let extraStyle = {};
			let extraClassNames = props.className ? props.className : ""; // 既存の className を取得、または空文字列を設定

			extraStyle = {
				margin: `${margin_val.top} ${margin_val.right} ${margin_val.bottom} ${margin_val.left}`,
				padding: `${padding_val.top} ${padding_val.right} ${padding_val.bottom} ${padding_val.left}`,
			};
			if (
				blockType.name === "core/paragraph" ||
				blockType.name === "core/list" ||
				blockType.name === "core/quote"
			) {
				extraStyle = {
					...extraStyle,
					lineHeight: lineHeight,
				};
			}

			if (blockType.name === "core/list" || blockType.name === "core/quote") {
				//角丸の設定
				const list_radius_prm =
					radius_list && Object.keys(radius_list).length === 1
						? radius_list.value
						: `${(radius_list && radius_list.topLeft) || ""} ${
								(radius_list && radius_list.topRight) || ""
						  } ${(radius_list && radius_list.bottomRight) || ""} ${
								(radius_list && radius_list.bottomLeft) || ""
						  }`;
				//ボーダーの設定
				const list_border = borderProperty(border_list);

				extraStyle = {
					...extraStyle,
					borderRadius: list_radius_prm,
					...list_border,
				};
			}

			if (blockType.name === "core/image") {
				const setWidth =
					scaleWidth === "" || scaleWidth === null || scaleWidth === undefined
						? undefined
						: scaleWidth;
				const setHeight =
					scaleHeight === "" ||
					scaleHeight === null ||
					scaleHeight === undefined
						? undefined
						: scaleHeight;
				extraStyle = {
					...extraStyle,
					width: setWidth,
					height: setHeight,
				};
				if (attributes.align === "center") {
					//中央ぞろえの時
					extraStyle = {
						...extraStyle,
						margin: `${margin_val.top} auto ${margin_val.bottom}`,
					};
				}
				if (isFitScale) {
					//画像スタイルを合わせる
					extraClassNames += " fit-scale-image"; // クラス名を追加
				}
			}

			return Object.assign(props, {
				style: { ...props.style, ...extraStyle },
				className: extraClassNames.trim(), // trim() で余分なスペースを削除
			});
		}
	}
	//デフォルト
	return props;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"block-collections/-extra-attributes-in-front-end",
	applyExtraAttributesInFrontEnd,
);
