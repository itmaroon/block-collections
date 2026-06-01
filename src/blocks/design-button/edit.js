import { __ } from "@wordpress/i18n";
import { StyleComp } from "./StyleButton";
import { useStyleIframe } from "../iframeFooks";
import ToolTips from "../ToolTips";
import StyleTooltips from "../StyleTooltips";

import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextControl,
	ToggleControl,
	RangeControl,
	Button,
	ToolbarGroup,
	ToolbarItem,
	ToolbarButton,
	__experimentalUnitControl as UnitControl,
	BoxControl,
	BorderBoxControl,
} from "@wordpress/components";
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";
import { useEffect, useRef, useState } from "@wordpress/element";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

import "./editor.scss";
import {
	useElementBackgroundColor,
	useIsIframeMobile,
	flattenBlocks,
	PseudoElm,
	ShadowStyle,
	ShadowElm,
	align_prm,
	PageSelectControl,
	ArchiveSelectControl,
	SingleImageSelect,
	IconSelectControl,
	TypographyControls,
} from "itmar-block-packages";

import { justifyCenter, justifyLeft, justifyRight } from "@wordpress/icons";

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
	{ value: "%", label: "%" },
];

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const {
		buttonType,
		displayType,
		buttonKey,
		linkKind,
		selectedSlug,
		selectedPageUrl,
		modalClassName,
		stretchInfo,
		isEditing,
		isBlank,
		isClick,
		bgColor,
		align,
		outer_align,
		labelContent,
		disabled,
		disableOpacity,
		pseudoInfo,
		iconStyle,
		font_style_label,
		default_pos,
		mobile_pos,
		buttonColor,
		buttonGradient,
		disableButtonColor,
		disableButtonGradient,
		labelColor,
		disableLabelColor,
		radius_value,
		border_value,
		shadow_element,
		is_shadow,
		is_tooltip,
		tooltip_style,
		tooltip_text,
	} = attributes;

	//ブロックの配置
	const align_style = align_prm(outer_align, true);
	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor, ...align_style },
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
	useStyleIframe(StyleTooltips, tooltip_style);

	//ブロックのストレッチ処理
	const stretchTargetBlock = useSelect(
		(select) => {
			const groupId = stretchInfo?.groupId;
			if (!groupId) return;

			const { getBlocks } = select(blockEditorStore);

			// トップレベルのブロックを再帰的に全取得
			return flattenBlocks(getBlocks() || []).find(
				(b) =>
					b.name === "itmar/design-group" && b.attributes?.formID === groupId,
			);
		},
		[stretchInfo?.groupId],
	);
	const stretchClientId = stretchTargetBlock?.clientId;

	//ターゲットブロックの大きさ確保
	const naturalHeightRef = useRef(0);
	const naturalPaddingRef = useRef({
		top: "",
		bottom: "",
	});
	const prevIsOpenRef = useRef(null);
	const isAnimatingRef = useRef(false);
	const currentTransitionEndRef = useRef(null);

	useEffect(() => {
		if (!stretchClientId) return;

		const iframeInstance = document.getElementsByName("editor-canvas")[0];
		const targetDocument =
			iframeInstance?.contentDocument ??
			iframeInstance?.contentWindow?.document ??
			document;

		const el = targetDocument.querySelector(
			`[data-block="${stretchClientId}"]`,
		);
		if (!el) return;

		const isOpen = stretchInfo?.isOpen ?? true;
		const isFirstTime = prevIsOpenRef.current === null;
		prevIsOpenRef.current = isOpen;

		// ① 前のアニメーションの transitionend リスナーを必ず除去
		if (currentTransitionEndRef.current) {
			el.removeEventListener("transitionend", currentTransitionEndRef.current);
			currentTransitionEndRef.current = null;
		}

		// ── アニメーション関数 ─────────────────────────────

		const closeImmediately = () => {
			el.style.overflow = "hidden";
			el.style.transition = "none";
			el.style.height = "0px";
			el.style.paddingTop = "0px";
			el.style.paddingBottom = "0px";
			isAnimatingRef.current = false;
		};

		const closeWithAnimation = () => {
			isAnimatingRef.current = true;
			el.style.overflow = "hidden";
			el.style.transition = "none";
			el.style.height = `${naturalHeightRef.current}px`;
			void el.offsetHeight;
			el.style.transition = "height 0.8s ease, padding 0.8s ease";
			el.style.height = "0px";
			el.style.paddingTop = "0px";
			el.style.paddingBottom = "0px";

			const onEnd = () => {
				el.removeEventListener("transitionend", onEnd);
				currentTransitionEndRef.current = null;
				isAnimatingRef.current = false;
			};
			currentTransitionEndRef.current = onEnd;
			el.addEventListener("transitionend", onEnd);
		};

		const openWithAnimation = () => {
			isAnimatingRef.current = true;
			el.style.overflow = "hidden";
			el.style.transition = "none";
			el.style.height = "0px";
			void el.offsetHeight;
			el.style.transition = "height 0.8s ease, padding 0.8s ease";
			el.style.height = `${naturalHeightRef.current}px`;
			el.style.paddingTop = naturalPaddingRef.current.top;
			el.style.paddingBottom = naturalPaddingRef.current.bottom;

			const onEnd = () => {
				// スタイルを解放（height: auto に戻す）
				el.style.height = "";
				el.style.overflow = "";
				el.style.transition = "";
				// ✅ "" ではなく保存した値に戻す
				el.style.paddingTop = naturalPaddingRef.current.top;
				el.style.paddingBottom = naturalPaddingRef.current.bottom;
				el.removeEventListener("transitionend", onEnd);
				currentTransitionEndRef.current = null;
				isAnimatingRef.current = false;
			};
			currentTransitionEndRef.current = onEnd;
			el.addEventListener("transitionend", onEnd);
		};

		// ── 開く ──────────────────────────────────────────

		if (isOpen) {
			if (!isFirstTime) {
				openWithAnimation();
			}
			return;
		}

		// ── 閉じる ────────────────────────────────────────

		if (isAnimatingRef.current) return; // アニメーション中は再トリガーしない

		const saveNaturalState = () => {
			naturalHeightRef.current = el.offsetHeight;
			naturalPaddingRef.current = {
				top: el.style.paddingTop,
				bottom: el.style.paddingBottom,
			};
		};

		const applyClose = () => {
			saveNaturalState();
			isFirstTime ? closeImmediately() : closeWithAnimation();
		};

		// style が適用されてから閉じる
		const applyCloseWhenStyleReady = () => {
			if (el.style.paddingTop) {
				applyClose();
				return;
			}
			let applied = false;
			const mutObserver = new MutationObserver(() => {
				if (applied) return;
				applied = true;
				mutObserver.disconnect();
				applyClose();
			});
			mutObserver.observe(el, { attributes: true, attributeFilter: ["style"] });
			// フォールバック：2フレーム後に強制実行
			requestAnimationFrame(() =>
				requestAnimationFrame(() => {
					if (!applied) {
						applied = true;
						mutObserver.disconnect();
						applyClose();
					}
				}),
			);
		};

		// ResizeObserver で高さが確定するまで待つ
		let resizeObserver = undefined;

		if (el.offsetHeight > 0) {
			applyCloseWhenStyleReady();
		} else {
			let hasTriggered = false;
			resizeObserver = new ResizeObserver(() => {
				if (el.offsetHeight > 0 && !hasTriggered) {
					hasTriggered = true;
					resizeObserver?.disconnect();
					applyCloseWhenStyleReady();
				}
			});
			resizeObserver.observe(el);
		}

		return () => resizeObserver?.disconnect();
	}, [stretchInfo?.isOpen, stretchClientId]);

	function renderContent() {
		// ボタンの中身を変数に格納
		const buttonContent = (
			<button
				type={buttonType}
				disabled={disabled}
				data-key={buttonKey}
				// onMouseDown={(e) => {
				// 	// これにより、クリックしても親ブロックの選択状態が解除されず、
				// 	// かつこのボタンを持つインナーブロックが「選択」されるのを防ぎます
				// 	e.preventDefault();
				// }}
				onClick={(e) => {
					if (isEditing) {
						e.preventDefault();
						return;
					}
					setAttributes({ isClick: !isClick });
					//ボタンのリンクタイプがstretchの場合
					if (linkKind === "stretch") {
						const newIsOpen = !stretchInfo.isOpen;
						setAttributes({
							stretchInfo: { ...stretchInfo, isOpen: newIsOpen },
						});
					}
				}}
			>
				{displayType === "string" &&
					(linkKind === "stretch" ? (
						<>
							<div>
								{stretchInfo.isOpen
									? stretchInfo.openText
									: stretchInfo.closeText}
							</div>
							<div className="pseudo" />
						</>
					) : (
						<RichText
							onChange={(newContent) => {
								setAttributes({ labelContent: newContent });
							}}
							value={labelContent}
							placeholder={__("Button Name...", "block-collections")}
						/>
					))}
				{displayType === "image" && (
					<SingleImageSelect
						attributes={attributes}
						onSelectChange={(media) => {
							setAttributes({ media: media, mediaID: media.id });
						}}
					/>
				)}

				{displayType === "pseudo" && <div className={displayType} />}
			</button>
		);
		return is_tooltip ? (
			<StyleTooltips attributes={tooltip_style} tooltip={tooltip_text}>
				{buttonContent}
			</StyleTooltips>
		) : (
			buttonContent
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Button Type setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<label className="components-base-control__label">
						{__("Select Button Type", "block-collections")}
					</label>
					<PanelRow className="itmar_select_row">
						<RadioControl
							selected={buttonType}
							options={[
								{ label: __("Button", "block-collections"), value: "button" },
								{ label: __("Submit", "block-collections"), value: "submit" },
							]}
							onChange={(changeOption) => {
								setAttributes({ buttonType: changeOption });
							}}
						/>
					</PanelRow>

					<div className="itmar_link_type">
						<RadioControl
							label={__("Link type", "block-collections")}
							selected={linkKind}
							options={[
								{
									label: __("Fixed Page", "block-collections"),
									value: "fixed",
								},
								{
									label: __("Archive Page", "block-collections"),
									value: "archive",
								},
								{ label: __("Free URL", "block-collections"), value: "free" },
								{
									label: __("Close Modal", "block-collections"),
									value: "close",
								},
								{
									label: __("Stretchable", "block-collections"),
									value: "stretch",
								},
								{
									label: __("Back Page", "block-collections"),
									value: "back",
								},
								{ label: __("No Link", "block-collections"), value: "none" },
							]}
							onChange={(changeOption) =>
								setAttributes({ linkKind: changeOption })
							}
							help={
								linkKind === "fixed"
									? __("Link to the selected fixed page.", "block-collections")
									: linkKind === "archive"
									? __("Link to the selected archive page", "block-collections")
									: linkKind === "free"
									? __(
											"Enter the URL freely. If you add [home_url]/ at the beginning, it will become the URL from the top of the site.",
											"block-collections",
									  )
									: linkKind === "close"
									? __(
											"Hides child elements with the specified ID or class name. If not specified, hides the parent element of the button.",
											"block-collections",
									  )
									: ""
							}
						/>
					</div>

					{linkKind === "fixed" && (
						<PageSelectControl
							selectedSlug={selectedSlug}
							label={__("Select a fixed page to link to", "block-collections")}
							homeUrl={itmar_option.home_url}
							onChange={(pageInfo) => {
								if (pageInfo) {
									setAttributes({
										selectedSlug: pageInfo.slug,
										selectedPageUrl: pageInfo.link,
									});
								}
							}}
						/>
					)}
					{linkKind === "archive" && (
						<ArchiveSelectControl
							selectedSlug={selectedSlug}
							label={__("Select archive page to link to", "block-collections")}
							homeUrl={itmar_option.home_url}
							onChange={(postInfo) => {
								setAttributes({
									selectedSlug: postInfo.slug,
									selectedPageUrl: postInfo.link,
								});
							}}
						/>
					)}
					{linkKind === "free" && (
						<TextControl
							label={__("Link to URL", "block-collections")}
							labelPosition="top"
							value={selectedPageUrl}
							onChange={(newValue) => {
								setAttributes({ selectedPageUrl: newValue });
							}}
						/>
					)}

					{linkKind === "close" && (
						<TextControl
							label={__("Modal Child ID or ClassName", "block-collections")}
							labelPosition="top"
							value={modalClassName}
							onChange={(newValue) => {
								setAttributes({ modalClassName: newValue });
							}}
						/>
					)}

					{linkKind === "stretch" && (
						<PanelBody
							title={__("Stretch setting", "block-collections")}
							initialOpen={true}
						>
							<TextControl
								label={__("Target ID", "block-collections")}
								value={stretchInfo.groupId}
								onChange={(newValue) => {
									setAttributes({
										stretchInfo: { ...stretchInfo, groupId: newValue },
									});
								}}
							/>
							<ToggleControl
								label={__("Is Arrow Display", "block-collections")}
								checked={stretchInfo.isArrow}
								onChange={(newVal) => {
									setAttributes({
										stretchInfo: { ...stretchInfo, isArrow: newValue },
									});
								}}
							/>
							<TextControl
								label={__("Open Button Text", "block-collections")}
								value={stretchInfo.openText}
								onChange={(newValue) => {
									setAttributes({
										stretchInfo: { ...stretchInfo, openText: newValue },
									});
								}}
							/>
							<TextControl
								label={__("Close Button Tex", "block-collections")}
								value={stretchInfo.closeText}
								onChange={(newValue) => {
									setAttributes({
										stretchInfo: { ...stretchInfo, closeText: newValue },
									});
								}}
							/>
						</PanelBody>
					)}

					{linkKind !== "none" &&
						linkKind !== "close" &&
						linkKind !== "back" &&
						linkKind !== "stretch" && (
							<ToggleControl
								label={__("Open in new tab", "block-collections")}
								checked={isBlank}
								onChange={(newVal) => {
									setAttributes({ isBlank: newVal });
								}}
							/>
						)}

					<TextControl
						label={__("Button Identification Key", "block-collections")}
						value={buttonKey}
						onChange={(newVal) => setAttributes({ buttonKey: newVal })}
					/>
				</PanelBody>
				<PanelBody
					title={__("Display Type setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<div className="itmar_link_type">
						<RadioControl
							selected={displayType}
							options={[
								{ label: __("String", "block-collections"), value: "string" },
								{ label: __("Image", "block-collections"), value: "image" },
								{ label: __("Pseudo", "block-collections"), value: "pseudo" },
								{ label: __("Icon", "block-collections"), value: "icon" },
							]}
							onChange={(changeOption) => {
								setAttributes({ displayType: changeOption });
							}}
						/>
						{displayType === "pseudo" && (
							<PseudoElm
								element="Arrow"
								direction={pseudoInfo.option}
								onChange={(direction) => {
									setAttributes({
										pseudoInfo: { ...pseudoInfo, option: direction },
									});
								}}
							/>
						)}
						{displayType === "icon" && (
							<IconSelectControl
								iconStyle={iconStyle}
								setPosition={false}
								onChange={(newValue) => {
									setAttributes({ iconStyle: newValue });
								}}
							/>
						)}
					</div>
				</PanelBody>
				<PanelBody
					title={__("Tool Hint setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<ToggleControl
						label={__("Is Tool Hint", "block-collections")}
						checked={is_tooltip}
						onChange={(newVal) => {
							setAttributes({ is_tooltip: newVal });
						}}
					/>
					{is_tooltip && (
						<>
							<TextControl
								label={__("Hint wording", "block-collections")}
								value={tooltip_text}
								onChange={(newVal) => setAttributes({ tooltip_text: newVal })}
							/>
							<ToolTips
								attributes={tooltip_style}
								isMobile={isMobile}
								onChange={(newValue) => {
									setAttributes({ tooltip_style: newValue });
								}}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="button_design_ctrl"
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
						]}
					/>

					<RangeControl
						value={disableOpacity}
						label={__("Disabled Opacity", "block-collections")}
						max={1}
						min={0}
						step={0.1}
						onChange={(val) => setAttributes({ disableOpacity: val })}
					/>
					<PanelBody
						title={
							!isMobile
								? __("Scale settings(desk top)", "block-collections")
								: __("Scale settings(mobile)", "block-collections")
						}
						initialOpen={true}
					>
						<PanelRow className="distance_row">
							<UnitControl
								dragDirection="e"
								onChange={(value) => {
									if (!isMobile) {
										setAttributes({
											default_pos: { ...default_pos, width: value },
										});
									} else {
										setAttributes({
											mobile_pos: { ...mobile_pos, width: value },
										});
									}
								}}
								label={__("Width", "block-collections")}
								value={
									!isMobile
										? default_pos.width || "auto"
										: mobile_pos.width || "auto"
								}
							/>
							<UnitControl
								dragDirection="e"
								onChange={(value) => {
									if (!isMobile) {
										setAttributes({
											default_pos: { ...default_pos, height: value },
										});
									} else {
										setAttributes({
											mobile_pos: { ...mobile_pos, height: value },
										});
									}
								}}
								label={__("Height", "block-collections")}
								value={
									!isMobile
										? default_pos.height || "auto"
										: mobile_pos.height || "auto"
								}
							/>
						</PanelRow>
					</PanelBody>
					<p>{__("Button alignment", "block-collections")}</p>
					<ToolbarGroup>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={outer_align === "left"}
									onClick={() => setAttributes({ outer_align: "left" })}
									icon={justifyLeft}
									label={__("left alignment", "block-collections")}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={outer_align === "center"}
									onClick={() => setAttributes({ outer_align: "center" })}
									icon={justifyCenter}
									label={__("center alignment", "block-collections")}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={outer_align === "right"}
									onClick={() => setAttributes({ outer_align: "right" })}
									icon={justifyRight}
									label={__("right alignment", "block-collections")}
								/>
							)}
						</ToolbarItem>
					</ToolbarGroup>
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
							units={units} // 許可する単位
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
					title={__("Button style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_label}
						isMobile={isMobile}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle });
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Label Color Setting", "block-collections")}
						settings={[
							{
								colorValue: labelColor,
								label: __("Choose Input color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ labelColor: newValue }),
							},
							{
								colorValue: disableLabelColor,
								label: __("Choose Disabled Input color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ disableLabelColor: newValue }),
							},
							{
								colorValue: buttonColor,
								gradientValue: buttonGradient,
								label: __(
									"Choose Button Background color",
									"block-collections",
								),
								onColorChange: (newValue) => {
									setAttributes({
										buttonColor: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ buttonGradient: newValue }),
							},
							{
								colorValue: disableButtonColor,
								gradientValue: disableButtonGradient,
								label: __(
									"Choose Disable Button Background color",
									"block-collections",
								),
								onColorChange: (newValue) => {
									setAttributes({
										disableButtonColor: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ disableButtonGradient: newValue }),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={(nextAlign) => {
						setAttributes({ align: nextAlign });
					}}
				/>
				{displayType === "string" && (
					<ToolbarButton
						icon={isEditing ? "saved" : "edit"}
						label={
							isEditing
								? __("Finish Editing", "block-collections")
								: __("Edit Label", "block-collections")
						}
						onClick={() => setAttributes({ isEditing: !isEditing })}
						isPressed={isEditing}
					/>
				)}
			</BlockControls>

			<div {...blockProps}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>
		</>
	);
}
