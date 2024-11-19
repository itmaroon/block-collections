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
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { createBlock } from "@wordpress/blocks";
import { useSelect, useDispatch, dispatch } from "@wordpress/data";

import { borderProperty, useIsIframeMobile } from "itmar-block-packages";

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

		if (name === "core/paragraph") {
			newAttributes = {
				...newAttributes,
				isMore: {
					type: "boolean",
					default: false,
				},
				isExpand: {
					type: "boolean",
					default: true,
				},
				defaultMaxHeight: {
					type: "string",
					default: "30em",
				},
				mobileMaxHeight: {
					type: "string",
					default: "40em",
				},

				defaultGradient: {
					type: "number",
					default: 25,
				},
				mobileGradient: {
					type: "number",
					default: 35,
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
		//モバイルの判定
		const isMobile = useIsIframeMobile();

		//最大高さ設定用の一時保管
		const [heightVal, setHeightVal] = useState(null);
		//拡張コアブロックのクラスを持つかの判定
		const classNames = props.attributes.className
			? props.attributes.className.split(" ")
			: [];
		const hasItmarBlockClass = classNames.includes("itmar_ex_block");
		if (hasItmarBlockClass) {
			//itmar_ex_blockをクラス名に持つブロックに限定

			if (allowedBlocks.includes(props.name)) {
				const {
					lineHeight,
					isMore,
					defaultMaxHeight,
					mobileMaxHeight,
					defaultGradient,
					mobileGradient,
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
									title={__("Link with parent element", "block-collections")}
									initialOpen={false}
								>
									<p>
										{__(
											"Sets the size of the image to fit the parent element.",
											"block-collections",
										)}
									</p>
									<ToggleControl
										label={__("Fit Parent Element", "block-collections")}
										checked={isFitScale}
										onChange={(newValue) => {
											setAttributes({ isFitScale: newValue });
										}}
									/>
									{isFitScale && (
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
									)}
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
							{props.name === "core/paragraph" && (
								<>
									<PanelBody title={__("See More", "block-collections")}>
										<ToggleControl
											label={__("Is See More Setting", "block-collections")}
											checked={isMore}
											onChange={(newValue) => {
												setAttributes({ isMore: newValue });
											}}
										/>
										{isMore && (
											<>
												<UnitControl
													dragDirection="e"
													onChange={(value) => {
														setHeightVal(value);
													}}
													// コントロールからフォーカスが離れたとき属性に記録
													onBlur={() => {
														setAttributes(
															!isMobile
																? { defaultMaxHeight: heightVal }
																: { mobileMaxHeight: heightVal },
														);
													}}
													label={
														!isMobile
															? __("Max Height(desk top)", "block-collections")
															: __("Max Height(mobile)", "block-collections")
													}
													value={!isMobile ? defaultMaxHeight : mobileMaxHeight}
												/>
												<RangeControl
													value={!isMobile ? defaultGradient : mobileGradient}
													label={
														!isMobile
															? __(
																	"Ratio of gradation(desk top)",
																	"block-collections",
															  )
															: __(
																	"Ratio of gradation(mobile)",
																	"block-collections",
															  )
													}
													max={50}
													min={10}
													step={1}
													onChange={(val) =>
														setAttributes(
															!isMobile
																? { defaultGradient: val }
																: { mobileGradient: val },
														)
													}
													withInputField={false}
												/>
											</>
										)}
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
			//モバイルの判定
			const isMobile = useIsIframeMobile();

			//documentの取得
			const iframe = document.getElementsByName("editor-canvas")[0]; // name属性を利用
			//ブロックエディタにおけるiframeの有無で操作するドキュメント要素を峻別
			const target_doc = iframe
				? iframe.contentDocument || iframe.contentWindow.document
				: document;

			//propsを展開
			const {
				attributes,
				name,
				clientId,
				isValid,
				wrapperProps = {}, // wrapperPropsが未定義の場合は空のオブジェクトをデフォルト値として設定
			} = props;

			const classNames = props.attributes.className
				? props.attributes.className.split(" ")
				: [];
			const hasItmarBlockClass = classNames.includes("itmar_ex_block");

			//コアブロックの直近のデザイングループ・もっと見るボタンを取得しておく
			const { nearestDesignGroupParent, moreButton, blockElement } = useSelect(
				(select) => {
					const {
						getBlockParents,
						getBlock,
						getBlockName,
						getBlockAttributes,
					} = select("core/block-editor");
					// ClientIdに基づくブロック限定情報の収集
					const blockName = getBlockName(clientId);
					const { className } = getBlockAttributes(clientId) || {};
					//処理対象のブロックが要件にあてはまらなければnullを返して終了
					if (
						blockName !== "core/paragraph" ||
						!className ||
						!className.includes("itmar_ex_block")
					) {
						return {
							nearestDesignGroupParent: null,
							moreButton: null,
							blockElement: null,
						}; // Return early if conditions are not met
					}

					const parentIds = getBlockParents(clientId);

					const groupIds = parentIds.filter(
						(pId) => getBlockName(pId) === "itmar/design-group",
					);
					const parentId =
						groupIds.length > 0 ? groupIds[groupIds.length - 1] : null;
					//親ブロックがなければnullを返して終了
					if (!parentId) {
						return {
							nearestDesignGroupParent: null,
							moreButton: null,
							blockElement: null,
						};
					}

					//親ブロックを取得
					const parentBlock = getBlock(parentId);

					// moreButtonの取得
					const moreButton = parentBlock.innerBlocks.find(
						(block) =>
							block.name === "itmar/design-button" &&
							block.attributes.className &&
							block.attributes.className.includes("more_btn"),
					);
					//拡張したcore/paragraphの直近上位のグループブロックとその中のmoreButtonを返す

					return {
						nearestDesignGroupParent: { id: parentId, block: parentBlock },
						moreButton: moreButton || null,
						blockElement: target_doc.querySelector(
							`[data-block="${clientId}"]`,
						),
					};
				},
				[clientId],
			);

			//ブロックツールの取得
			const { insertBlocks, removeBlock, updateBlockAttributes } =
				useDispatch("core/block-editor");
			//コアパラグラフでisMoreがtrueの場合は「もっと見る」ボタンを挿入
			useEffect(() => {
				if (!nearestDesignGroupParent) return; //親ブロックが見つからないなら処理終了

				//拡張コアブロックであることのチェック
				if (hasItmarBlockClass) {
					//コアパラグラフである
					if (name === "core/paragraph") {
						const parentBlock = nearestDesignGroupParent.block;
						//インナーブロックの数
						const innerBlockNum = parentBlock.innerBlocks.length;
						//すでにボタンがあるか
						const existingButtonIndex = parentBlock.innerBlocks.findIndex(
							(block) =>
								block.name === "itmar/design-button" &&
								block.attributes.className &&
								block.attributes.className.includes("more_btn"),
						);
						//ボタンの挿入（isMoreがtrueでボタンがレンダリングされていない場合）
						if (
							attributes.isMore &&
							existingButtonIndex === -1 &&
							innerBlockNum == 1 //インナーブロックが複数ある場合は挿入しない
						) {
							const buttonBlock = createBlock("itmar/design-button", {
								className: "more_btn",
								linkKind: "none",
								labelContent: __("See more...", "block-collections"),
							});
							insertBlocks(
								buttonBlock,
								parentBlock.innerBlocks.length,
								nearestDesignGroupParent.id,
							);
						} else if (
							attributes.isMore &&
							existingButtonIndex === -1 &&
							innerBlockNum > 1
						) {
							//親のグループ内に「もっと見る」ボタンがないのに、複数のインナーブロックがあるときはエラー表示してフラグを戻す
							dispatch("core/notices").createNotice(
								"error",
								__(
									"The 'See more' button cannot be set when there are multiple inner blocks",
									"block-collections",
								),
								{ type: "snackbar", isDismissible: true },
							);
							updateBlockAttributes(clientId, { isMore: false });
						}
						//ボタンの削除（isMoreがfalseでボタンがレンダリングされている場合）
						if (!attributes.isMore && existingButtonIndex !== -1) {
							removeBlock(
								nearestDesignGroupParent.block.innerBlocks[existingButtonIndex]
									.clientId,
							);
						}
					}
				}
			}, [attributes.isMore, nearestDesignGroupParent]);

			//エディタへのレンダリング処理
			if (hasItmarBlockClass) {
				//itmar_ex_blockをクラス名に持つブロックに限定
				if (allowedBlocks.includes(name)) {
					if (isValid) {
						//属性の取り出し
						const {
							lineHeight,
							isExpand,
							defaultMaxHeight,
							mobileMaxHeight,
							defaultGradient,
							mobileGradient,
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
						let afterElement = null;

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
						//もっと見るを適用
						if (name === "core/paragraph") {
							if (moreButton) {
								//moreButtonが押されたらisExpandを反転
								if (moreButton.attributes.isClick) {
									updateBlockAttributes(clientId, {
										isExpand: !isExpand,
									});

									//moreボタンのクリック属性を戻してボタンのラベルを更新
									updateBlockAttributes(moreButton.clientId, {
										isClick: false,
										labelContent: isExpand
											? __("See more...", "block-collections")
											: __("Collapse...", "block-collections"),
									});
								}
								//isExpandのフラグによってスタイルをセット

								if (!isExpand) {
									//maxHeightをセット
									extraStyle = {
										...extraStyle,
										overflow: "hidden",
										maxHeight: !isMobile ? defaultMaxHeight : mobileMaxHeight,
									};

									//コアパラグラフがレンダリングされていること
									if (blockElement) {
										//コアパラグラフの背景色
										const computedStyle = getComputedStyle(blockElement);
										const effectiveBackgroundColor =
											computedStyle.backgroundColor;
										//moreButtonのクラス名
										const moreClassName = moreButton.attributes.className || "";
										const moreClassNames = moreClassName.split(" ");

										//スクロール高がクライアント高より大きいこと
										if (blockElement.scrollHeight > blockElement.clientHeight) {
											//インラインSVGをセット
											afterElement = (
												<svg
													style={{
														position: "absolute",
														width: "100%",
														height: `${
															!isMobile ? defaultGradient : mobileGradient
														}%`,
														bottom: "0",
														left: "0",
														backgroundImage: `linear-gradient(to bottom, rgba(255,255 ,255 , 0) 0%, ${
															effectiveBackgroundColor === "rgba(0, 0, 0, 0)" ||
															effectiveBackgroundColor === "transparent"
																? "white"
																: effectiveBackgroundColor
														} 70%)`, //レンダリングされた色が透明なら白にする
														zIndex: "3",
													}}
												/>
											);
											//もっと見るボタンの表示
											if (moreClassNames.includes("more_hide")) {
												const removeHideName = moreClassNames.filter(
													(className) => className !== "more_hide",
												);
												const newClassName = removeHideName.join(" ").trim();
												updateBlockAttributes(moreButton.clientId, {
													className: newClassName,
												});
											}
										} else {
											//もっと見るボタンの非表示
											if (!moreClassNames.includes("more_hide")) {
												const hideClassName = [...moreClassNames, "more_hide"]
													.join(" ")
													.trim();
												updateBlockAttributes(moreButton.clientId, {
													className: hideClassName,
												});
											}
										}
									}
								}
							}
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
							if (isFitScale) {
								//親要素にスケールを合わせたとき
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
									boxSizing: "border-box",
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

						//高階コンポーネントを返す

						// afterElementが存在する場合のみ、ラッパーdivを使用
						if (afterElement) {
							return (
								<div style={{ position: "relative" }}>
									<BlockListBlock {...props} wrapperProps={newWrapperProps} />
									{afterElement}
								</div>
							);
						} else {
							// afterElementが存在しない場合は、高階コンポーネントのBlockListBlockを返す
							return (
								<BlockListBlock {...props} wrapperProps={newWrapperProps} />
							);
						}
					}
				}
			}

			//デフォルトのまま返す
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
				isMore,
				defaultMaxHeight,
				mobileMaxHeight,
				defaultGradient,
				mobileGradient,
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
			let dataAttributes = {}; // data属性

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

			if (blockType.name === "core/paragraph") {
				//もっと見るボタンが有効
				if (isMore) {
					dataAttributes = {
						"data-more_style": JSON.stringify({
							defaultMaxHeight: defaultMaxHeight,
							mobileMaxHeight: mobileMaxHeight,
							defaultGradient: defaultGradient,
							mobileGradient: mobileGradient,
						}),
					};
				}
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
				//画像スタイルを合わせる
				if (isFitScale) {
					extraStyle = {
						...extraStyle,
						boxSizing: "border-box",
						width: setWidth,
						height: setHeight,
						position: "relative",
					};
					if (attributes.align === "center") {
						//中央ぞろえの時
						extraStyle = {
							...extraStyle,
							margin: `${margin_val.top} auto ${margin_val.bottom}`,
						};
					}
					extraClassNames += " fit-scale-image"; // クラス名を追加
				}
			}

			return Object.assign(props, {
				style: { ...props.style, ...extraStyle },
				className: extraClassNames.trim(), // trim() で余分なスペースを削除
				...Object.entries(dataAttributes).reduce((acc, [key, value]) => {
					acc[key] = value;
					return acc;
				}, {}),
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
