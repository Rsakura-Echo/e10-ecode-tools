import React from 'react';
import {Menu } from '@weapp/ui';
import {Button} from '@weapp/ui';
import {getLabel} from '@weapp/utils';
import {toJS} from 'mobx';

class CustTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: []
    }
  }

  


  
  doOperateEvent = (param: any) => {
    console.log('doOperateEvent>>=====',param)
      window.weappWorkflow.getFlowPageSDK().doTriggerRightBtnByBtnMenu(param);
  }

  clickMoreBtn = (btnkey: string) => {  
    console.log('clickMoreBtn>>btnkey=====',btnkey)
    interface OperMenuItem{
          id?:string,
          menutype:string,
          title?:string,
          istop?:boolean,
          menuKey:number,
          nodeId?:string
          visible?:boolean,
          mobileIcon?:string,
          pcIcon?:string,
          feedbackControl?:number,
          subwfsetid? : string,
          addStepMode?:number
      }
    const operMenus = this.props.visibleOperMenus;
      operMenus && operMenus.forEach((item: OperMenuItem) => {
        let { id, istop, menutype, title } = item;
        if(btnkey==id){
          window.weappWorkflow.getFlowPageSDK().doTriggerRightBtnByBtnMenu(item);
        }  
    });    
  }

  getTopButtons = (props: any, btnDisabled:boolean) => {
      interface OperMenuItem{
        id?:string,
        menutype:string,
        title?:string,
        istop?:boolean,
        menuKey:number,
        nodeId?:string
        visible?:boolean,
        mobileIcon?:string,
        pcIcon?:string,
        feedbackControl?:number,
        subwfsetid? : string,
        addStepMode?:number
      }

      // const { wffpBaseStore: baseStore } = props;
      // const { varObParam,rightBtnNums =2} = baseStore;
      const operMenus = props.visibleOperMenus;
      let topBtns: Array<any> = [];
      let moreBtnDatas: any = [];
      let topIndex:number = 0;
      //console.log('operMenus:',operMenus);
      operMenus && operMenus.forEach((item: OperMenuItem) => {
          let { id, istop, menutype, title } = item;
          // const wffpOperEmbedDisabled : any = varObParam.has(`${WffpOperEmbedDisabledKey}_${menutype}`) && varObParam.get(`${WffpOperEmbedDisabledKey}_${menutype}`);
          if (item.istop && topIndex <= 10) { //最少显示11个按钮
              topBtns.push( 
                <Button weId={`${this.props.weId || ''}_xomsa1@${topIndex}`  } style={{ 'margin-left': '8px' }} 
                  type={topIndex === 0 ? "primary" : "default"}
                  key={item.menutype}
                  disabled={btnDisabled}
                  onClick={()=>this.doOperateEvent(item)}
                  title={item.title}
                >{item.title}</Button>);
              topIndex++;
          } else {
              moreBtnDatas.push({ id: id, content: title, disabled: btnDisabled, icon: item?.pcIcon || 'Icon-report-o'});
          }        
      });
      if(moreBtnDatas.length > 0) {
        topBtns.push(<Menu weId={`${this.props.weId || ''}_zy5bee1`}
                style={{ 'margin-left': '8px' }}
                overlayClassName={`wffp-frame-morebtn-overlay`}
                value={""}
                data={toJS(moreBtnDatas)}
                type="select"
                popupPlacement="bottomRight"
                customSelectContent={<Button weId={`${this.props.weId || ''}_0j5l21j`} disabled={btnDisabled}>{getLabel('53487', '更多')}</Button>}
                onChange={this.clickMoreBtn}
          />);
      } 
      return {topBtns};
  }

  render() {
    console.log('btn-props',this.props)
    window.testprops = this.props;
    const { Com } = this.props;
    let  buttons = this.getTopButtons(this.props, false).topBtns;
    const { disabled } = this.state;
    return <div style={{ 'text-align': 'center' ,'margin-top':'8px'}} >
      <div>{buttons}</div>
    </div>
  }
}

export default CustTable;
