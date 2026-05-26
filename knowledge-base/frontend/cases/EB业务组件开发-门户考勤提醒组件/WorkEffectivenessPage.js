import React from 'react';
import { Component } from "react";
import  WorkEffectProject from './WorkEffectProject';
import  WorkEffectSale  from './WorkEffectSale';

class WorkEffectivenessPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
   
  }

  render() {
    const { projectOrSale } = this.props;
    if (projectOrSale === '项目'){
      return <WorkEffectProject/>;
    }
    if (projectOrSale === '销售'){
      return <WorkEffectSale/>;
    }
    return null;
  }
}

export default WorkEffectivenessPage;
