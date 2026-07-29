import { format } from "@wordpress/date";

const isoDatePattern =
	/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/;

/** Moment の曖昧な文字列解析へ渡さないため、ISO形式だけを受け入れる。 */
export const getValidIsoDate = (value: unknown): string | null => {
	if (typeof value !== "string" || !isoDatePattern.test(value)) {
		return null;
	}

	return Number.isNaN(Date.parse(value)) ? null : value;
};

export const formatTitleDate = (
	value: unknown,
	userFormat: string,
): string => {
	const isoDate = getValidIsoDate(value);
	return isoDate ? format(userFormat || "Y-m-d", isoDate) : "";
};

/** ISO化されていない旧ブロックの表示文字列は、解析せずそのまま維持する。 */
export const formatStoredTitleDate = (
	headingContent: unknown,
	dateValue: unknown,
	userFormat: string,
): string => {
	const headingIsoDate = getValidIsoDate(headingContent);
	if (headingIsoDate) {
		return formatTitleDate(headingIsoDate, userFormat);
	}

	if (typeof headingContent === "string" && headingContent.trim()) {
		return headingContent;
	}

	return formatTitleDate(dateValue, userFormat);
};
