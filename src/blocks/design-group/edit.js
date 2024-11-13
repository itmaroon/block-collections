import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { StyleComp } from "./StyleGroup";
import { useStyleIframe } from "../iframeFooks";
import { useSelect, dispatch } from "@wordpress/data";
import {
	useElementStyleObject,
	useIsIframeMobile,
	DraggableBox,
	useDraggingMove,
	ShadowStyle,
	ShadowElm,
	AnimationBlock,
	BlockPlace,
	ToggleElement,
} from "itmar-block-packages";

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";

import {
	PanelBody,
	ToggleControl,
	RadioControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import { useEffect, useRef, useState } from "@wordpress/element";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};
const padding_mobile_resetValues = {
	top: "20px",
	left: "10px",
	right: "10px",
	bottom: "20px",
};

//単位のリセットバリュー
const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

function checkInnerGroupBlocks(blocks) {
	for (const block of blocks) {
		// itmar/design-group ブロックで is_menu が true の場合
		if (
			block.name === "itmar/design-group" &&
			block.attributes.is_menu === true
		) {
			return true;
		}

		// インナーブロックがある場合、それらもチェック
		if (block.innerBlocks && block.innerBlocks.length > 0) {
			if (checkInnerGroupBlocks(block.innerBlocks)) {
				return true;
			}
		}
	}
	return false;
}

function checkSubmenuBlocks(blocks) {
	for (const block of blocks) {
		// itmar/design-title ブロックで linkKind が submenu の場合
		if (
			block.name === "itmar/design-title" &&
			block.attributes.linkKind === "submenu"
		) {
			return true;
		}
	}
	return false;
}

const paraValueMap = {
	x: { min: -300, max: 300, step: 10 },
	y: { min: -300, max: 300, step: 10 },
	"x%": { min: 0, max: 100, step: 5 },
	"y%": { min: 0, max: 100, step: 5 },
	opacity: { min: 0, max: 1, step: 0.1 },
	scale: { min: 0, max: 3, step: 0.1 },
};

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	const {
		default_val,
		mobile_val,
		shadow_element,
		anime_prm,
		is_shadow,
		is_anime,
		is_moveable,
		position,
		is_menu,
		parallax_obj,
		is_submenu,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);

	//インナーブロックの参照
	const innerRef = useRef(null);

	//ハンバーガーボタンのクリックによるイベントハンドラ(クラス名の付加)
	const [isMenuOpen, setIsmenuOpen] = useState(false);
	const handleHambergerToggle = (isOpen) => {
		setIsmenuOpen(isOpen);
	};

	//blockPropsの参照
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
	});

	//ブロックのインナースタイルを取得
	const styleObject = useElementStyleObject(blockRef, blockProps.style);

	useEffect(() => {
		if (styleObject) {
			const parseObj = JSON.parse(styleObject);
			if (Object.keys(parseObj).length !== 0) {
				//背景色変更によるシャドー属性の書き換え
				const baseColor = parseObj.backgroundColor;
				if (baseColor) {
					setAttributes({
						shadow_element: { ...shadow_element, baseColor: baseColor },
					});
					const new_shadow = ShadowElm({
						...shadow_element,
						baseColor: baseColor,
					});
					if (new_shadow) {
						setAttributes({ shadow_result: new_shadow.style });
					}
				}
				//スタイルオブジェクトをブロックの属性に書き込む
				setAttributes({ block_style: parseObj });
			}
		}
	}, [styleObject]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//アニメーション開始のトリガーとなるクラスを付加するフラグ
	const [startAnime, setStartAnime] = useState(false);
	//ブロックアイテム（インナーブロック）
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `group_contents ${is_anime ? "fadeTrigger" : ""} ${
				startAnime ? anime_prm.pattern : ""
			}`,
			ref: innerRef,
		},
		{
			templateLock: false,
		},
	);
	//移動可能ブロックならドラッグのカスタムフックを付加
	const handlePositionChange = (newPosition) => {
		setAttributes({ position: newPosition });
	};
	useDraggingMove(is_moveable, blockRef, position, handlePositionChange);

	//ブロックの監視（メニューに設定されているitmar/design-groupが存在するかのチェック
	const isMenuBlockPresent = useSelect((select) => {
		const blocks = select("core/block-editor").getBlocks();
		return checkInnerGroupBlocks(blocks);
	}, []);

	//ブロックの監視（サブメニューをもつデザインタイトルが含まれるか)
	const isSubmenuInclude = useSelect(
		(select) => {
			// ブロックエディタから現在のブロックの子ブロックを取得
			const { getBlocksByClientId } = select("core/block-editor");
			const innerBlocks = getBlocksByClientId(clientId)[0]?.innerBlocks;
			// 子ブロックをチェックする関数を呼び出し
			return checkSubmenuBlocks(innerBlocks);
		},
		[clientId],
	);

	useEffect(() => {
		setAttributes({ has_submenu: isSubmenuInclude });
	}, [isSubmenuInclude]);

	//ブロックの監視（オープニングブロックが含まれているか）
	const { openBlockAnimation } = useSelect((select) => {
		const blocks = select("core/block-editor").getBlocks();
		const openingBlocks = [
			"itmar/logo-anime",
			"itmar/tea-time",
			"itmar/welcome",
		];
		// ブロックリストを検索し、openingBlocks配列のブロック名を持つブロックがあるか確認
		for (let block of blocks) {
			if (openingBlocks.includes(block.name)) {
				// 対象のブロックが見つかった場合、そのブロックの属性を返す
				return {
					openBlockAnimation: {
						is_anime: block.attributes.is_anime,
						is_front: block.attributes.is_front,
					},
				};
			}
		}

		// 対象のブロックが見つからなかった場合
		return { openBlockAnimation: null };
	}, []);

	//アニメーションスタートのトリガー
	useEffect(() => {
		//アニメーション設定によるアニメスタート
		if (is_anime) {
			setStartAnime(true);
		} else {
			setStartAnime(false);
		}
	}, [is_anime]);

	useEffect(() => {
		//オープニング終了によるアニメスタート
		if (is_anime && openBlockAnimation && anime_prm.trigger === "opend") {
			if (openBlockAnimation.is_front) {
				setStartAnime(false);
			}
			if (
				is_anime &&
				!openBlockAnimation.is_front &&
				!openBlockAnimation.is_anime
			) {
				setStartAnime(true);
			}
		}
	}, [is_anime, openBlockAnimation]);

	useEffect(() => {
		//可視領域に入ったことによるアニメスタート
		if (is_anime && anime_prm.trigger === "visible") {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							// ブロックが可視領域に入った時の処理
							setStartAnime(true);
						} else {
							// ブロックが可視領域から出た時の処理
							setStartAnime(false);
						}
					});
				},
				{
					root: null, // ビューポートをルートとする
					rootMargin: "0px", // ビューポートのマージンは0px
					threshold: 0.1, // 10%の交差を閾値とする
				},
			);

			// 監視対象のブロックを選択
			if (blockRef.current) {
				observer.observe(blockRef.current);
			}

			// コンポーネントのアンマウント時にオブザーバーをクリーンアップ
			return () => observer.disconnect();
		}
	}, [is_anime, anime_prm.trigger]);

	//親ブロックにis_swiperが設定されているか
	const hasSlideBlock = useSelect(
		(select) => {
			// blockEditorストアから必要な関数を取得
			const { getBlockParentsByBlockName, getBlockAttributes } =
				select(blockEditorStore);

			// 現在のブロックの親ブロックのIDリストを取得
			const parentIds = getBlockParentsByBlockName(
				clientId,
				"itmar/design-group",
			);

			// 条件に合致する親ブロックの存在を確認
			return parentIds.some((parentId) => {
				const attributes = getBlockAttributes(parentId);
				return attributes.is_swiper === true;
			});
		},
		[clientId],
	);

	return (
		<>
			{/* インスペクター領域内 */}
			<InspectorControls group="settings">
				<PanelBody
					title={__("Menu or Group", "block-collections")}
					initialOpen={true}
					className="form_design_ctrl"
				>
					<ToggleControl
						label={__("Is Menu", "block-collections")}
						checked={is_menu}
						onChange={(newVal) => {
							if (!isMenuBlockPresent || is_menu) {
								//他にメニューの設定があるブロックがないか、既にメニュー設定されている場合は更新
								setAttributes({ is_menu: newVal });
							} else {
								dispatch("core/notices").createNotice(
									"error",
									__(
										"Only one group can be placed as a menu on each page.",
										"itmar_guest_contact_block",
									),
									{ type: "snackbar", isDismissible: true },
								);
							}
						}}
					/>
				</PanelBody>

				<AnimationBlock
					attributes={attributes}
					onChange={(newValue) => setAttributes(newValue)}
				/>
				{hasSlideBlock && (
					<PanelBody
						title={__("Slide Parallax", "block-collections")}
						initialOpen={false}
						className="form_design_ctrl"
					>
						<ToggleControl
							label={__("Is Parallax", "block-collections")}
							checked={parallax_obj != null}
							onChange={(newVal) => {
								if (newVal) {
									//パララックスオブジェクトをセットして、中央揃えを解除
									setAttributes({
										parallax_obj: {
											type: "y",
											scale: 300,
											unit: "",
										},
										isPosCenter: false,
										default_val: {
											...default_val,
											posValue: {
												...default_val.posValue,
												isVertCenter: false,
												isHorCenter: false,
											},
										},
										mobile_val: {
											...mobile_val,
											posValue: {
												...mobile_val.posValue,
												isVertCenter: false,
												isHorCenter: false,
											},
										},
									});
								} else {
									setAttributes({ parallax_obj: null });
									// transformインラインスタイルをリセット
									const parentElement = blockRef.current.parentElement;
									parentElement.style.transform = "";
								}
							}}
						/>
						{parallax_obj != null && (
							<div className="itmar_title_type">
								<RadioControl
									label={__("Parallax Type", "block-collections")}
									selected={parallax_obj.type}
									options={[
										{
											label: __("Lateral", "block-collections"),
											value: "x",
										},
										{
											label: __("Longitudinal", "block-collections"),
											value: "y",
										},
										{
											label: __("Scale", "block-collections"),
											value: "scale",
										},
										{
											label: __("Opacity", "block-collections"),
											value: "opacity",
										},
									]}
									onChange={(newVal) => {
										setAttributes({
											parallax_obj: {
												...parallax_obj,
												type: newVal,
											},
										});
									}}
								/>
								<RangeControl
									label={__("Value", "block-collections")}
									value={parallax_obj.scale}
									max={
										paraValueMap[`${parallax_obj.type}${parallax_obj.unit}`].max
									}
									min={
										paraValueMap[`${parallax_obj.type}${parallax_obj.unit}`].min
									}
									step={
										paraValueMap[`${parallax_obj.type}${parallax_obj.unit}`]
											.step
									}
									onChange={(newVal) =>
										setAttributes({
											parallax_obj: { ...parallax_obj, scale: newVal },
										})
									}
									withInputField={true}
								/>
								{(parallax_obj.type === "x" || parallax_obj.type === "y") && (
									<RadioControl
										label={__("unit", "block-collections")}
										selected={parallax_obj.unit}
										options={[
											{
												label: "px",
												value: "",
											},
											{
												label: "%",
												value: "%",
											},
										]}
										onChange={(newVal) => {
											setAttributes({
												parallax_obj: { ...parallax_obj, unit: newVal },
											});
										}}
									/>
								)}
							</div>
						)}
					</PanelBody>
				)}
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Dimensions", "block-collections")}
					initialOpen={false}
					className="form_design_ctrl"
				>
					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={!isMobile ? default_val.margin : mobile_val.margin}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_val: { ...default_val, margin: value },
								});
							} else {
								setAttributes({ mobile_val: { ...mobile_val, margin: value } });
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
						values={!isMobile ? default_val.padding : mobile_val.padding}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_val: { ...default_val, padding: value },
								});
							} else {
								setAttributes({
									mobile_val: { ...mobile_val, padding: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
				</PanelBody>
				<BlockPlace
					attributes={attributes}
					clientId={clientId}
					blockRef={blockRef}
					isMobile={isMobile}
					isSubmenu={is_submenu}
					isParallax={parallax_obj != null}
					onDirectionChange={(position) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, direction: position },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, direction: position },
							});
						}
					}}
					onReverseChange={(checked) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, reverse: checked },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, reverse: checked },
							});
						}
					}}
					onWrapChange={(checked) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, wrap: checked },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, wrap: checked },
							});
						}
					}}
					onFlexChange={(position) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, inner_align: position },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, inner_align: position },
							});
						}
					}}
					onAlignChange={(position) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, outer_align: position },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, outer_align: position },
							});
						}
					}}
					onVerticalChange={(position) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, outer_vertical: position },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, outer_vertical: position },
							});
						}
					}}
					onWidthChange={(key, position) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, [key]: position },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, [key]: position },
							});
						}
					}}
					onHeightChange={(position) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, height_val: position },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, height_val: position },
							});
						}
					}}
					onFreeWidthChange={(key, value) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, [key]: value },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, [key]: value },
							});
						}
					}}
					onFreeHeightChange={(value) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, free_height: value },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, free_height: value },
							});
						}
					}}
					onGridChange={(value) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, grid_info: value },
							});
						} else {
							setAttributes({
								mobile_val: { ...mobile_val, grid_info: value },
							});
						}
					}}
					onPositionChange={(value) => {
						setAttributes({ positionType: value });
					}}
					onIsPosCenterChange={(value) => {
						setAttributes({ isPosCenter: value });
					}}
					onPosValueChange={(value) => {
						if (!isMobile) {
							setAttributes({
								default_val: { ...default_val, posValue: value },
							});
						} else {
							setAttributes({ mobile_val: { ...mobile_val, posValue: value } });
						}
					}}
				/>

				<PanelBody
					title={__("Content Style", "block-collections")}
					initialOpen={false}
					className="form_design_ctrl"
				>
					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "block-collections")
								: __("Padding settings(mobile)", "block-collections")
						}
						values={
							!isMobile
								? default_val.padding_content
								: mobile_val.padding_content
						}
						onChange={(value) =>
							setAttributes(
								!isMobile
									? { default_val: { ...default_val, padding_content: value } }
									: { mobile_val: { ...mobile_val, padding_content: value } },
							)
						}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={
							!isMobile ? padding_resetValues : padding_mobile_resetValues
						} // リセット時の値
					/>

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
					title={__("Position moveable", "block-collections")}
					initialOpen={true}
				>
					<ToggleControl
						label={__("make it moveable", "block-collections")}
						checked={is_moveable}
						onChange={(newVal) => {
							setAttributes({ is_moveable: newVal });
						}}
					/>
					{is_moveable && (
						<DraggableBox
							attributes={attributes.position}
							onPositionChange={(position) =>
								setAttributes({ position: position })
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			{/* ブロックエディタ領域内 */}

			{is_menu && !is_submenu && (
				<>
					<ToggleElement
						onToggle={handleHambergerToggle}
						className="itmar_hamberger_btn"
						openFlg={isMenuOpen}
					>
						<span></span>
						<span></span>
						<span></span>
					</ToggleElement>
					<ToggleElement
						onToggle={handleHambergerToggle}
						openFlg={isMenuOpen}
						className="itmar_back_ground"
					/>
				</>
			)}

			<StyleComp attributes={attributes} isMenuOpen={isMenuOpen}>
				<div {...blockProps}>
					<div {...innerBlocksProps}></div>
				</div>
			</StyleComp>
		</>
	);
}
