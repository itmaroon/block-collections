import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { nanoid } from "nanoid";
import { Button, Notice, Modal, TextControl } from "@wordpress/components";

export interface OptionItem {
	id: string | number;
	value: string;
	label: string;
	classname?: string;
}

interface OptionModalProps {
	optionValues: OptionItem[];
	onAddOption: (option: OptionItem) => void;
	onUpdateOption: (options: OptionItem[]) => void;
}

type OptionField = "label" | "value" | "classname";

export default function OptionModal({
	optionValues,
	onAddOption,
	onUpdateOption,
}: OptionModalProps) {
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
		setSelectedOption((prevData) =>
			prevData ? { ...prevData, [key]: value } : prevData,
		);
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
	const handleOptionSave = () => {
		if (!selectedOption) return;
		if (
			optionValues.some((item) => item.id === selectedOption.id)
		) {
			// Update existing item
			const updatedValues = optionValues.map((item): OptionItem => {
				if (item.id === selectedOption.id) {
					return selectedOption;
				}
				return item;
			});
			onUpdateOption(updatedValues);
			//setAttributes({ selectValues: updatedValues });
		} else {
			// Add new item
			onAddOption(selectedOption);
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
					<span onClick={() => handleNoticeClick(item)}>{item.label}</span>
				</Notice>
			))}
			{isModalOpen && selectedOption && (
				<Modal
					title={__("Option Info Edit", "block-collections")}
					onRequestClose={closeModal}
				>
					<TextControl
						label={__("Display Label", "block-collections")}
						value={selectedOption.label}
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
