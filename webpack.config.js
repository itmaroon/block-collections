process.env.WP_COPY_PHP_FILES_TO_DIST = true;

const defaultConfig = require("@wordpress/scripts/config/webpack.config");

//const mode = "production"; // この行でproductionモードを指定

//コアブロック拡張モジュールのトランスパイル
const path = require("path");
const newEntryConfig = async () => {
	const originalEntry = await defaultConfig.entry();

	return {
		...originalEntry,
		"gutenberg-ex": path.resolve(__dirname, "./src/gutenberg-ex.tsx"),
		//block_collection: path.resolve(__dirname, "./assets/block_collection.js"),
	};
};

/**
 * SVGを「データURIの文字列」として読むための `?url` 付き import を用意する。
 *
 * wp-scripts の既定は `@svgr/webpack` + `url-loader` で、default export は
 * データURIだが、同じモジュールに React コンポーネント（ReactComponent）も
 * 同居する。そのためビュースクリプトが SVG を1つ import しただけで
 * `view.asset.php` に `react` が依存として書き出され、訪問者に React が
 * 配信されてしまう。
 *
 *     import icon from "./foo.svg?url";   // データURIだけ。Reactは入らない
 *     import Foo from "./foo.svg";        // 従来どおり（エディタ側用）
 */
const svgUrlRule = {
	test: /\.svg$/,
	resourceQuery: /url/,
	type: "asset/inline",
};

const isSvgrRule = (rule) =>
	rule &&
	String(rule.test) === String(/\.svg$/) &&
	Array.isArray(rule.use) &&
	rule.use.includes("@svgr/webpack");

//既定のsvgrルールから `?url` 付きを除外したうえで、専用ルールを先頭に足す
const rules = [
	svgUrlRule,
	...defaultConfig.module.rules.map((rule) =>
		isSvgrRule(rule) ? { ...rule, resourceQuery: { not: [/url/] } } : rule,
	),
];

module.exports = {
	...defaultConfig,
	//mode: mode,
	entry: newEntryConfig,
	module: {
		...defaultConfig.module,
		rules,
	},
};
