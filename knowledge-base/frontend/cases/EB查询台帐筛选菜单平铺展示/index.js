

import React from 'react';


class SelectOverlayCust extends React.Component {

  prefixCls = "ecode-select-overlay";

  constructor(props) {
    super(props);
    this.state = {
      activeKey: []
    }
  }


  render() {
    const { selectOptions = [], selectedKeys = [] } = this.props;
    return <div className={this.prefixCls}>
      <div className={`${this.prefixCls}-title`}>{this.props.data.showName || ''}</div> 
      <div className={`${this.prefixCls}-content`}>
        {
          selectOptions.map(x => {

            return <div className={`${this.prefixCls}-item ${selectedKeys.includes(x.id) ? 'ecode-so-active' : ''}`} onClick={() => {
              if (selectedKeys.includes(x.id)) {
                this.props.onChange(selectedKeys.filter(i => i != x.id));
              } else {
                this.props.onChange([...selectedKeys, x.id]);
              }
            }}>
              {x.setName} ({x.count})
            </div>

          })
        }
      </div> 
    </div>
  }

}


export default SelectOverlayCust;
