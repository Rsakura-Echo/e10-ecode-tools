
import React from 'react';
import { Icon } from '@weapp/ui';
import { history } from '@weapp/utils';

class HomeBall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleReturn = () => {
    window.location.replace('/');
  }

  render() {
    return <div className="home-ball-body" onClick={this.handleReturn}>
      <Icon 
        size="lg"
        name="Icon-N-Systemhomepage" 
      />
    </div>
  }

}

export default HomeBall;
