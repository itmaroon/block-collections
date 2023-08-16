import { useCallback, useState, useRef, useEffect } from '@wordpress/element';
import { Transition } from 'react-transition-group';

const defaultStyle = {
  transition: 'max-height 400ms ease-in-out',
  maxHeight: 0,
  overflow: 'hidden'
};

const transitionStyles = {
  entering: { maxHeight: 0 },
  entered: { maxHeight: '100px' }, // または最大の幅
  exiting: { maxHeight: '100px' },
  exited: {
    maxHeight: 0,
    width: 0,
    height: 0,
    padding: 0,
    margin: 0
  },
};


export function NomalSelect({ onOptionSelect, onOptionDeselect, ...props }) {

  const isMultiple = props.children.props.multiple;
  const selectClassName = isMultiple ? "itmar_block_selectMultiple" : "itmar_block_selectSingle";
  const dataPlaceholder = props.children.props['data-placeholder'];

  // オプションリストのopen状態を管理するstate
  const [isOpen, setIsOpen] = useState(false);
  // 選択アイテムの表示状態を管理するstate
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [unSelectedOptions, setUnSelectedOptions] = useState([]);
  // アニメーションの開始を管理するstate
  const [isAnime, setIsAnime] = useState(false);

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
  const handleLiClick = useCallback((index) => {
    const child = props.children.props.children[index];
    if (React.isValidElement(child)) {
      onOptionSelect(index); // 呼び出しもとでselect処理
      //setSelectedOptions(aElementKeys);
    }
  }, [props.children, onOptionSelect]);

  //選択済みの要素を押したとき
  const handleItemClick = useCallback((index, event) => {
    const child = props.children.props.children[index];
    if (React.isValidElement(child)) {
      onOptionDeselect(index); // 呼び出しもとでselect処理
    }
    // イベント伝播を停止
    event.stopPropagation();
  }, [props.children, onOptionSelect]);

  const childrenArray = React.Children.toArray(props.children.props.children);
  const renderedItems = childrenArray.map((child, index) => {
    if (!React.isValidElement(child) || child.type !== 'option') {
      return null;
    }
    //リターンするアイテム
    let retRenderItem = [];

    //keyがselectedOptionsに含まれているか
    const isInSelectedOptions = selectedOptions.includes(index);
    const isInUnSelectedOptions = unSelectedOptions.includes(index);

    if (child.props.selected) {
      //オプション選択
      retRenderItem.push(
        (
          <Transition
            key={index}
            in={isInSelectedOptions}
            timeout={500}
            data-type="a"
          >
            {(state) => {
              //console.log(`a add:${state} ${child.props.value} in:${isInSelectedOptions}`)
              //setIsAnime(state === 'entering');
              return (
                <a
                  data-value={child.props.value}

                  onClick={(event) => handleItemClick(index, event)}
                  style={{ ...defaultStyle, ...transitionStyles[state] }}
                  className={
                    state === 'entering' ? 'notShown' :
                      state === 'entered' ? 'notShown shown' : ''
                  }
                >
                  <em className={child.props.className}>{child.props.children}</em>
                  <i></i>
                </a>
              )

            }}
          </Transition>
        )
      )
      //選択された要素（消去アニメーション用）
      if (!isInSelectedOptions) {
        retRenderItem.push(
          (
            <Transition
              key={index}
              in={!isInUnSelectedOptions}
              timeout={400}
              //unmountOnExit
              data-type="li"
            >
              {(state) => {
                console.log(`li exclude:${state} ${child.props.value} in:${!isInUnSelectedOptions}`)

                return (
                  <li
                    data-value={child.props.value}
                    onClick={() => handleLiClick(index)}
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    className={
                      state === 'exiting' ? 'remove' : ''
                    }
                  >
                    {child.props.children}
                  </li>
                )
              }}
            </Transition>
          )
        )
      }
      return retRenderItem;
    } else {
      //オプション選択解除
      retRenderItem.push(
        (
          <Transition
            key={index}
            in={isInUnSelectedOptions}
            timeout={400}
            data-type="li"
          >
            {(state) => {
              console.log(`li add:${state} ${child.props.value} in:${isInUnSelectedOptions}`)

              return (
                <li
                  data-value={child.props.value}
                  onClick={() => handleLiClick(index)}
                  style={{ ...defaultStyle, ...transitionStyles[state] }}
                  className={
                    state === 'entering' ? 'notShown' :
                      state === 'entered' ? 'notShown show' : ''
                  }
                >
                  {child.props.children}
                </li>
              )
            }}

          </Transition>
        )
      )
      //選択をはずされた要素（消去アニメーション用）
      if (isInSelectedOptions) {
        retRenderItem.push(
          (
            <Transition
              key={index}
              in={!isInSelectedOptions}
              timeout={400}
              unmountOnExit
              data-type="a"
            >
              {(state) => {
                console.log(`a add:${state} ${child.props.value} in:${!isInSelectedOptions}`)
                return (
                  <a
                    data-value={child.props.value}
                    onClick={(event) => handleItemClick(index, event)}
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    className={
                      state === 'exiting' ? 'remove' :
                        state === 'exited' ? 'remove disappear' : ''
                    }
                  >
                    <em className={child.props.className}>{child.props.children}</em>
                    <i></i>
                  </a>
                )
              }}
            </Transition>
          )
        )
      }

      return retRenderItem;
    }
  });

  const flattenedItems = renderedItems.flat();

  let liElements = flattenedItems.filter(item => React.isValidElement(item) && item.props["data-type"] === 'li');
  let aElements = flattenedItems.filter(item => React.isValidElement(item) && item.props["data-type"] === 'a');
  let aElementKeys = aElements.map(item => Number(item.key))
  let liElementKeys = liElements.map(item => Number(item.key))
  //console.log(aElementKeys)
  //親要素のoption要素に変化があれば状態変数を書き換える
  useEffect(() => {
    setSelectedOptions(aElementKeys);
    setUnSelectedOptions(liElementKeys);
    //console.log('select:', props.children)
    //console.log('aElementKeys:', aElementKeys)
  }, [props.children]);

  // option要素から選択されているものは<a>要素に、されていないものを<li>要素に変換する

  return (
    <div
      className={`itmar_block_select ${selectClassName} ${isOpen ? 'open' : ''}`}
      tabIndex="0"
      onBlur={handleBlur}
      ref={containerRef}
    >
      <div onClick={openClick}>
        <span className={aElements.length > 0 ? 'hide' : ''} >{dataPlaceholder}</span>
        {aElements}
        <div className="itmar_block_opener" ></div>
      </div>
      <ul>{liElements}</ul>
    </div >
  );
}