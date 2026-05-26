import React from 'react';
import { CorsComponent, ColorPicker } from '@weapp/ui';
import { getLabel } from '@weapp/utils';

const CustomFont = (props) => {
  return (
    <CorsComponent
      app="@weapp/ebdcoms"
      compName="Font"
      showAlign={false}
      {...props}
    />
  )
}

const CustomColorPicker = (props) => {
  return (
    <ColorPicker
      {...props}
      value={props.value || 'transparent'}
    />
  )
}

const StyleConfig = {
  items: {
    'cusStyleCls.backgroundColor': {
      label: getLabel('54606', '背景色'),
      itemType: 'CUSTOM',
      customRender: CustomColorPicker,
      labelSpan: 7,
      groupId: 'style',
    },
    'cusStyleCls.font': {
      label: getLabel('54596', '文字'),
      itemType: 'CUSTOM',
      customRender: CustomFont,
      labelSpan: 7,
      groupId: 'style',
    },
  }
}

export default StyleConfig