import React from 'react';
import {withRouter } from 'react-router-dom';
import { MBrowser,MSelect,MSwitch  } from '@weapp/ui';

class CustomInterventionCom extends  React.Component{
  constructor(props:any){
    super(props);
    this.state = {
      nodeid:[],
      operators:[],
      signType:"-1",
      enableIntervention:false
    }
  }

  componentDidMount(){
    window.$devThis = this;
  }

  render(){
    let nodeDataParams = {
          "nodeidsCondition": 3,
          "nodeAttrsCondition": 3,
          "nodeAttrs": "1,3,2",
          "workflowId": this.props.workflowId,
    };
    let signOption = [
      {
        "id": "-1",
        "content": ""
      },
      {
        "id": "0",
        "content": "非会签"
      },
      {
        "id": "1",
        "content": "会签"
      },
      {
        "id": "2",
        "content": "依次逐个处理"
      }
    ];
    return(
        <div className="cus_intervent">

          <div className="cus_item">
            <div className="cus_item_field">{"审批节点流转至"}</div>
            <div className="cus_item_value">
              <MBrowser
                multiple={false}
                module='workflow/pathdef'
                type='workflowPathNodeBrowser'
                onChange={data=>{
                  let appendCustomParamFn = this.props?.appendCustomParamFn;
                  if(typeof appendCustomParamFn === 'function'){
                    let nodeObj = data[0];
                    let nodeId = nodeObj?.id || '-1';
                    appendCustomParamFn({"submitToNodeId":nodeId})
                  }
                }}
                destDataParams={nodeDataParams}
                dataParams={nodeDataParams}
                completeParams={nodeDataParams}
              />
            </div>
          </div>

          <div className="cus_item">
            <div className="cus_item_field">{"节点处理人"}</div>
            <div className="cus_item_value">
              <MBrowser
                multiple={true}
                type="resource"
                module='workflow'
                onChange={data=>{
                  let appendCustomParamFn = this.props?.appendCustomParamFn;
                  if(typeof appendCustomParamFn === 'function'){
                    let operators = [];
                    data.map(item=>{
                      operators.push(item?.id);
                    })
                    appendCustomParamFn({"interventionReceiverIds":operators.join()})
                  }
                }}
                browserAssociativeProps={{
                  multiline: true,
                  wrapDisplay: false,
                  isAssociative: false,
                  displayAllSelectedData: false,
                }}
              />
            </div>
          </div>

          <div className="cus_item">
            <div className="cus_item_field">{"会签关系"}</div>
            <div className="cus_item_value">
            <MSelect
                data={signOption}
                value={this.state.signType}
                placeholder="请选择"
                onChange={(v)=>{
                  console.log("signType",v);
                  let appendCustomParamFn = this.props?.appendCustomParamFn;
                  if(typeof appendCustomParamFn === 'function'){
                    appendCustomParamFn({"signType":v=='-1'?undefined:v})
                  }
                  this.setState({signType:v});
                }}
                isHoldRight
              />
            </div>
          </div>

          <div className="cus_item">
            <div className="cus_item_field cus_item_last">{"执行节点附加操作"}</div>
            <div className="cus_item_value cus_item_last">
              <MSwitch value={this.state.enableIntervention} onChange={v=>{
                  console.log("enableIntervention",v);
                  let appendCustomParamFn = this.props?.appendCustomParamFn;
                  if(typeof appendCustomParamFn === 'function'){
                    appendCustomParamFn({"enableIntervention":v})
                  }
                  this.setState({enableIntervention:v});
              }} size='lg' isHoldRight />
            </div>
          </div>
          <div className="cus_tips" style={{"font-size":"12px","color":"gray","margin-top":"8px","margin-bottom":"5px"}}>{"说明：以上动作设置未选择的情况下则均以后台节点设置为准。"}</div>
        </div>
    )
  }

}

export default withRouter(CustomInterventionCom)