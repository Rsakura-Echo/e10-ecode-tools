
import React from 'react';
import { Button } from '@weapp/ui';
import { asyncImport } from '@weapp/ecodesdk';



const AddButton = React.forwardRef((props, ref) => {
  return (
    <React.Suspense fallback={() => { }}>
      <Button onClick={() => {
        asyncImport('730529475668926465', 'message.js').then(message => message.default.info('附加操作'))
      }} >附加操作</Button>
    </React.Suspense>
  )
});

export default AddButton;