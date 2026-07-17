declare module "*.scss";

declare module "*.svg" {
	import type { ComponentType, SVGProps } from "react";
	export const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
	const source: string;
	export default source;
}
