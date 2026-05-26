
import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

const ButtonAsync = React.lazy(() => asyncImport('${appId}', 'button'));
const Button = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <ButtonAsync ref={ref} {...props} />
  </React.Suspense>
});

// https://weapp.eteams.cn/sp/ebdfpage/list/769264166452158595
regOvProps('weappUi', 'Title', props => {
  props.className = props.className + ' eb-title-ecode'
  if (props.weId === 'z0digk_paqahu_u4rx96_wtr8as_1o0fwv_wi9wcf'
    && props.appId === "769264162218352640") {
    if (Array.isArray(props.buttons)) {
      props.buttons.splice(0, 0, <Button />);
    } else {
      props.buttons = [<Button />, props.buttons]
    }
  }

  return props;

});
