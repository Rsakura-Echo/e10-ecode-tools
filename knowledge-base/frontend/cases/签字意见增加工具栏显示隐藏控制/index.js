


import React from 'react';
import { Switch } from '@weapp/ui';

class CommentEditTextHide extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hide: false
    }
  }

  render() {
    const { OriginCom, ...others } = this.props;
    const { hide } = this.state;
    let { richTextProps = {} } = this.props;
    let { useRichText } = this.props;
    if (hide) {
      richTextProps = {
        ckConfig: {
          toolbar: [[]],
          extraPlugins: ''
        }
      };
      
      useRichText = false;
    }
    return <OriginCom _noOv={true} {...others } richTextProps={richTextProps} renderExtraConent={() => {
      return <div style={{ marginLeft: 12, marginTop: 6 }}>
        <Switch defaultValue={!hide} onChange={(val) => {
          console.info('Switch ->', val)
          this.setState({ hide: !val });
        }} />
      </div>
    }} useRichText={useRichText} />
  }

}


export default CommentEditTextHide;
