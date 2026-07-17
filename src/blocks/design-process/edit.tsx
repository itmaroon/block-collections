import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { StyleComp } from "./StyleProcess";
import {
	TypographyControls,
	ShadowStyle,
	ShadowElm,
	useElementBackgroundColor,
	useIsIframeMobile,
} from "itmar-block-packages";

import {
	useBlockProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import {
	PanelBody,
	ToggleControl,
	BoxControl,
	BorderBoxControl,
} from "@wordpress/components";

import { useSelect, useDispatch } from "@wordpress/data";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { StyleSheetManager } from "styled-components";
import type { BlockInstance } from "@wordpress/blocks";
import type { FigureBlockInfo, ProcessEditProps, RadiusValue } from "./types";
import { toStyleRecord } from "../front-common";

type ShadowState = Parameters<typeof ShadowElm>[0];

interface BlockEditorSelectors {
	getBlockRootClientId: (clientId: string) => string | undefined;
	getBlocks: (rootClientId?: string) => BlockInstance[];
	getBlock: (clientId: string) => BlockInstance | undefined;
}

interface BlockEditorActions {
	removeBlock: (clientId: string) => void;
}

interface NoticesActions {
	createNotice: (
		status: "error" | "warning" | "success" | "info",
		content: string,
		options?: {
			type?: "default" | "snackbar";
			isDismissible?: boolean;
		},
	) => unknown;
}

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

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
}: ProcessEditProps) {
	const {
		bgColor,
		bgColor_form,
		bgGradient_form,
		radius_form,
		border_form,
		default_pos,
		mobile_pos,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process,
		shadow_element,
		is_shadow,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef<HTMLDivElement | null>(null);
	const [styleSheetTarget, setStyleSheetTarget] =
		useState<HTMLHeadElement | null>(null);
	const ownerDocumentRef = useCallback((node: HTMLDivElement | null) => {
		setStyleSheetTarget(node?.ownerDocument.head ?? null);
	}, []);
	const mergedBlockRef = useMergeRefs([blockRef, ownerDocumentRef]);
	const blockProps = useBlockProps({
		ref: mergedBlockRef,
		style: { backgroundColor: bgColor },
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({
				shadow_element: { ...shadow_element, baseColor: baseColor },
			});
			const new_shadow = ShadowElm({
				...(shadow_element as ShadowState),
				baseColor,
			});
			if (new_shadow) {
				setAttributes({
					shadow_result: toStyleRecord(new_shadow.style),
				});
			}
		}
	}, [baseColor]);

	//親のcontextから今のステップ数を取得
	const stage_index = context["itmar/current_step"] ?? 0;

	// 兄弟ブロックの取得。JSON文字列を返し、内容が同じ場合の再レンダーを防ぐ。
	const figureBlocksJson = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlocks, getBlock } = select(
				"core/block-editor",
			) as unknown as BlockEditorSelectors;

			// スタイルプレビューなどでブロックツリーが一時的に未確定なら判定しない。
			if (!getBlock(clientId)) return null;

			// 親ブロックのclientIdを取得
			const parentClientId = getBlockRootClientId(clientId);
			// 兄弟ブロックを取得
			const siblingBlocks = getBlocks(parentClientId);
			// 特定のブロック名のリスト
			const allowedBlocks = [
				"itmar/confirm-figure-block",
				"itmar/input-figure-block",
				"itmar/thanks-figure-block",
			];
			const blocks: FigureBlockInfo[] = siblingBlocks
				.filter(
					(block) =>
						block.clientId !== clientId && allowedBlocks.includes(block.name),
				)
				.map((block) => ({
					block_name: block.name,
					block_type: String(
						block.attributes.info_type || block.attributes.form_type || "",
					),
					stage_info: String(block.attributes.stage_info ?? ""),
				}));

			return JSON.stringify(blocks);
		},
		[clientId],
	);

	const figureBlocks = useMemo<FigureBlockInfo[]>(
		() =>
			figureBlocksJson === null
				? []
				: (JSON.parse(figureBlocksJson) as FigureBlockInfo[]),
		[figureBlocksJson],
	);

	const noticeShownRef = useRef(false);
	const { createNotice } = useDispatch(
		"core/notices",
	) as unknown as NoticesActions;

	// 属性更新とNotice表示はレンダー外で行う。
	useEffect(() => {
		if (figureBlocksJson === null) return;

		if (figureBlocks.length > 0) {
			if (JSON.stringify(attributes.figure_blocks) !== figureBlocksJson) {
				setAttributes({ figure_blocks: figureBlocks });
			}
			noticeShownRef.current = false;
			return;
		}

		// 保存済みの兄弟情報がある場合は、その一時状態を採用しない。
		if (attributes.figure_blocks.length > 0) return;

		const timer = window.setTimeout(() => {
			if (noticeShownRef.current) return;

			createNotice(
				"error",
				__(
					"This block will not work unless the Form Send plugin block is a sibling block.",
					"block-collections",
				),
				{ type: "snackbar", isDismissible: true },
			);
			noticeShownRef.current = true;
		}, 300);

		return () => window.clearTimeout(timer);
	}, [figureBlocksJson, figureBlocks]);

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="form_design_ctrl"
				>
					<PanelColorGradientSettings
						title={__("Background Color Setting", "block-collections")}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", "block-collections"),
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ bgColor: newValue ?? "" }),
							},
							{
								colorValue: bgColor_form,
								gradientValue: bgGradient_form,

								label: __("Choose Form Background color", "block-collections"),
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ bgColor_form: newValue }),
								onGradientChange: (newValue: string | undefined) =>
									setAttributes({ bgGradient_form: newValue }),
							},
						]}
					/>
					<PanelBody
						title={__("Border Settings", "block-collections")}
						initialOpen={false}
						className="border_design_ctrl"
					>
						<BorderBoxControl
							onChange={(newValue) => setAttributes({ border_form: newValue })}
							value={border_form}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_form}
							onChange={(newBrVal: string | RadiusValue | undefined) => {
								if (newBrVal === undefined) return;
								setAttributes({
									radius_form:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								});
							}}
						/>
					</PanelBody>
					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.margin_form : mobile_pos.margin_form
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: {
										...default_pos,
										margin_form: {
											...default_pos.margin_form,
											...value,
										},
									},
								});
							} else {
								setAttributes({
									mobile_pos: {
										...mobile_pos,
										margin_form: {
											...mobile_pos.margin_form,
											...value,
										},
									},
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
							!isMobile ? default_pos.padding_form : mobile_pos.padding_form
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: {
										...default_pos,
										padding_form: {
											...default_pos.padding_form,
											...value,
										},
									},
								});
							} else {
								setAttributes({
									mobile_pos: {
										...mobile_pos,
										padding_form: {
											...mobile_pos.padding_form,
											...value,
										},
									},
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
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
							shadowStyle={shadow_element as ShadowState}
							onChange={(newStyle, newState) => {
								setAttributes({
									shadow_result: toStyleRecord(newStyle.style),
								});
								setAttributes({ shadow_element: newState });
							}}
						/>
					)}
				</PanelBody>

				<PanelBody
					title={__("Settings by style", "block-collections")}
					initialOpen={false}
					className="form_design_ctrl"
				>
					<PanelBody
						title={__("process number", "block-collections")}
						initialOpen={false}
						className="form_design_ctrl"
					>
						<TypographyControls
							title={__("Typography", "block-collections")}
							fontStyle={font_style_num}
							onChange={(newStyle) => {
								setAttributes({ font_style_num: newStyle });
							}}
							isMobile={isMobile}
							initialOpen={false}
						/>
						<PanelColorGradientSettings
							title={__("Color Setting", "block-collections")}
							settings={[
								{
									colorValue: textColor_num,
									label: __("Choose Text color", "block-collections"),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({
											textColor_num: newValue ?? "",
										}),
								},
								{
									colorValue: bgColor_num,
									label: __("Choose background color", "block-collections"),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ bgColor_num: newValue ?? "" }),
								},
							]}
						/>
					</PanelBody>

					<PanelBody
						title={__("Process Display", "block-collections")}
						initialOpen={false}
						className="form_design_ctrl"
					>
						<TypographyControls
							title={__("Typography", "block-collections")}
							fontStyle={font_style_process}
							onChange={(newStyle) => {
								setAttributes({ font_style_process: newStyle });
							}}
							isMobile={isMobile}
							initialOpen={false}
						/>
						<PanelColorGradientSettings
							title={__("Color Setting", "block-collections")}
							settings={[
								{
									colorValue: textColor_process,
									label: __("Choose Text color", "block-collections"),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({
											textColor_process: newValue ?? "",
										}),
								},
							]}
						/>
					</PanelBody>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<StyleSheetManager target={styleSheetTarget ?? undefined}>
					<StyleComp attributes={attributes}>
						{figureBlocks.map((block, index) => (
							<li key={index} className={stage_index >= index ? "ready" : ""}>
								{block.stage_info}
							</li>
						))}
					</StyleComp>
				</StyleSheetManager>
			</div>
		</>
	);
}
