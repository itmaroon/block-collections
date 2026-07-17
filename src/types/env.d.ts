declare global {
	const itmar_option: {
		home_url: string;
		nonce: string;
		[key: string]: unknown;
	};
}

declare module "*.svg" {
	import type { FC, SVGProps } from "react";

	export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "@wordpress/block-editor" {
	export const __experimentalPanelColorGradientSettings: any;
	export const __experimentalBorderRadiusControl: any;
}

export {};
