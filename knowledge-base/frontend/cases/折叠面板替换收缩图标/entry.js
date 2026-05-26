

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Collapse', props => {
  props.customIconRender = (data) => {
    return (
      <window.weappUi.Icon
        name={data.active? 'Icon-reduce03' : 'Icon-add-to03'}
        // style={{ marginRight: '15px' }}
      />
    )
  }

  return props;
})