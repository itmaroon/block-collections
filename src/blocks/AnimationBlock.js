

import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
  Button,
  PanelBody,
  PanelRow,
  __experimentalUnitControl as UnitControl
} from '@wordpress/components';



export default function AnimationBlock(props) {

  const animation_prm = props.attributes

  return (
    <>
      <PanelBody
        title={__("Animation Setting", 'block-collections')}
        initialOpen={true}
      >
        <PanelRow
          className='distance_row'
        >
          <UnitControl
            dragDirection="e"
            onChange={(value) => chagePosition(value, 'x')}
            label={__("Vertical", 'block-collections')}
            value={position?.x || 0}
          />
          <UnitControl
            dragDirection="e"
            onChange={(value) => chagePosition(value, 'y')}
            label={__("Horizen", 'block-collections')}
            value={position?.y || 0}
          />
        </PanelRow>
        <PanelRow
          className='reset_row'
        >
          <Button
            variant="secondary"
            onClick={() => resetPos()}
          >
            {__("Reset", 'block-collections')}
          </Button>
        </PanelRow>
      </PanelBody>
    </>
  )
}