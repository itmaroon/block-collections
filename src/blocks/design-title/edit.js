import { __ } from "@wordpress/i18n";

import {
	useIsIframeMobile,
	useElementStyleObject,
	ShadowStyle,
	align_prm,
	ShadowElm,
	PageSelectControl,
	ArchiveSelectControl,
	IconSelectControl,
	TypographyControls,
	isValidUrlWithUrlApi,
	FormatSelectControl,
	displayFormated,
} from "itmar-block-packages";

import { StyleComp } from "./StyleWapper";
import apiFetch from "@wordpress/api-fetch";
import { useStyleIframe } from "../iframeFooks";

import {
	Button,
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	RadioControl,
	Modal,
	DateTimePicker,
	TextControl,
	ToolbarDropdownMenu,
	SelectControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from "@wordpress/components";
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import "./editor.scss";
import { useEffect, useState, useRef } from "@wordpress/element";
import { useSelect, dispatch } from "@wordpress/data";
import { format, getSettings } from "@wordpress/date";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "10px",
	left: "10px",
	right: "10px",
	bottom: "10px",
};

//リセットバリュー

const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

//日付のフォーマット
const dateFormats = [
	{ label: "YYYY-MM-DD HH:mm:ss", value: "Y-m-d H:i:s" },
	{ label: "MM/DD/YYYY", value: "m/d/Y" },
	{ label: "DD/MM/YYYY", value: "d/m/Y" },
	{ label: "MMMM D, YYYY", value: "F j, Y" },
	{ label: "HH:mm:ss", value: "H:i:s" },
	{ label: "YYYY.M.D", value: "Y.n.j" },
	{ label: "Day, MMMM D, YYYY", value: "l, F j, Y" },
	{ label: "ddd, MMM D, YYYY", value: "D, M j, Y" },
	{ label: "YYYY年M月D日 (曜日)", value: "Y年n月j日 (l)" },
];
//プレーンのフォーマット
const plaineFormats = [
	{
		key: "str_free",
		label: __("Free String", "block-collections"),
		value: "%s",
	},
	{
		key: "num_comma",
		label: __("Numbers (comma separated)", "block-collections"),
		value: {
			style: "decimal",
			useGrouping: true, // カンマ区切り
		},
	},
	{
		key: "num_no_comma",
		label: __("Numbers (no commas)", "block-collections"),
		value: {
			style: "decimal",
			useGrouping: false,
		},
	},
	{
		key: "num_amount",
		label: __("Amount", "block-collections"),
		value: {
			style: "currency",
			currency: "JPY",
		},
	},
];
//ヘッダーレベルアイコン
const getIconForLevel = (level) => {
	return (
		<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
			<text x="0" y="15" fontSize="15" font-weight="bold">{`H${level}`}</text>
		</svg>
	);
};
//コピーの長さ
const measureTextWidth = (text, fontSize, fontFamily) => {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	context.font = `${fontSize} ${fontFamily} `;
	const metrics = context.measureText(text);
	return metrics.width;
};

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		headingContent,
		uniqueID,
		headingType,
		defaultHeadingSize,
		mobileHeadingSize,
		titleType,
		align,
		isVertical,
		padding_heading,
		optionStyle,
		shadow_element,
		is_shadow,
		is_underLine,
		is_wrap,
		underLine_prop,
		bgColor_underLine,
		bgGradient_underLine,
		linkKind,
		menu_pos,
		is_title_menu,
		selectedSlug,
		selectedPageUrl,
		isBlank,
		dateValue,
		userFormat,
		freeStrFormat,
		decimal,
		className,
	} = attributes;

	//テキストの配置
	const align_style = align_prm(align, true);

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);

	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: {
			position: `${is_title_menu ? "relative" : "static"}`,
			...align_style,
		},
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

	//最初の状態
	const prevClassRef = useRef(null);

	// ローカル状態の作成
	const [localOptionStyle, setLocalOptionStyle] = useState(optionStyle);

	// localOptionStyle の変更があるたびに setAttributes を呼び出す
	useEffect(() => {
		let textWidth;
		if (optionStyle?.copy_content) {
			// textWidthの計算
			textWidth = measureTextWidth(
				optionStyle.copy_content,
				optionStyle.font_style_copy?.fontSize,
				optionStyle.font_style_copy?.fontFamily,
			);
		}
		const setOption = optionStyle?.copy_content
			? { ...localOptionStyle, copy_width: textWidth }
			: localOptionStyle;

		setAttributes({ optionStyle: setOption });
	}, [localOptionStyle]);

	// titleTypeの変更があるたびに titleの内容を変える
	const [siteTitle, setSiteTitle] = useState("");
	useEffect(() => {
		if (titleType === "site" || titleType === "catch") {
			const fetchSiteInfo = async () => {
				try {
					const response = await apiFetch({ path: "/" });
					if (titleType === "site") {
						setSiteTitle(response.name);
					} else {
						setSiteTitle(response.description);
					}
				} catch (error) {
					console.error("Error fetching data:", error.message);
				}
			};
			fetchSiteInfo();
		} else if (titleType === "user") {
			async function fetchUserName() {
				try {
					const res = await apiFetch({ path: "/itmar/v1/current-user" });

					const name = res.is_logged_in
						? res.display_name
						: __("Guest", "block-collections");
					//setSiteTitle(`ようこそ、${name} さん`);
					setSiteTitle(freeStrFormat.replace("%s", name));
					//アバターの情報をオプションスタイルに渡しておく
					if (optionStyle) {
						optionStyle.icon_style = {
							...optionStyle?.icon_style,
							icon_type: "avatar",
							avatar_url: res.avatar_url,
						};
					}
				} catch (error) {
					console.error("Error fetching data:", error.message);
				}
			}

			fetchUserName();
		} else {
			const formatedValue = displayFormated(
				headingContent,
				userFormat,
				freeStrFormat,
				decimal,
			);
			setHeadingContentVal(formatedValue);
		}
	}, [titleType, userFormat, freeStrFormat, decimal]);

	//スタイル変更時のデフォルト再設定
	const execHandle = () => {
		let reset_style;
		if (className?.split(" ").includes("is-style-circle_marker")) {
			reset_style = {
				styleName: "is-style-circle_marker",
				colorVal_circle: "var(--wp--preset--color--accent-1)",
				colorVal_second: "var(--wp--preset--color--accent-2)",
				circleScale: "3em",
				secondScale: "1.5em",
				second_opacity: 0.7,
				first_long: 10,
				first_lat: -5,
				second_long: -10,
				second_lat: 10,
				isSecond: true,
			};
		} else if (className?.split(" ").includes("is-style-sub_copy")) {
			reset_style = {
				styleName: "is-style-sub_copy",
				alignment_copy: "top left",
				color_text_copy: "var(--wp--preset--color--content)",
				color_background_copy: "var(--wp--preset--color--accent-1)",
				copy_content: "SAMPLE",
				copy_width: 0,
				font_style_copy: {
					fontSize: "16px",
					fontFamily: "Arial, sans-serif",
					fontWeight: "500",
					isItalic: false,
				},
				radius_copy: {
					topLeft: "10px",
					topRight: "10px",
					bottomRight: "0px",
					bottomLeft: "0px",
					value: "0px",
				},
				padding_copy: {
					top: "10px",
					left: "10px",
					bottom: "10px",
					right: "10px",
				},
				isIcon: false,
				icon_style: {
					icon_name: "f030",
					icon_pos: "left",
					icon_size: "24px",
					icon_color: "#000",
					icon_space: "5px",
					icon_family: "Font Awesome 6 Free",
				},
			};
			setCopyInputValue("SAMPLE");
		} else {
			reset_style = {};
		}

		setLocalOptionStyle(reset_style);

		//refの更新
		prevClassRef.current = className;
		//確認待ちフラグをオフ
		const removeClass = className.replace(/\bauto_attr_change\b/, "").trim();

		setAttributes({
			isIdle: false,
			className: removeClass,
		});
		//確認ダイアログを消す
		setIsChangeModalOpen(false);
	};

	const cancelHandle = () => {
		//キャンセルが押されたことを記録
		setIsCancelFlg(true);
		//classNameを元に戻す
		setAttributes({ className: prevClassRef.current });
		//確認ダイアログを消す
		setIsChangeModalOpen(false);
	};

	//スタイル変更確認ダイアログ操作関数
	const [isCangeModalOpen, setIsChangeModalOpen] = useState(false);
	const [isCancelFlg, setIsCancelFlg] = useState(false);

	//スタイル変更によるoptionStyleの初期化
	useEffect(() => {
		//最初のレンダリングでは初期化
		if (prevClassRef.current !== null) {
			//auto_attr_changeの取り外しのみの時は処理しない
			// const removeAuto = prevClassRef.current
			// 	.replace(/\bauto_attr_change\b/, "")
			// 	.trim();
			// if (removeAuto === className) {
			// 	return;
			// }
			//isCancelFlgがtrueのときはfalseに戻して何もしない
			if (isCancelFlg) {
				//確認待ちフラグをオン
				//setAttributes({ isIdle: false });
				setIsCancelFlg(false);
				return;
			}
			//itmar_filter_titleがクラス名に含まれていればモーダルは表示しない
			if (
				className?.includes("itmar_filter_title") ||
				className?.includes("itmar_design_crumbs")
			) {
				execHandle();
				return;
			}
			//デフォルトスタイルの時は初期化実行
			if (
				prevClassRef.current?.includes("is-style-default") ||
				!prevClassRef.current?.includes("is-style")
			) {
				execHandle();
				return;
			}
			//確認待ちフラグをオン
			//setAttributes({ isIdle: true });
			//確認ダイアログの表示
			setIsChangeModalOpen(true);
		} else {
			prevClassRef.current = className;
		}
	}, [className]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);
	//iframeにfontawesomeを読み込む
	//useFontawesomeIframe();

	//TextControlの表示用変数

	const [copyInputValue, setCopyInputValue] = useState(
		optionStyle && optionStyle.copy_content !== undefined
			? optionStyle.copy_content
			: "SAMPLE",
	);

	//サブメニュー（インナーブロック）
	const hasSelectedInnerBlock = useSelect(
		(select) => {
			return select("core/block-editor").hasSelectedInnerBlock(clientId, true);
		},
		[clientId],
	); //ブロックの選択状態を把握

	//親ブロックがメニューかサブメニューの判定
	const [menuItemFlg, setMenuItemFlg] = useState(false);
	useSelect(
		(select) => {
			//親IDを取得
			const parentBlockIds =
				select("core/block-editor").getBlockParents(clientId);
			// 各親ブロックを走査
			for (let i = 0; i < parentBlockIds.length; i++) {
				const parentBlock = select("core/block-editor").getBlock(
					parentBlockIds[i],
				);
				if (parentBlock.attributes?.is_menu) {
					setMenuItemFlg(true);
					break;
				}
				if (parentBlock.attributes?.is_submenu) {
					setMenuItemFlg(true);
					break;
				}
			}
		},
		[clientId],
	);

	//メニューアイテムフラグをオンにする
	useEffect(() => {
		setAttributes({ isMenuItem: menuItemFlg });
	}, [menuItemFlg]);

	const subMenuBlocksProps = useInnerBlocksProps(
		{
			className: `submenu-block ${
				hasSelectedInnerBlock ? "visible" : ""
			} ${menu_pos.replace(/ /g, "_")} ${
				!is_title_menu ? "mobile_horizen" : "mobile_virtical"
			}`,
		},
		{
			allowedBlocks: ["itmar/design-group"],
			template: [
				[
					"itmar/design-group",
					{ is_submenu: true },
					[["itmar/design-title", { headingType: "H3" }]],
				],
			],
			templateLock: false,
		},
	);

	const [headingContentVal, setHeadingContentVal] = useState(headingContent);

	//リッチテキストをコンテンツにする
	const renderRichText = () => {
		return (
			<RichText
				tagName={headingType}
				onChange={(newContent) => {
					setAttributes({ headingContent: newContent });
					let processedContent;

					//リッチテキストの戻り値がオブジェクトの場合に対応
					if (typeof newContent === "object" && newContent !== null) {
						// オブジェクトの場合、textプロパティを使用
						processedContent = newContent.text || "";
					} else {
						// 文字列の場合はそのまま使用
						processedContent = newContent;
					}
					setHeadingContentVal(processedContent);
				}}
				onFocus={() => {
					if (titleType === "date") {
						//タイトルタイプがdateの時は日付入力ダイアログをだす
						setIsDateModal(true);
					}
				}}
				onBlur={() => {
					//URLバリデーションチェック
					if (linkKind === "url") {
						if (!isValidUrlWithUrlApi(headingContentVal)) {
							dispatch("core/notices").createNotice(
								"error",
								__(
									"The input string is not in URL format.",
									"block-collections",
								),
								{ type: "snackbar", isDismissible: true },
							);
							// バリデーションエラーがある場合、表示を元の値に戻す
							setHeadingContentVal(headingContent);
						} else {
							//URLの形式を確認してリンク先をセット
							setAttributes({
								headingContent: headingContentVal,
								selectedPageUrl: headingContentVal,
							});
						}
					} else {
						//setAttributes({ headingContent: headingContentVal });
					}
				}}
				value={headingContentVal}
				placeholder={__("Write Title text...", "block-collections")}
				keepPlaceholderOnFocus={true}
			/>
		);
	};

	//ヘッダー要素をコンテンツにする
	const renderElement = () => {
		const headingTag = headingType.toLowerCase();
		const heading = React.createElement(headingTag, {}, siteTitle);
		return heading;
	};

	//コンテンツを返す
	function renderContent() {
		const iconType = optionStyle?.icon_style?.icon_type;
		const iconUrl = optionStyle?.icon_style?.icon_url;
		const avatarUrl = optionStyle?.icon_style?.avatar_url;

		// アイコン画像の条件判定
		const iconImg =
			iconType === "image" && iconUrl
				? React.createElement("img", {
						src: iconUrl,
						alt: "",
						"aria-hidden": true,
				  })
				: iconType === "avatar" && avatarUrl
				? React.createElement("img", {
						src: avatarUrl,
						alt: "",
						"aria-hidden": true,
				  })
				: null;
		//コンテンツの選択
		const content =
			titleType === "plaine" || titleType === "date"
				? renderRichText()
				: renderElement();
		// ラッパーを使わず複数要素を並べる
		if (iconImg) {
			return React.createElement(React.Fragment, {}, content, iconImg);
		} else {
			return content;
		}
	}
	//編集中の値を確保するための状態変数
	const [url_editing, setUrlValue] = useState(selectedPageUrl);
	//日付入力用のダイアログ表示用フラグ
	const [isDateModal, setIsDateModal] = useState(false);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Title Source Setting", "block-collections")}>
					<div className="itmar_title_type">
						<RadioControl
							label={__("Title type", "block-collections")}
							selected={titleType}
							options={[
								{ label: __("Plaine", "block-collections"), value: "plaine" },
								{ label: __("Date", "block-collections"), value: "date" },
								{ label: __("Site Title", "block-collections"), value: "site" },
								{
									label: __("Chatch Phrase", "block-collections"),
									value: "catch",
								},
								{
									label: __("Login User", "block-collections"),
									value: "user",
								},
							]}
							onChange={(changeOption) =>
								setAttributes({ titleType: changeOption })
							}
							help={
								titleType === "site" || titleType === "catch"
									? __(
											"The Site Title and Chatch Phrase provide the ability to display whatever you set in the WordPress General Settings.",
											"block-collections",
									  )
									: titleType === "date"
									? __(
											"Select the date format from the select box.",
											"block-collections",
									  )
									: titleType === "user"
									? __(
											"Please enter the string to display. User name should be %s.",
											"block-collections",
									  )
									: ""
							}
						/>
						<FormatSelectControl
							titleType={titleType}
							userFormat={userFormat}
							freeStrFormat={freeStrFormat}
							decimal={decimal}
							onFormatChange={(formatInfo) => {
								setAttributes({
									userFormat: formatInfo.userFormat,
									freeStrFormat: formatInfo.freeStrFormat,
									decimal: formatInfo.decimal,
								});
							}}
						/>
					</div>

					<div className="itmar_link_type">
						<RadioControl
							label={__("Link type", "block-collections")}
							selected={linkKind}
							options={[
								{ label: __("None", "block-collections"), value: "none" },
								{
									label: __("Fixed Page", "block-collections"),
									value: "fixed",
								},
								{
									label: __("Archive Page", "block-collections"),
									value: "archive",
								},
								{ label: __("Free Link", "block-collections"), value: "free" },
								{ label: __("URL", "block-collections"), value: "url" },
								{ label: __("Login", "block-collections"), value: "login" },
								{
									label: __("Sub Menu", "block-collections"),
									value: "submenu",
								},
							]}
							onChange={(changeOption) => {
								if (changeOption === "url") {
									//リンク種別がURLの場合
									//URLのバリデーションチェック
									if (isValidUrlWithUrlApi(headingContent)) {
										setAttributes({ linkKind: changeOption });
										//してリンク先に設定
										setAttributes({ selectedPageUrl: headingContent });
									} else {
										//エラーの通知
										dispatch("core/notices").createNotice(
											"error",
											__(
												"The input string is not in URL format.",
												"block-collections",
											),
											{ type: "snackbar", isDismissible: true },
										);
									}
								} else {
									setAttributes({ linkKind: changeOption });
								}
							}}
							help={__(
								"You can select the type of URL to link to the title. If you add a line break to the Login title text, the upper line will be the text displayed when logged in and the lower line will be the text displayed when logged out.",
								"block-collections",
							)}
						/>
					</div>

					{(linkKind === "fixed" || linkKind === "login") && (
						<PageSelectControl
							selectedSlug={selectedSlug}
							label={
								linkKind === "fixed"
									? __("Select a fixed page to link to", "block-collections")
									: __(
											"Choose a static page to display when you log in (Home will display the built-in login page).",
											"block-collections",
									  )
							}
							homeUrl="[home_url]"
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
							homeUrl="[home_url]"
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
							label={__("Link URL", "block-collections")}
							labelPosition="top"
							value={url_editing}
							onChange={(newVal) => setUrlValue(newVal)} // 一時的な編集値として保存する
							onBlur={() => {
								//URLバリデーションチェック
								if (!isValidUrlWithUrlApi(url_editing)) {
									dispatch("core/notices").createNotice(
										"error",
										__(
											"The input string is not in URL format.",
											"block-collections",
										),
										{ type: "snackbar", isDismissible: true },
									);
									// バリデーションエラーがある場合、編集値を元の値にリセットする
									setUrlValue(selectedPageUrl);
								} else {
									// バリデーションが成功した場合、編集値を確定する
									setAttributes({ selectedPageUrl: url_editing });
								}
							}}
						/>
					)}
					{(linkKind === "fixed" ||
						linkKind === "archive" ||
						linkKind === "url" ||
						linkKind === "free") && (
						<ToggleControl
							label={__("Open in new tab", "block-collections")}
							checked={isBlank}
							onChange={(newVal) => {
								setAttributes({ isBlank: newVal });
							}}
						/>
					)}
					{linkKind === "submenu" && (
						<PanelBody
							title={__("Submenu position settings", "block-collections")}
						>
							<PanelRow className="imgPos_row">
								<label>{__("Menu Alignment", "block-collections")}</label>
								<AlignmentMatrixControl
									value={menu_pos}
									onChange={(newVal) => {
										setAttributes({ menu_pos: newVal });
									}}
								/>
							</PanelRow>
							<ToggleControl
								label={__("Based on title", "block-collections")}
								checked={is_title_menu}
								help={__(
									"If unchecked, the parent menu will be used as the reference. If there is no parent menu, do not uncheck it.",
									"block-collections",
								)}
								onChange={(newVal) => {
									setAttributes({ is_title_menu: newVal });
								}}
							/>
						</PanelBody>
					)}
					<TextControl
						label={__("Unique ID", "block-collections")}
						value={uniqueID}
						help={__(
							"Set an ID for this block. Since this is an ID, please be careful not to duplicate it on the page by duplicating it, etc.",
							"block-collections",
						)}
						onChange={(newValue) => {
							setAttributes({ uniqueID: newValue });
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={__("Title settings", "block-collections")}
					initialOpen={true}
					className="title_design_ctrl"
				>
					<UnitControl
						dragDirection="e"
						onChange={(value) =>
							setAttributes(
								!isMobile
									? { defaultHeadingSize: value }
									: { mobileHeadingSize: value },
							)
						}
						label={
							!isMobile
								? __("Font Size(desk top)", "block-collections")
								: __("Font Size(mobile)", "block-collections")
						}
						value={!isMobile ? defaultHeadingSize : mobileHeadingSize}
					/>
					<BoxControl
						label={__("Padding", "block-collections")}
						values={padding_heading}
						onChange={(value) => setAttributes({ padding_heading: value })}
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
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState });
							}}
						/>
					)}

					<ToggleControl
						label={__("Add an underline", "block-collections")}
						checked={is_underLine}
						onChange={(newVal) => {
							setAttributes({ is_underLine: newVal });
						}}
					/>
					{is_underLine && (
						<PanelBody
							title={__("UnderLine settings", "block-collections")}
							initialOpen={true}
							className="title_design_ctrl"
						>
							<PanelRow className="distance_row">
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										const newStyle = { ...underLine_prop, height: newValue };
										setAttributes({ underLine_prop: newStyle });
									}}
									label={__("Height", "block-collections")}
									value={underLine_prop.height}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										const newStyle = { ...underLine_prop, width: newValue };
										setAttributes({ underLine_prop: newStyle });
									}}
									label={__("Width", "block-collections")}
									value={underLine_prop.width}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										const newStyle = { ...underLine_prop, distance: newValue };
										setAttributes({ underLine_prop: newStyle });
									}}
									label={__("Distance", "block-collections")}
									value={underLine_prop.distance}
								/>
							</PanelRow>
							<PanelColorGradientSettings
								title={__("Under Line Color Setting", "block-collections")}
								settings={[
									{
										colorValue: bgColor_underLine,
										gradientValue: bgGradient_underLine,
										label: __("Choose Under Line color", "block-collections"),

										onColorChange: (newValue) => {
											setAttributes({
												bgColor_underLine:
													newValue === undefined ? "" : newValue,
											});
										},
										onGradientChange: (newValue) => {
											setAttributes({ bgGradient_underLine: newValue });
										},
									},
								]}
							/>
							<ToggleControl
								label={__("Animation on hover", "block-collections")}
								checked={underLine_prop.is_anime}
								onChange={(newVal) => {
									const newStyle = { ...underLine_prop, is_anime: newVal };
									setAttributes({ underLine_prop: newStyle });
								}}
							/>
						</PanelBody>
					)}
					<ToggleControl
						label={__("Write vertically", "block-collections")}
						checked={isVertical}
						onChange={(newVal) => {
							setAttributes({ isVertical: newVal });
						}}
					/>
					<ToggleControl
						label={__("Wrap display", "block-collections")}
						checked={is_wrap}
						onChange={(newVal) => {
							setAttributes({ is_wrap: newVal });
						}}
					/>
				</PanelBody>

				{className?.split(" ").includes("is-style-circle_marker") && (
					<PanelBody
						title={__("Circle Marker Settings", "block-collections")}
						initialOpen={false}
						className="title_design_ctrl"
					>
						<PanelColorGradientSettings
							title={__("Circle Color Setting", "block-collections")}
							settings={[
								{
									colorValue:
										optionStyle && optionStyle.colorVal_circle
											? optionStyle.colorVal_circle
											: "var(--wp--preset--color--accent-1)",
									gradientValue:
										optionStyle && optionStyle.gradientVal_circle
											? optionStyle.gradientVal_circle
											: undefined,

									label: __("Choose Circle Background", "block-collections"),
									onColorChange: (newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											colorVal_circle: newValue,
										}));
									},
									onGradientChange: (newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											gradientVal_circle: newValue,
										}));
									},
								},
							]}
						/>

						<UnitControl
							dragDirection="e"
							onChange={(newValue) => {
								setLocalOptionStyle((prev) => ({
									...prev,
									circleScale: newValue,
								}));
							}}
							label={__("Circle Scale Setting", "block-collections")}
							value={
								optionStyle && optionStyle.circleScale
									? optionStyle.circleScale
									: "3em"
							}
						/>
						<PanelBody
							title={__("Position Settings", "block-collections")}
							initialOpen={true}
							className="title_design_ctrl"
						>
							<RangeControl
								value={
									optionStyle && optionStyle.first_lat
										? optionStyle.first_lat
										: 10
								}
								label={__("Lateral direction", "block-collections")}
								max={50}
								min={-30}
								step={1}
								onChange={(newValue) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										first_lat: newValue,
									}));
								}}
								withInputField={false}
							/>
							<RangeControl
								value={
									optionStyle && optionStyle.first_long
										? optionStyle.first_long
										: 10
								}
								label={__("Longitudinal direction", "block-collections")}
								max={50}
								min={-30}
								step={1}
								onChange={(newValue) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										first_long: newValue,
									}));
								}}
								withInputField={false}
							/>
						</PanelBody>
						<PanelBody
							title={__("Second Circle Settings", "block-collections")}
							initialOpen={true}
						>
							<ToggleControl
								label={__("Second Circle", "block-collections")}
								checked={
									optionStyle && optionStyle.isSecond
										? optionStyle.isSecond
										: true
								}
								onChange={(newValue) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										isSecond: newValue,
									}));
								}}
							/>
						</PanelBody>
						{(optionStyle && optionStyle.isSecond
							? optionStyle.isSecond
							: false) && (
							<>
								<PanelColorGradientSettings
									title={__("Circle Color Setting", "block-collections")}
									settings={[
										{
											colorValue:
												optionStyle && optionStyle.colorVal_second
													? optionStyle.colorVal_second
													: "var(--wp--preset--color--accent-2)",
											gradientValue:
												optionStyle && optionStyle.gradientVal_second
													? optionStyle.gradientVal_second
													: undefined,

											label: __(
												"Choose Circle Background",
												"block-collections",
											),
											onColorChange: (newValue) => {
												setLocalOptionStyle((prev) => ({
													...prev,
													colorVal_second: newValue,
												}));
											},
											onGradientChange: (newValue) => {
												setLocalOptionStyle((prev) => ({
													...prev,
													gradientVal_second: newValue,
												}));
											},
										},
									]}
								/>
								<RangeControl
									value={
										optionStyle && optionStyle.second_opacity
											? optionStyle.second_opacity
											: 0.7
									}
									label={__("Opacity", "block-collections")}
									max={1}
									min={0.1}
									step={0.1}
									onChange={(newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											second_opacity: newValue,
										}));
									}}
									withInputField={false}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											secondScale: newValue,
										}));
									}}
									label={__("Circle Scale Setting", "block-collections")}
									value={
										optionStyle && optionStyle.secondScale
											? optionStyle.secondScale
											: "1.5em"
									}
								/>
								<PanelBody
									title={__("Position Settings", "block-collections")}
									initialOpen={true}
									className="title_design_ctrl"
								>
									<RangeControl
										value={
											optionStyle && optionStyle.second_lat
												? optionStyle.second_lat
												: 20
										}
										label={__("Lateral direction", "block-collections")}
										max={50}
										min={-30}
										step={1}
										onChange={(newValue) => {
											setLocalOptionStyle((prev) => ({
												...prev,
												second_lat: newValue,
											}));
										}}
										withInputField={false}
									/>
									<RangeControl
										value={
											optionStyle && optionStyle.second_long
												? optionStyle.second_long
												: -10
										}
										label={__("Longitudinal direction", "block-collections")}
										max={50}
										min={-30}
										step={1}
										onChange={(newValue) => {
											setLocalOptionStyle((prev) => ({
												...prev,
												second_long: newValue,
											}));
										}}
										withInputField={false}
									/>
								</PanelBody>
							</>
						)}
					</PanelBody>
				)}

				{className?.split(" ").includes("is-style-sub_copy") && (
					<PanelBody
						title={__("Sub Copy Settings", "block-collections")}
						initialOpen={false}
						className="title_design_ctrl"
					>
						<PanelColorGradientSettings
							title={__("Copy Color Setting", "block-collections")}
							settings={[
								{
									colorValue:
										optionStyle && optionStyle.color_text_copy
											? optionStyle.color_text_copy
											: "var(--wp--preset--color--content)",
									label: __("Choose Text color", "block-collections"),
									onColorChange: (newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											color_text_copy: newValue,
										}));
									},
								},
								{
									colorValue:
										optionStyle && optionStyle.color_background_copy
											? optionStyle.color_background_copy
											: "var(--wp--preset--color--accent-2)",
									gradientValue:
										optionStyle && optionStyle.gradient_background_copy
											? optionStyle.gradient_background_copy
											: undefined,

									label: __("Choose Background color", "block-collections"),
									onColorChange: (newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											color_background_copy: newValue,
										}));
									},
									onGradientChange: (newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											gradient_background_copy: newValue,
										}));
									},
								},
							]}
						/>

						<PanelRow className="copyInfo_row">
							<TextControl
								label={__("Copy Text", "block-collections")}
								labelPosition="top"
								value={copyInputValue}
								onChange={(newValue) => {
									setCopyInputValue(newValue);
									setLocalOptionStyle((prev) => ({
										...prev,
										copy_content: newValue,
									}));
								}}
							/>
						</PanelRow>
						<PanelRow className="copyInfo_row">
							<label>{__("Copy Alignment", "block-collections")}</label>
							<AlignmentMatrixControl
								value={
									optionStyle && optionStyle.alignment_copy
										? optionStyle.alignment_copy
										: "top left"
								}
								onChange={(newValue) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										alignment_copy: newValue,
									}));
								}}
							/>
						</PanelRow>

						<TypographyControls
							title={__("Typography", "block-collections")}
							fontStyle={
								optionStyle && optionStyle.font_style_copy
									? optionStyle.font_style_copy
									: {
											default_fontSize: "16px",
											mobile_fontSize: "12px",
											fontFamily: "Arial, sans-serif",
											fontWeight: "500",
											isItalic: false,
									  }
							}
							initialOpen={false}
							isMobile={isMobile}
							onChange={(newValue) => {
								setLocalOptionStyle((prev) => ({
									...prev,
									font_style_copy: newValue,
								}));
							}}
						/>

						<PanelBody
							title={__("Border Settings", "block-collections")}
							initialOpen={true}
						>
							<BorderRadiusControl
								values={
									optionStyle && optionStyle.radius_copy
										? optionStyle.radius_copy
										: {
												topLeft: "10px",
												topRight: "10px",
												bottomRight: "0px",
												bottomLeft: "0px",
												value: "0px",
										  }
								}
								onChange={(newBrVal) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										radius_copy:
											typeof newBrVal === "string"
												? { value: newBrVal }
												: newBrVal,
									}));
								}}
							/>

							<BoxControl
								label={__("Padding settings", "block-collections")}
								values={
									optionStyle && optionStyle.padding_copy
										? optionStyle.padding_copy
										: {
												top: "10px",
												left: "10px",
												bottom: "10px",
												right: "10px",
										  }
								}
								onChange={(newValue) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										padding_copy: newValue,
									}));
								}}
								units={units} // 許可する単位
								allowReset={true} // リセットの可否
								resetValues={padding_resetValues} // リセット時の値
							/>
						</PanelBody>
						<PanelBody
							title={__("Icon settings", "block-collections")}
							initialOpen={true}
						>
							<ToggleControl
								label={__("Append icon", "block-collections")}
								checked={
									optionStyle && optionStyle.isIcon ? optionStyle.isIcon : false
								}
								onChange={(newValue) => {
									setLocalOptionStyle((prev) => ({
										...prev,
										isIcon: newValue,
									}));
								}}
							/>
							{(optionStyle && optionStyle.isIcon
								? optionStyle.isIcon
								: false) && (
								<IconSelectControl
									iconStyle={
										optionStyle && optionStyle.icon_style
											? optionStyle.icon_style
											: {
													icon_type: "awesome",
													icon_url: "",
													icon_name: "f030",
													icon_pos: "left",
													icon_size: "24px",
													icon_color: "var(--wp--preset--color--content)",
													icon_space: "5px",
											  }
									}
									setPosition={true}
									onChange={(newValue) => {
										setLocalOptionStyle((prev) => ({
											...prev,
											icon_style: newValue,
										}));
									}}
								/>
							)}
						</PanelBody>
					</PanelBody>
				)}
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={(nextAlign) => {
						setAttributes({ align: nextAlign });
					}}
				/>
				<ToolbarDropdownMenu
					label={__("Change heading level", "block-collections")}
					icon={getIconForLevel(parseInt(headingType.slice(1), 10))}
					controls={[1, 2, 3, 4, 5, 6].map((level) => ({
						icon: getIconForLevel(level),
						title: `Heading ${level}`,
						isActive: headingType === `H${level}`,
						onClick: () => setAttributes({ headingType: `H${level}` }),
					}))}
				/>
			</BlockControls>

			{isCangeModalOpen && (
				<Modal
					title={__("Confirm Deletion", "block-collections")}
					onRequestClose={cancelHandle}
				>
					<p>
						{__(
							"Changing a style resets the style-specific settings. Are you sure?",
							"block-collections",
						)}
					</p>
					<Button variant="primary" onClick={execHandle}>
						{__("Yes, Change", "block-collections")}
					</Button>
					<Button variant="secondary" onClick={cancelHandle}>
						{__("Cancel", "block-collections")}
					</Button>
				</Modal>
			)}

			<div {...blockProps}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
				{linkKind === "submenu" && <div {...subMenuBlocksProps}></div>}
				{isDateModal && (
					<Modal
						title={__("Select Date and Time", "block-collections")}
						onRequestClose={() => setIsDateModal(false)}
					>
						<DateTimePicker
							currentDate={dateValue}
							onChange={(newDatetime) => {
								setAttributes({
									headingContent: newDatetime,
								});
								const newDisp = format(userFormat, newDatetime, getSettings());
								setHeadingContentVal(newDisp);
								setIsDateModal(false);
							}}
						/>
						<Button variant="primary" onClick={() => setIsDateModal(false)}>
							Close
						</Button>
					</Modal>
				)}
			</div>
		</>
	);
}
