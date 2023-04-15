import { useRef, useEffect, useState, CSSProperties } from 'react'
import interact from 'interactjs'
const initPosition = {
  width: 100,
  height: 100,
  x: 0,
  y: 0
}

export function useInteractJS(position) {
  
  const interactRef = useRef(null)    // <= HTML ELEMENTを取得

  // 引数で指定したpositionを初期値として、Stateを作る
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position
  })

  const [isEnabled, setEnable] = useState(true)

  let { x, y, width, height } = _position

  // interactJSを有効化する
  const enable = () => {
    interact(interactRef.current)
    // ドラッグでコンポーネントを動かすための処理を追加
    .draggable({
      inertia: false
    })
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },
      preserveAspectRatio: false,
      inertia: false
    })
    .on('dragmove', event => {
      x += event.dx
      y += event.dy
      setPosition({
        width,
        height,
        x,
        y
      })
    })
    .on('resizemove', event => {
      width = event.rect.width
      height = event.rect.height
      x += event.deltaRect.left
      y += event.deltaRect.top
      setPosition({
        x,
        y,
        width,
        height
      })
    })
  }

  // interactJSを無効化する
  const disable = () => {
    interact(interactRef.current).unset()
  }

  useEffect(() => {
    if (isEnabled) {
      enable()
    } else {
      disable()
    }
    return disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled])

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: _position.width + 'px',
      height: _position.height + 'px',
      //position: 'absolute' as CSSProperties['position']
    },
    position: _position,
    isEnabled,
    enable: () => setEnable(true),
    disable: () => setEnable(false)
  }
}