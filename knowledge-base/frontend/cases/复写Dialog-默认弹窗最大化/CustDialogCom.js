
import React from 'react';

class CustDialogCom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scale: true
    }
  }


  handleScale = (v) => {
    // console.info('x: ', v);
    this.setState({ scale: v });
    this.props.onScale && this.props.onScale(v);
  }

  render() {
    
    const { OriginCom, ...others } = this.props;
    const { scale } = this.state;
    console.info('scale => ', scale)
    return <OriginCom 
      {...others}
      onScale={this.handleScale} isOv={true} scale
      defaultInnerScale={true}
    />
  }
  
}


export default CustDialogCom;