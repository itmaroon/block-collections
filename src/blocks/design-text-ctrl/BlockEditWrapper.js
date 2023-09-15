import { Suspense } from '@wordpress/element';
const Edit = React.lazy(() => import('./edit'));

function BlockEditWrapper(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Edit {...props} />
    </Suspense>
  );
}

export default BlockEditWrapper;
