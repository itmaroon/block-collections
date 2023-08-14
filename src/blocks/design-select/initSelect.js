import { useCallback } from '@wordpress/element';
import { Transition } from 'react-transition-group';

const defaultStyle = {
  transition: 'max-height 400ms ease-in-out',
  maxHeight: 0,
  overflow: 'hidden'
};

const transitionStyles = {
  entering: { maxHeight: 0 },
  entered: { maxHeight: '100px' }, // または最大の高さ
  exiting: { maxHeight: 0 },
  exited: { maxHeight: 0 },
};


export function NomalSelect({ onOptionSelect, onOptionDeselect, ...props }) {

  const isMultiple = props.children.props.multiple;
  const selectClassName = isMultiple ? "selectMultiple" : "selectSingle";
  const dataPlaceholder = props.children.props['data-placeholder'];


  //オプション選択時のハンドラ
  const handleLiClick = useCallback((index) => {
    const child = props.children.props.children[index];
    if (React.isValidElement(child)) {
      onOptionSelect(index); // 親へのコールバックを呼び出す
      setSelectedIndices(prevIndices => [...prevIndices, index]);
    }
  }, [props.children, onOptionSelect]);

  //選択済みの要素を押したとき
  const handleItemClick = useCallback((index) => {
    const child = props.children.props.children[index];
    if (React.isValidElement(child)) {
      onOptionDeselect(index); // 親へのコールバックを呼び出す
      setSelectedIndices(prevIndices => [...prevIndices, index]);
    }
  }, [props.children, onOptionSelect]);

  const renderedItems = React.Children.map(props.children.props.children, (child, index) => {
    if (!React.isValidElement(child) || child.type !== 'option') {
      return null;
    }

    if (child.props.selected) {
      return {
        type: 'a',
        element: (
          <a key={index} data-value={child.props.value} onClick={() => handleItemClick(index)}>
            <em className={child.props.className}>{child.props.children}</em>
            <i></i>
          </a>
        )
      };
    } else {
      return {
        type: 'li',
        element: (
          <li key={index} data-value={child.props.value} onClick={() => handleLiClick(index)}>
            {child.props.children}
          </li>
        )
      };
    }
  });

  const aElements = renderedItems.filter(item => item.type === 'a').map(item => item.element);
  const liElements = renderedItems.filter(item => item.type === 'li').map(item => item.element);

  // aElementsに関して、このようにマッピングします
  {
    aElements.map((element, index) => (
      <Transition
        key={index}
        in={true}
        timeout={400}
        unmountOnExit
      >
        {(state) => (
          <a style={{ ...defaultStyle, ...transitionStyles[state] }} {...element.props}>
            {element.children}
          </a>
        )}
      </Transition>
    ))
  }

  // option要素から選択されているものは<a>要素に、されていないものを<li>要素に変換する

  return (
    <div className={`custom_select ${selectClassName}`} >
      <div>
        <span className={aElements.length > 0 ? 'hide' : ''}>{dataPlaceholder}</span>
        {aElements}
        <div className="arrow"></div>
      </div>
      <ul>{liElements}</ul>
    </div >
  );
}