import { __ } from "@wordpress/i18n";
import { styleDataApply } from "itmar-block-packages";

import { createCheckboxStyleCss } from "./StyleCheckbox";

//保存済み属性から、React非依存のスコープ付きCSSを適用
styleDataApply(createCheckboxStyleCss, ".wp-block-itmar-design-checkbox", {
	target: "auto",
	classPrefix: "itmar-checkbox-style-",
	observe: true,
});
