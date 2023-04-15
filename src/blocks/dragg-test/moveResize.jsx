import { useInteractJS } from './hooks'

const MoveResizeBox = (props) => {
  
  //const scaleObj = { width: interact.style.width, height: interact.style.height }
  const interact = useInteractJS()
 
  return(
    <div
        ref={interact.ref}
        style={{
          ...props.position, ...props.scale,
          border: '2px solid #0489B1',
          backgroundColor: '#A9D0F5'
        }}
      />
    
  );
}

export default MoveResizeBox