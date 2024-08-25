process.env.WP_COPY_PHP_FILES_TO_DIST = true;

const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const mode = "production"; // この行でproductionモードを指定

//コアブロック拡張モジュールのトランスパイル
const path = require("path");
const newEntryConfig = async () => {
	const originalEntry = await defaultConfig.entry();

	return {
		...originalEntry,
		"gutenberg-ex": path.resolve(__dirname, "./src/gutenberg-ex.js"),
		block_collection: path.resolve(__dirname, "./assets/block_collection.js"),
	};
};

module.exports = {
	...defaultConfig,
	mode: mode,
	entry: newEntryConfig,
};
