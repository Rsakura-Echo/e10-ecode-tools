
import React from 'react';

import { dayjs } from '@weapp/utils';

export default class TimeCom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ value: dayjs().format('YYYY-MM-DD HH:mm:ss') })
    }, 500);
  }

  render() {

    const { value } = this.state;

    return <div>
      {value}
    </div>
  }

}

