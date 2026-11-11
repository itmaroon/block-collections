import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { nanoid } from "nanoid";
import { Button, Notice, Modal, TextControl } from "@wordpress/components";
import {
	DEFAULT_LANG,
	canTranslateBlock,
	textForLang,
	translateText,
	useEditLang,
	useTranslationConfig,
	withLangText,
} from "./design-title/lang";

export interface OptionItem {
	id: string | number;
	value: string;
	/** 文字列なら言語を分けていない。{JP, EN} なら言語ごとの表示名 */
	label: string | Record<string, string>;
	classname?: string;
}

interface OptionModalProps {
	optionValues: OptionItem[];
	onAddOption: (option: OptionItem) => void;
	onUpdateOption: (options: OptionItem[]) => void;
	/**
	 * 渡すと、表示名を言語ごとに持てる（編集言語の文字を読み書きする）。
	 * 送信される値（Option Value）は言語で変えない。
	 */
	blockName?: string;
}

type OptionField = "label" | "value" | "classname";

export default function OptionModal({
	optionValues,
	onAddOption,
	onUpdateOption,
	blockName,
}: OptionModalProps) {
	//表示名の多言語。blockName が無いブロックは、従来どおり文字列のまま扱う
	const translationConfig = useTranslationConfig();
	const editLang = useEditLang();
	const multiLang = !!blockName && translationConfig.languages.length > 1;
	const activeLang = multiLang ? editLang : DEFAULT_LANG;
	const canAutoTranslate =
		!!blockName && canTranslateBlock(translationConfig, blockName);
	const labelOf = (item: OptionItem): string => textForLang(item.label, activeLang);

	//オプション要素の情報編集モーダルの操作
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<OptionItem | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [optionToDelete, setOptionToDelete] = useState<OptionItem | null>(null);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const openDeleteModal = (item: OptionItem) => {
		setOptionToDelete(item);
		setIsDeleteModalOpen(true);
	};
	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setOptionToDelete(null);
	};
	const confirmDelete = () => {
		if (optionToDelete) {
			handleOptionDelete(optionToDelete.id);
		}
		closeDeleteModal();
	};
	//オプション値の編集ハンドラ
	const handleOptionChange = (key: OptionField, value: string) => {
		setSelectedOption((prevData) => {
			if (!prevData) return prevData;
			if (key === "label" && multiLang) {
				return { ...prevData, label: withLangText(prevData.label, activeLang, value) };
			}
			return { ...prevData, [key]: value };
		});
	};

	//オプション新規追加
	const handleOptionAddNew = () => {
		const id = nanoid(5);
		setSelectedOption({ id: id, value: "", label: "", classname: "" });
		openModal();
	};
	//オプションの更新
	const handleNoticeClick = (item: OptionItem) => {
		setSelectedOption(item);
		openModal();
	};

	// オプション要素の削除
	const handleOptionDelete = (idToDelete: OptionItem["id"]) => {
		// IDをもとに該当する要素を削除
		const updatedValues = optionValues.filter(
			(item) => item.id !== idToDelete,
		);
		onUpdateOption(updatedValues);
		//setAttributes({ selectValues: updatedValues });
	};

	//オプション値の保存
	const handleOptionSave = async () => {
		if (!selectedOption) return;
		let option = selectedOption;
		/*
		 * 自動翻訳が使えるときは、既定の言語の表示名から、まだ入っていない言語だけを訳して埋める。
		 * すでに入っている言語（手で入れたもの）は上書きしない。
		 */
		if (canAutoTranslate) {
			const source = textForLang(option.label, DEFAULT_LANG).trim();
			if (source) {
				let next = option.label;
				for (const lang of translationConfig.languages.map((l) => l.value)) {
					if (lang === DEFAULT_LANG) continue;
					const filled =
						typeof next === "object" && String(next[lang] ?? "").trim() !== "";
					if (filled) continue;
					const res = await translateText(source, lang);
					if (res.ok) next = withLangText(next, lang, res.text);
				}
				option = { ...option, label: next };
			}
		}
		if (
			optionValues.some((item) => item.id === option.id)
		) {
			// Update existing item
			const updatedValues = optionValues.map((item): OptionItem => {
				if (item.id === option.id) {
					return option;
				}
				return item;
			});
			onUpdateOption(updatedValues);
			//setAttributes({ selectValues: updatedValues });
		} else {
			// Add new item
			onAddOption(option);
			//setAttributes({ selectValues: [...selectValues, selectedOption] });
		}

		closeModal();
	};

	return (
		<>
			<Button
				label={__("add", "block-collections")}
				icon={"insert"}
				onClick={handleOptionAddNew}
			/>
			{optionValues.map((item) => (
				<Notice
					key={item.id}
					status="info"
					onRemove={() => openDeleteModal(item)}
				>
					<span onClick={() => handleNoticeClick(item)}>{labelOf(item)}</span>
				</Notice>
			))}
			{isModalOpen && selectedOption && (
				<Modal
					title={__("Option Info Edit", "block-collections")}
					onRequestClose={closeModal}
				>
					<TextControl
						label={`${__("Display Label", "block-collections")}${multiLang ? ` (${activeLang})` : ""}`}
						value={labelOf(selectedOption)}
						onChange={(newVal: string) => handleOptionChange("label", newVal)}
					/>
					<TextControl
						label={__("Option Value", "block-collections")}
						value={selectedOption.value}
						onChange={(newVal: string) => handleOptionChange("value", newVal)}
					/>
					<TextControl
						label={__("Class Name", "block-collections")}
						value={selectedOption.classname ?? ""}
						onChange={(newVal: string) =>
							handleOptionChange("classname", newVal)
						}
					/>
					<Button variant="primary" onClick={handleOptionSave}>
						{__("Save Changes", "block-collections")}
					</Button>
				</Modal>
			)}

			{isDeleteModalOpen && (
				<Modal
					title={__("Confirm Deletion", "block-collections")}
					onRequestClose={closeDeleteModal}
				>
					<p>
						{__(
							"Are you sure you want to delete this item?",
							"block-collections",
						)}
					</p>
					<Button variant="primary" onClick={confirmDelete}>
						{__("Yes, Delete", "block-collections")}
					</Button>
					<Button variant="secondary" onClick={closeDeleteModal}>
						{__("Cancel", "block-collections")}
					</Button>
				</Modal>
			)}
		</>
	);
}
