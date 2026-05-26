import React from 'react';
import { Button } from '@weapp/ui'

const View = (props) => {
  console.log('demo View props', props)
  const { config } = props
  return (
    <div>
      Mobile View
      <Button radius type={config.btnType}>{config.content}</Button>
    </div>
  )
}

export default View