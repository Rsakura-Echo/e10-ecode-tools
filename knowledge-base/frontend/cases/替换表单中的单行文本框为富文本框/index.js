


import React from 'react';
import { RichText } from '@weapp/ui';

/**
 * 替换原有的textarea为富文本框
 */
class NewTextArea extends React.Component {

  richTextRef: any = React.createRef();

  render() {

    return <RichText
      ref={this.richTextRef}
      id="form_richtext" // 注意: id必填，并且唯一
      {...this.props}
    />

  }

}

export default NewTextArea;

