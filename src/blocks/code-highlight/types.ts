import type { BoxValues } from "../../shared/types";
import type { CSSProperties } from "react";

export interface CodeHighlightAttributes {
	codeArea: string;
	linenums: boolean;
	linenumsStart: number;
	lang: string;
	skin: string;
	fileName: string;
	isEditMode: boolean;
	margin_value: BoxValues;
	padding_value: BoxValues;
	align?: string;
	add_style?: CSSProperties;
}

export interface CodeHighlightEditProps {
	attributes: CodeHighlightAttributes;
	setAttributes: (attributes: Partial<CodeHighlightAttributes>) => void;
}

export interface CodeHighlightSaveProps {
	attributes: CodeHighlightAttributes;
}
