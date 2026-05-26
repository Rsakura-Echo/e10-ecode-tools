import React from 'react';
import {withRouter } from 'react-router-dom';
import { Browser,Layout,Select,Switch} from '@weapp/ui';
const { Row, Col } = Layout;

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
        "content": "",
        "disabled": false,
        "separator": false
      },
      {
        "id": "0",
        "content": "非会签",
        "disabled": false,
        "separator": false
      },
      {
        "id": "1",
        "content": "会签",
        "disabled": false,
        "separator": false
      },
      {
        "id": "2",
        "content": "依次逐个处理",
        "disabled": false,
        "separator": false
      }
    ];
    let fieldWidth = 8;
    let fieldValWidth = 16;
    return(
        <div className="cus_intervent">
          <Row weId={`${this.props.weId || ''}_9nswco`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
              <Col weId={`${this.props.weId || ''}_pe3snp`} span={fieldWidth}><span >{"审批节点流转至"}</span></Col>
              <Col weId={`${this.props.weId || ''}_tw9l1h`} span={fieldValWidth}>
                <Browser
                  module='workflow/pathdef'
                  type='workflowPathNodeBrowser'
                  browserAssociativeProps={{
                    useBoxSelection: false
                  }}
                  multiple={false}
                  destDataParams={nodeDataParams}
                  dataParams={nodeDataParams}
                  completeParams={nodeDataParams}
                  onChange={data=>{
                    let appendCustomParamFn = this.props?.appendCustomParamFn;
                    if(typeof appendCustomParamFn === 'function'){
                      let nodeObj = data[0];
                      let nodeId = nodeObj?.id || '-1';
                      appendCustomParamFn({"submitToNodeId":nodeId})
                    }
                    this.setState({nodeid:data});
                  }}
                  value={this.state?.nodeid || []}
                />
              </Col>
            </Row>
            <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
              <Col weId={`${this.props.weId || ''}_pe3sni`} span={fieldWidth}><span >{"节点处理人"}</span></Col>
              <Col weId={`${this.props.weId || ''}_tw9l1c`} span={fieldValWidth}>
                <Browser
                  module='workflow'
                  type='resource'
                  browserAssociativeProps={{
                    useBoxSelection: false
                  }}
                  onChange={data=>{
                    let appendCustomParamFn = this.props?.appendCustomParamFn;
                    if(typeof appendCustomParamFn === 'function'){
                      let operators = [];
                      data.map(item=>{
                        operators.push(item?.id);
                      })
                      appendCustomParamFn({"interventionReceiverIds":operators.join()})
                    }
                    this.setState({operators:data});
                  }}
                  multiple={true}
                  value={this.state?.operators || []}
                />
              </Col>
            </Row>
            <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
              <Col weId={`${this.props.weId || ''}_pe3sni`} span={fieldWidth}><span >{"会签关系"}</span></Col>
              <Col weId={`${this.props.weId || ''}_tw9l1c`} span={fieldValWidth}>
                <Select weId={`${this.props.weId || ''}_lzldj1`}
                  data={signOption}
                  onChange={v=>{
                    console.log("signType",v);
                    let appendCustomParamFn = this.props?.appendCustomParamFn;
                    if(typeof appendCustomParamFn === 'function'){
                      appendCustomParamFn({"signType":v=='-1'?undefined:v})
                    }
                    this.setState({signType:v});
                  }}
                  value={this.state.signType}>
                </Select>
              </Col>
            </Row>
            <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
              <Col weId={`${this.props.weId || ''}_pe3sni`} span={fieldWidth}><span >{"执行节点附加操作"}</span></Col>
              <Col weId={`${this.props.weId || ''}_tw9l1c`} span={fieldValWidth}>
                <Switch size="sm" value={this.state.enableIntervention} onChange={v=>{
                  console.log("enableIntervention",v);
                  let appendCustomParamFn = this.props?.appendCustomParamFn;
                  if(typeof appendCustomParamFn === 'function'){
                    appendCustomParamFn({"enableIntervention":v})
                  }
                  this.setState({enableIntervention:v});
                }}/>
              </Col>
            </Row>
            <div className="cus_tips" style={{"font-size":"12px","color":"gray","margin-top":"8px","margin-bottom":"5px"}}>{"说明：以上动作设置未选择的情况下则均以后台节点设置为准。"}</div>
        </div>
    )
  }
}

export default withRouter(CustomInterventionCom)