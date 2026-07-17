import { styleDataApply } from "itmar-block-packages";

import { createTableStyleCss } from "./StyleTable";

//保存済み属性から、React非依存のスコープ付きCSSを適用
styleDataApply(createTableStyleCss, ".wp-block-itmar-design-table", {
	target: "self",
	classPrefix: "itmar-table-style-",
	observe: true,
});
