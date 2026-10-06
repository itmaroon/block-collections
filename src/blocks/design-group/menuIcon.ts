import type { IconStyle } from "itmar-block-packages";

/** 「開き方」がアイコンのとき、未設定なら使うアイコン */
export const DEFAULT_MENU_ICON: IconStyle = {
	icon_name: "f0c9",
	icon_size: "24px",
	icon_color: "var(--itmar-content)",
	icon_family: "Font Awesome 6 Free",
};

/**
 * アイコンのボタンへ載せるCSS変数。グリフは ::before の content で出す。
 * style.scss 側が var() で受ける。
 */
export const menuIconVars = (icon?: IconStyle): Record<string, string> => {
	const i = icon ?? DEFAULT_MENU_ICON;
	return {
		"--itmar-menu-icon": `"\\${i.icon_name}"`,
		"--itmar-menu-icon-family": `"${i.icon_family}"`,
		"--itmar-menu-icon-weight":
			i.icon_family === "Font Awesome 6 Free" ? "900" : "400",
		"--itmar-menu-icon-size": i.icon_size,
		"--itmar-menu-icon-color": i.icon_color,
	};
};
