import * as React from "react";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useState, useRef } from "@wordpress/element";

type SelectOptionId = string | number | undefined;

interface OptionElementProps {
	id?: string | number;
	value?: string;
	className?: string;
	selected?: boolean;
	children?: ReactNode;
}

interface SelectElementProps {
	multiple?: boolean;
	"data-placeholder"?: string;
	children?: ReactNode;
}

interface NomalSelectProps {
	children: ReactElement<SelectElementProps>;
	onOptionSelect: (id: SelectOptionId) => void;
	onOptionDeselect: (id: SelectOptionId) => void;
}

export function NomalSelect({
	onOptionSelect,
	onOptionDeselect,
	children,
}: NomalSelectProps) {
  const isMultiple = children.props.multiple;
  const selectClassName = isMultiple ? "itmar_block_selectMultiple" : "itmar_block_selectSingle";
  const dataPlaceholder = children.props["data-placeholder"];

  // オプションリストのopen状態を管理するstate
  const [isOpen, setIsOpen] = useState(false);

  //このコンポーネントのルートのDOM要素への参照
  const containerRef = useRef<HTMLDivElement | null>(null);

  //オプションの一覧を開く
  const openClick = () => {
    // isOpenの値をトグルする
    setIsOpen(!isOpen);
  }
  //フォーカスが外れたら閉じる
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget as Node | null)
    ) {
      setIsOpen(false);
    }
  };

  //オプション選択時のハンドラ
  const handleLiClick = useCallback((id: SelectOptionId) => {
    onOptionSelect(id); // 呼び出しもとでselect処理
  }, [children, onOptionSelect]);

  //選択済みの要素を押したとき
  const handleItemClick = useCallback((id: SelectOptionId, event: React.MouseEvent<HTMLAnchorElement>) => {
    // イベント伝播を停止
    event.stopPropagation();
    onOptionDeselect(id); // 呼び出しもとでselect処理
  }, [children, onOptionDeselect]);

  const childrenArray = React.Children.toArray(children.props.children);
  const renderedItems = childrenArray.map((child, index) => {
    if (!React.isValidElement(child) || child.type !== 'option') {
      return null;
    }
    const option = child as ReactElement<OptionElementProps>;

    if (option.props.selected) {
      return (
        <a
          key={index}
          id={String(option.props.id ?? "")}
          data-value={option.props.value}
          onClick={isMultiple ? (event) => handleItemClick(option.props.id, event) : undefined}
        >
          <em className={option.props.className}>{option.props.children}</em>
          <i></i>
        </a>
      )

    } else {
      //オプション選択解除
      return (
        <li
          key={index}
          id={String(option.props.id ?? "")}
          data-value={option.props.value}
          className={option.props.className}
          onClick={() => handleLiClick(option.props.id)}
        >
          {option.props.children}
        </li>
      )
    }
  });

  const liElements = renderedItems.filter(item => React.isValidElement(item) && item.type === 'li');
  const aElements = renderedItems.filter(item => React.isValidElement(item) && item.type === 'a');

  // option要素から選択されているものは<a>要素に、されていないものを<li>要素に変換する

  return (
    <div
      className={`itmar_block_select ${selectClassName} ${isOpen ? 'open' : ''}`}
      tabIndex={0}
      onBlur={handleBlur}
      ref={containerRef}
    >
      <div onClick={openClick}>
        <span className={aElements.length > 0 ? 'hide' : ''} >{dataPlaceholder}
          {children}
        </span>
        {aElements}
        <div className="itmar_block_opener" ></div>
      </div>
      <ul>{liElements}</ul>
    </div >
  );
}
