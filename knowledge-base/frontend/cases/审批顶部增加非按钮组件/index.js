


import React from 'react';
import { Select } from '@weapp/ui';

export default class Com extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {

    return <Select
      data={[
        { id: 'a', content: 'contenta' },
        { id: 'b', content: 'contentb' },
        { id: 'c', content: 'contentc' }
      ]}
      value={this.state.value}
      onChange={val => this.setState({ value: val })}
    />

  }

}
