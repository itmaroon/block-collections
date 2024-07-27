import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as Calenderbutton } from "./calender.svg";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import('./edit'));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

//本日の日付から'YYYY/MM'形式の日付文字列を生成する
const getTodayYearMonth = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	return `${year}/${month}`;
};

registerBlockType(metadata.name, {
	icon: <Calenderbutton />,
	attributes: {
		...metadata.attributes,
		selectedMonth: {
			type: "string",
			default: getTodayYearMonth(),
		},
	},
	description: __(
		"A block for display calender with designs",
		"block-collections",
	),

	edit: Edit,
	save,
});
