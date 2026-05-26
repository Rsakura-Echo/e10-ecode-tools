import { Provider, inject, observer } from 'mobx-react';
import React from 'react';
import {withRouter,RouteComponentProps } from 'react-router-dom';
import { Dialog,Button,Browser,Select,Input,Radio,Layout,Icon,Switch,Help,CorsComponent } from '@weapp/ui';
import {getLabel} from "@weapp/utils";
const { Row, Col } = Layout;
const { InputNumber } = Input;
import CustomOperatorStore from './customOperatorStore';
import {mathCompareOptions,stepCompareOptions,startComPareOptions,conditionRadioOptions,belongOptions,isKeepOptions,titleGridWidth,contentGridWidth,spanStyle,spanClassName}  from './util/index';


interface CustomOperatorProps extends RouteComponentProps{
    customOperatorStore?:CustomOperatorStore
}

// interface CustomOperatorStates{
//   visible: boolean,
// }
class CustomOperator extends  React.Component<CustomOperatorProps>{
    customOperatorStore:any;
    constructor(props:any){
      super(props);
      this.customOperatorStore = new CustomOperatorStore();
    }
    componentDidMount(){
      // console.log("1111111111111111111111111111");
    }

    render(){
      return (
        <Provider weId={`${this.props.weId || ''}_ymzd3l`} customOperatorStore={this.customOperatorStore} >
            <Content weId={`${this.props.weId || ''}_xjupru`} {...this.props}/>
        </Provider>
      )
    }
}

@inject('customOperatorStore')
@observer
// class Content extends  React.Component<CustomOperatorProps,CustomOperatorStates>{
class Content extends  React.Component<CustomOperatorProps>{
    constructor(props:any){
      super(props);
      // this.state = {
      //   visible:false
      // }
    }

    componentDidMount(){
      // console.log("22222222222222222222222222");
      window.$devThis = this;
      const {editExtendData='',customOperatorStore,triggerRef,otherItems=[]} = this.props;
      if(typeof triggerRef != 'undefined' && triggerRef){
        triggerRef(this);
      }
      if(editExtendData!=''){
        const {initOperatorData} = customOperatorStore;
        initOperatorData(editExtendData);
      }
      customOperatorStore.setScope(otherItems);
    }

    /**
     * 提供给标准，用于获取用户选择的JSON数据
     */
    getExtendData=()=>{
      const {getExtendData} = this.props?.customOperatorStore;
      return getExtendData();
    }

    /**
     * 提供给标准，做必填值校验
     */
    checkExtendData=()=>{
       const {checkExtendData} = this.props?.customOperatorStore;
       return checkExtendData();
    }

    /**
     * 获取自定义条件组件，主要针对条件3和条件6做处理
     */
    getCustomModule=(conditionType)=>{
      const {customFieldConfig,customOperatorStore} = this.props;
      const {operatorData,setOperatorData} = customOperatorStore;
      const {condition3={},condition6={}} = operatorData;

      //各个组件数据值
      let conditionSelectVal = (conditionType=='condition6'?condition6.selectVal:condition3.selectVal) || '';
      const {fieldVal={}} = conditionType=='condition6'?condition6:condition3;
      let conditionSelectCompareVal = fieldVal.selectVal || '';
      let conditionFieldVal = fieldVal.fieldVal || '';
      let conditionFieldVal2 = fieldVal.fieldVal2 || '';
      let isKeep = condition3?.isKeep || '24';//默认不保留

      //根据用户自定义抽出必要信息
      let selectOptionData = [];
      let fieldTypeData = {};
      let customOptionData = {};
      customFieldConfig.map((item,index)=>{
        let option={id:item.fieldId,content:item.fieldName,separator:false,disabled:false};
        selectOptionData.push(option);
        fieldTypeData[item.fieldId]=item.fieldType;
        if(item.fieldType=='4'){
          customOptionData[item.fieldId]=item.options;
        }
      });

      //解析当前字段类型
      let fieldType = '';
      if(conditionSelectVal!=''){
        fieldType = fieldTypeData[conditionSelectVal] || '';
      }
      if(fieldType=='1' || fieldType == '2'){
        conditionFieldVal = fieldVal.fieldVal || [];
      }
      return (<span>
                <Select weId={`${this.props.weId || ''}_lzldj1`}
                  className="dev_custom_radio_select"
                  data={selectOptionData}
                  onChange={v=>setOperatorData(v,conditionType,'fieldSelect')}
                  value={conditionSelectVal}>
                </Select>
                <Select weId={`${this.props.weId || ''}_lzldj1`}
                  className="dev_custom_radio_select"
                  data={(fieldType=='1' || fieldType=='2')?belongOptions:mathCompareOptions}
                  onChange={v=>setOperatorData(v,conditionType,'fieldValCompareSelect')}
                  value={conditionSelectCompareVal}>
                </Select>
                {(fieldType=='1' || fieldType=='2')&&
                  <Browser
                    module='workflow/pathdef'
                    type={fieldType=='1'?'position':'resource'}
                    browserAssociativeProps={{
                      useBoxSelection: false
                    }}
                    multiple={true}
                    onChange={data=>setOperatorData(data,conditionType,'fieldValSelect','browser')}
                    commonParams={fieldType=='1'?{virtualType:"All"}:{}}
                    value={conditionFieldVal}
                  />}
                {fieldType=='3'&&<InputNumber style={{width:50,"margin":"0 5px 0 5px"}} precision={0} value={conditionFieldVal} onChange={v=>setOperatorData(v,conditionType,'fieldValSelect')} />}
                {fieldType=='4'&&
                <Select weId={`${this.props.weId || ''}_lzldj1`}
                  className="dev_custom_radio_select"
                  data={customOptionData[conditionSelectVal]||[]}
                  onChange={v=>setOperatorData(v,conditionType,'fieldValSelect')}
                  value={conditionFieldVal}>
                </Select>}
                {conditionType=='condition3'&&<span><span className={spanClassName} style={spanStyle}>{getLabel(-982504924713181185,"的时候，结束逐级审批。满足当前结束条件时，")}</span>
                <Select weId={`${this.props.weId || ''}_lzldj1`}
                  className="dev_custom_radio_select"
                  data={isKeepOptions}
                  onChange={v=>setOperatorData(v,conditionType,'isKeep')}
                  value={isKeep}>
                </Select><span className={spanClassName} style={spanStyle}>{"当前审批人。"}</span>
                </span>}
                {conditionType=='condition6'&&<span><span className={spanClassName} style={spanStyle}>{"的时候，需要向上审批 "}</span>
                <InputNumber style={{width:50,margin:"0px 5px 0px 5px"}} value={conditionFieldVal2} precision={0} onChange={v=>setOperatorData(v,conditionType,'fieldVal2')} />
                <span className={spanClassName} style={spanStyle}>{" 个层级"}</span></span>}              
             </span>);
    }

    /**
     * 重写条件选项，每一项都重写
     */
    customOptionRender = (_props: RadioOptionProps, ele: React.ReactNode) => {
      const {formFieldDataParams} = this.props;
      const {operatorData,setOperatorData} = this.props.customOperatorStore;
      const {condition1={},condition2={},condition4={},condition5={}} = operatorData;
      let condition1SelectVal = condition1.selectVal || '';
      let condition1FieldVal = condition1.fieldVal || '';

      let condition2SelectVal = condition2.selectVal || '';
      let condition2FieldVal = condition2.fieldVal || [];
      let condition4SelectVal = condition4.selectVal || '';
      let condition4FieldVal = condition4.fieldVal || [];
      let condition5SelectVal = condition5.selectVal || '';
      let condition5SelectVal2 = condition5.selectVal2 || '';
      let condition5FieldVal = condition5.fieldVal || [];
      let condition5FieldVal2 = condition5.fieldVal2 || '';
      
      let optionData = _props.option;  
      let content;
      let divStyle = {"display":"flex","margin-bottom":"5px"};
      switch(optionData.id) {  
          case "15":  
              content=(<div style={divStyle}>
                          <div>{ele}</div>
                          <div><span className={spanClassName} style={spanStyle}>{"当前审批人的职级（安全级别）"}</span>
                              <Select weId={`${this.props.weId || ''}_lzldj1`}
                                className={'dev_custom_radio_select'}
                                data={mathCompareOptions}
                                onChange={v=>setOperatorData(v,'condition1','selectVal')}
                                value={condition1SelectVal}>
                              </Select>
                              <InputNumber style={{width:50,"margin-right":"5px"}} precision={0} value={condition1FieldVal} onChange={v=>setOperatorData(v,'condition1','fieldVal')} />
                              <span className={spanClassName} style={spanStyle}>{"时，结束逐级审批。"}</span>
                          </div></div>);  
              break;  
          case "16":  
              content = (<div style={divStyle}>
                          <div>{ele}</div>
                          <div><span className={spanClassName} style={spanStyle}>{"当前审批人的岗位"}</span>
                          <Select weId={`${this.props.weId || ''}_lzldj2`}
                                className={'dev_custom_radio_select'}
                                data={belongOptions}
                                onChange={v=>setOperatorData(v,'condition2','selectVal')}
                                value={condition2SelectVal}>
                          </Select>
                          <Browser
                            module='workflow/pathdef'
                            type='position'
                            browserAssociativeProps={{
                              useBoxSelection: false
                            }}
                            multiple={true}
                            onChange={data=>setOperatorData(data,'condition2','fieldVal','browser')}
                            commonParams={{virtualType:"All"}}
                            value={condition2FieldVal}
                          />
                          <span className={spanClassName} style={spanStyle}>{"时，结束逐级审批。"}</span></div></div>);  
              break;  
          case "17":
              content=(<div style={divStyle}>
                          <div>{ele}</div>
                          <div><span className={spanClassName} style={spanStyle}>{"当前审批人的人员卡片自定义字段"}</span>
                            {this.getCustomModule('condition3')}
                          </div>
                        </div>);  
              break;
          case "18":  
              content=(<div style={divStyle}><div>{ele}</div><div><span className={spanClassName} style={spanStyle}>{"当前审批人"}</span>
                        <Select weId={`${this.props.weId || ''}_lzldj2`}
                            className={'dev_custom_radio_select'}
                            data={belongOptions}
                            onChange={v=>setOperatorData(v,'condition4','selectVal')}
                            value={condition4SelectVal}>
                        </Select>
                        <Browser
                          module='workflow/pathdef'
                          type='resource'
                          browserAssociativeProps={{
                            useBoxSelection: false
                          }}
                          onChange={data=>setOperatorData(data,'condition4','fieldVal','browser')}
                          multiple={true}
                          value={condition4FieldVal}
                        /><span className={spanClassName} style={spanStyle}>{"时，结束逐级审批。"}</span>
              </div></div>);  
              break;
          case "19":  
              content=(<div style={divStyle}><div>{ele}</div><div><span className={spanClassName} style={spanStyle}>{"当前审批人"}</span>
                        <Select weId={`${this.props.weId || ''}_lzldj2`}
                            className={'dev_custom_radio_select'}
                            data={belongOptions}
                            onChange={v=>setOperatorData(v,'condition5','selectVal')}
                            value={condition5SelectVal}>
                        </Select>
                        <span className={spanClassName} style={spanStyle}>{"表单字段"}</span>
                        <Browser
                          module='workflow/core'
                          type='formFieldBrowser'
                          style={{"margin":"0px 5px 0px 5px"}}
                          browserAssociativeProps={{
                            useBoxSelection: false
                          }}
                          onChange={data=>setOperatorData(data,'condition5','fieldVal','browser')}
                          multiple={false}
                          dataParams={formFieldDataParams}
                          completeParams={formFieldDataParams}
                          value={condition5FieldVal}
                        /><span className={spanClassName} style={spanStyle}>{"里的人员时，在"}</span>
                         <Select weId={`${this.props.weId || ''}_lzldj1`}
                                  className="dev_custom_radio_select"
                                  data={stepCompareOptions}
                                  onChange={v=>setOperatorData(v,'condition5','selectVal2')}
                                  value={condition5SelectVal2}
                          ></Select>
                         {condition5SelectVal2!='23'&&<span><span className={spanClassName} style={spanStyle}>{"审批 "}</span>
                         <InputNumber style={{width:50,margin:"0px 5px 0px 5px"}} precision={0} value={condition5FieldVal2} onChange={v=>setOperatorData(v,'condition5','fieldVal2')} />
                         <span className={spanClassName} style={spanStyle}>{"个层级，"}</span></span>}
                         <span className={spanClassName} style={spanStyle}>{"结束逐级审批。"}</span>
                      </div></div>);  
              break;
          case "20":  
              content=(<div style={divStyle}>
                        <div>{ele}</div>
                        <div><span className={spanClassName} style={spanStyle}>{"当发起人的人员卡片自定义字段"}</span>
                        {this.getCustomModule('condition6')}
                        </div>
                      </div>);  
              break;
          default:  
              content=(<div>{ele}</div>)  
      }
      return content
    }

    render(){
      const {nodeDataParams,formFieldDataParams} = this.props;
      const {operatorData,setOperatorData} = this.props.customOperatorStore;
      const {approveStartOpertor={},approveLevel='',endCondition='',exceptionData={}} = operatorData;
      const {isOpen=false} = exceptionData;
      const startSelectVal = approveStartOpertor.selectVal || '';//逐级审批起始人 下拉框选项值
      const startFieldVal = approveStartOpertor.fieldVal || [];
      const exceptionFieldVal = exceptionData.nodeid || [];
      return (
            <div className='dev_custom_operator' style={{ width: "100%" }} >
              <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
                <Col weId={`${this.props.weId || ''}_pe3sni`} span={titleGridWidth}><span className={spanClassName} style={spanStyle}>{"逐级审批起始人"}</span></Col>
                <Col weId={`${this.props.weId || ''}_tw9l1c`} span={contentGridWidth}>
                  <div className='dev_custom_fieldval'>
                      <Select weId={`${this.props.weId || ''}_lzldj1`}
                          data={startComPareOptions}
                          onChange={v=>setOperatorData(v,'approveStartOpertor','selectVal')}
                          value={startSelectVal}>
                      </Select>
                    {startSelectVal=='10'&&<Browser
                        module='workflow/pathdef'
                        type='resource'
                        browserAssociativeProps={{
                          useBoxSelection: false
                        }}
                        onChange={data=>setOperatorData(data,'approveStartOpertor','fieldVal','browser')}
                        multiple={false}
                        value={startFieldVal}
                      />}
                    {startSelectVal=='11'&&<Browser
                        module='workflow/core'
                        type='formFieldBrowser'
                        browserAssociativeProps={{
                          useBoxSelection: false
                        }}
                        onChange={data=>setOperatorData(data,'approveStartOpertor','fieldVal','browser')}
                        multiple={false}
                        dataParams={formFieldDataParams}
                        completeParams={formFieldDataParams}
                        value={startFieldVal}
                      />}
                  </div>
                </Col>
              </Row>
              <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
                <Col weId={`${this.props.weId || ''}_pe3sni`} span={titleGridWidth}><span className={spanClassName} style={spanStyle}>{"审批层级"}</span></Col>
                <Col weId={`${this.props.weId || ''}_tw9l1c`} span={contentGridWidth}>
                  <div className='dev_custom_fieldval'>
                    <InputNumber style={{width:80,"margin-right":"5px"}} precision={0} value={approveLevel} onChange={v=>setOperatorData(v,'approveLevel','')} />
                    <Help title={"不设置，表示所有领导审批；设置了层级，则满足设置层级后结束审批"} placement="rightBottom" width={200} />
                  </div>
                </Col>
              </Row>
              <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
                <Col weId={`${this.props.weId || ''}_pe3sni`} span={titleGridWidth}><span className={spanClassName} style={spanStyle}>{"结束条件"}</span></Col>
                <Col weId={`${this.props.weId || ''}_tw9l1c`} span={contentGridWidth}>
                  <div className='dev_custom_fieldval' id="dev_radio">
                      <Radio
                        data={conditionRadioOptions}
                        customOptionRender={this.customOptionRender}
                        onChange={v=>setOperatorData(v,'endCondition','')}
                        value={endCondition}
                        vertical
                      />
                  </div>
                </Col>
              </Row>
              <Row weId={`${this.props.weId || ''}_9nswch`} align={"middle"} justify={"center"} style={{ minHeight: "40px" }}>
                <Col weId={`${this.props.weId || ''}_pe3sni`} span={titleGridWidth}><span className={spanClassName} style={spanStyle}>{"异常处理"}</span></Col>
                <Col weId={`${this.props.weId || ''}_tw9l1c`} span={contentGridWidth}>
                  <div className='dev_custom_fieldval'>
                    <div><span className={spanClassName} style={spanStyle}>{"是否启用 "}</span><Switch style={{"margin-left":"5px","margin-bottom":"2px"}} size="sm" value={isOpen} onChange={v=>setOperatorData(v,'exceptionData','isOpen')}/>
                    {isOpen&&<span><span className={spanClassName} style={{"margin-left":"10px"}}>{" 指定流转节点 "}</span>
                    <Browser
                      module='workflow/pathdef'
                      type='workflowPathNodeBrowser'
                      browserAssociativeProps={{
                        useBoxSelection: false
                      }}
                      style={{"margin-left":"5px","margin-right":"5px"}}
                      destDataParams={nodeDataParams}
                      dataParams={nodeDataParams}
                      completeParams={nodeDataParams}
                      onChange={data=>setOperatorData(data,'exceptionData','nodeid','browser')}
                      value={exceptionFieldVal}
                    /><Help title={"启用后，当实际审批层级小于设置的层级时，才会进入异常判断。"} placement="rightBottom" width={200} /></span>}</div>
                  </div>
                </Col>
              </Row>
            </div>
        ) 
    }

}

export default withRouter(CustomOperator)
