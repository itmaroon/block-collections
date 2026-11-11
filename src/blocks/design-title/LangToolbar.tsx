import * as React from "react";
import { __ } from "@wordpress/i18n";
import {
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from "@wordpress/components";
import { DEFAULT_LANG, setEditLang, type LangOption } from "./lang";

/**
 * 編集する言語の切り替えと、自動翻訳のやり直しボタン。
 * design-button などの、言語ごとの文字を持つブロックのツールバーに置く。
 */
export function LangToolbar({
	langOptions,
	activeLang,
	canAutoTranslate,
	isManual,
	onRetranslate,
}: {
	langOptions: LangOption[];
	activeLang: string;
	canAutoTranslate: boolean;
	isManual: boolean;
	onRetranslate: () => void;
}) {
	return (
		<ToolbarGroup>
			{canAutoTranslate && activeLang !== DEFAULT_LANG && (
				<ToolbarButton
					label={__("Translate again automatically", "block-collections")}
					showTooltip
					onClick={onRetranslate}
				>
					{isManual
						? __("Manual", "block-collections")
						: __("Auto", "block-collections")}
				</ToolbarButton>
			)}
			<ToolbarDropdownMenu
				label={__("Editing language", "block-collections")}
				text={activeLang}
				icon={null}
				controls={langOptions.map((lang) => ({
					title: lang.label,
					isActive: activeLang === lang.value,
					onClick: () => setEditLang(lang.value),
				}))}
			/>
		</ToolbarGroup>
	);
}
