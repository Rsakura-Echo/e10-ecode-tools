


import React from 'react';

import { regOvProps, history } from '@weapp/utils';



regOvProps('weappUi', 'Title', props => {

  if (props.weId === 'f56o40_9d1m87_ktrfwy_xv7vwg_bryhr2_pnhv5o') {
    if (Array.isArray(props.buttons)) {
      const { weappUi } = window;
      const { Button } = weappUi;
      props.buttons = React.Children.toArray(props.buttons);
      props.buttons.splice(0, 0, <Button
        onClick={() => {
          history.push('/workflow/pathdef/list/company/pathdef/list/path_add/addpframedialog/base');
        }}
      >新建审批流</Button>)
    }
  }

  return props;

});
