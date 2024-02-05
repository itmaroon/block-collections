
import { Suspense, useEffect, useRef } from '@wordpress/element';

function BlockEditWrapper({ lazyComponent: LazyComponent, ...props }) {
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const observer = new MutationObserver((mutationsList) => {
  //     for (const mutation of mutationsList) {
  //       if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
  //         props.setAttributes({ is_loaded: true })
  //       }
  //     }
  //   });

  //   if (containerRef.current) {
  //     observer.observe(containerRef.current, {
  //       attributes: false,
  //       childList: true,
  //       subtree: true
  //     });
  //   }

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [])

  return (
    // <div ref={containerRef}>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
    //</div>
  );
}

export default BlockEditWrapper;