import { styleDataApply } from "itmar-block-packages";
import { createProcessStyleCss } from "./StyleProcess";

styleDataApply(createProcessStyleCss, ".wp-block-itmar-design-process", {
	getTarget: (el) => el.querySelector("ul.itmar-wrap") || el.querySelector("ul") || el,
	classPrefix: "itmar-process-",
	observe: true,
});
