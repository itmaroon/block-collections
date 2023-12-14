import { useCallback, useState, useRef } from '@wordpress/element';

export function NomalSelect({ onOptionSelect, onOptionDeselect, ...props }) {

  const isMultiple = props.children.props.multiple;
  const selectClassName = isMultiple ? "itmar_block_selectMultiple" : "itmar_block_selectSingle";
  const dataPlaceholder = props.children.props['data-placeholder'];

  // オプションリストのopen状態を管理するstate
  const [isOpen, setIsOpen] = useState(false);

  //このコンポーネントのルートのDOM要素への参照
  const containerRef = useRef(null);

  //オプションの一覧を開く
  const openClick = () => {
    // isOpenの値をトグルする
    setIsOpen(!isOpen);
  }
  //フォーカスが外れたら閉じる
  const handleBlur = (event) => {
    if (!containerRef.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  //オプション選択時のハンドラ
  const handleLiClick = useCallback((id) => {
    onOptionSelect(id); // 呼び出しもとでselect処理
  }, [props.children, onOptionSelect]);

  //選択済みの要素を押したとき
  const handleItemClick = useCallback((id, event) => {
    // イベント伝播を停止
    event.stopPropagation();
    onOptionDeselect(id); // 呼び出しもとでselect処理
  }, [props.children, onOptionSelect]);

  const childrenArray = React.Children.toArray(props.children.props.children);
  const renderedItems = childrenArray.map((child, index) => {
    if (!React.isValidElement(child) || child.type !== 'option') {
      return null;
    }

    if (child.props.selected) {
      return (
        <a
          key={index}
          id={child.props.id}
          data-value={child.props.value}
          onClick={isMultiple ? (event) => handleItemClick(child.props.id, event) : undefined}
        >
          <em className={child.props.className}>{child.props.children}</em>
          <i></i>
        </a>
      )

    } else {
      //オプション選択解除
      return (
        <li
          key={index}
          id={child.props.id}
          data-value={child.props.value}
          className={child.props.className}
          onClick={() => handleLiClick(child.props.id)}
        >
          {child.props.children}
        </li>
      )
    }
  });

  let liElements = renderedItems.filter(item => React.isValidElement(item) && item.type === 'li');
  let aElements = renderedItems.filter(item => React.isValidElement(item) && item.type === 'a');

  // option要素から選択されているものは<a>要素に、されていないものを<li>要素に変換する

  return (
    <div
      className={`itmar_block_select ${selectClassName} ${isOpen ? 'open' : ''}`}
      tabIndex="0"
      onBlur={handleBlur}
      ref={containerRef}
    >
      <div onClick={openClick}>
        <span className={aElements.length > 0 ? 'hide' : ''} >{dataPlaceholder}
          {props.children}
        </span>
        {aElements}
        <div className="itmar_block_opener" ></div>
      </div>
      <ul>{liElements}</ul>
    </div >
  );
}