import React from 'react';
import Performance from './PerformancePage'
import Appraisal from './AppraisalPage'
import WorkEffectivenessPage from './WorkEffectivenessPage'
import { request, getLabel } from '@weapp/utils';
import { Icon, Dialog} from '@weapp/ui';

const { confirm } = Dialog;

// 绩效考核元素 Performance Appraisal Element
class PAelement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList:[
        // {type:'1', name:getLabel('231592','历史绩效') },
        {type:'2', name:getLabel('231593','考核提醒') },
        {type:'3', name:getLabel('231594','历史绩效') },
      ],
      selectTab:'2',
      projectOrSale: ''
    }
  }
  
  confirm = () => {
    confirm({
      content: `${getLabel('230309','您尚有绩效考核未完成打分,现在去打分')}?`,
      onOk: () => {
        // window.open('sp/performance/flow/dealresult', '_blank')
        window.open('https://' + window.location.host+ '/sp/performance/flow/dealresult', '_blank')
      },
      onCancel: () => {
      },
      destroy: () => {
      }
    });
  }

  componentDidMount() {
    //  判断人员是否是销售/项目
    const E10_TEAMS_LOCAL = JSON.parse(localStorage.getItem('E10_TEAMS_LOCAL'));
    if (E10_TEAMS_LOCAL){
      // const employeeId = E10_TEAMS_LOCAL?.currentUser?.employeeId;
      const formdata = E10_TEAMS_LOCAL?.currentUser?.formdata;
      if(formdata){
        request({
          url: '/api/hrm/form/core/getFormDataAndLayout',
          method: 'POST',
          data: {
            allReadOnly: true,
            dataId: formdata,
            formId: '100546070000000300',
            initialDatas: [],
            layoutId: '',
            layoutMultiId: '100546070000000300',
            local: true,
            module: 'hrm',
            newLayout: true,
            terminalType: 'PC'
          }
        }).then(result => {
          if (result?.status && result?.data?.formData?.dataDetails){
            for(let i =0;i < result?.data?.formData?.dataDetails.length;i++){
              const item = result?.data?.formData?.dataDetails[i];
              if (item.fieldId === "100001571936997960" && item.dataOptions[0]){
                let dutyClassify = item.dataOptions[0].content;
                // 开发用
                // const name = E10_TEAMS_LOCAL?.currentUser?.name;
                // if(name === '姜文杰'){
                //   dutyClassify = '销售';
                //   this.setState({
                //     tabList:[
                //       {type:'1',name:"工作成效"},
                //       {type:'2',name:"考核提醒"},
                //       {type:'3',name:"历史绩效"},],
                //       selectTab:'1',
                //       projectOrSale: dutyClassify,
                //   })
                //   return;
                // }

                if(dutyClassify === '销售' || dutyClassify === '项目'){
                  this.setState({
                    tabList:[
                      {type:'1', name:getLabel('231592','工作成效')},
                      {type:'2', name:getLabel('231593','考核提醒')},
                      {type:'3', name:getLabel('231594','历史绩效')},],
                      selectTab:'1',
                      projectOrSale: dutyClassify,
                  })}
                return;
              }
            }
          }
        })
      }
    }

    // request({
    //   url: '/api/baseserver/layout/teamsCheck?clientType=not_xinchuang',
    //   method: 'POST'
    // }).then((result) => {
    //   let respDesc = result?.currentUser?.respDesc;
    //   // respDesc = '销售';
    //   if(respDesc === '销售'){
    //     this.setState({
    //       tabList:[
    //       {type:'1',name:"工作成效"},
    //       {type:'2',name:"考核提醒"},
    //       {type:'3',name:"历史绩效"},],
    //       selectTab:'1',
    //       projectOrSale: respDesc,
    //   })}
    // })

    //  是否弹出Dialog    
    request({
        url: '/api/workrelate/performance/flow/needShowDialog',
        method: 'GET',
    }).then((result: any) => {
      const { canShowDiaLog } = result.data;
      const hadShowDialog = this.hadOpenDialog();
      if(canShowDiaLog && !hadShowDialog){
        this.confirm();
      } 
    })
  }

  hadOpenDialog = () =>{
    const todayDate = new Date().toLocaleDateString();
    const hadShow = JSON.parse(localStorage.getItem(`E10_PAElement_HadShowDialog`));
    if(!hadShow){
      this.setDialogHadShow();
      return false;
    }
    if(!hadShow[todayDate]){
      this.setDialogHadShow();
      return false;
    }
    return hadShow[todayDate];
  }

  setDialogHadShow = () => {
    const todayDate = new Date().toLocaleDateString();
    const todayDateL = {};
    todayDateL[todayDate] = true;
    localStorage.setItem(`E10_PAElement_HadShowDialog`, JSON.stringify(todayDateL));
  }

  onLinkMore = () =>{
    window.open('/sp/performance/flow/mineResult','_blank')
  }

  onChangeTab = (i) =>{
    this.setState({
      selectTab:i
    })
  }

  render() {
    const {tabList=[],selectTab='1', projectOrSale } = this.state;
    const {useType} =this.props;
    return (
      <div className="PA-element">
        <div className='PA-tab-header'>
          <div className='PA-tab-list'>
          {
            tabList.map((i)=>{
              return(
                <span 
                  className={selectTab === i.type ? "PA-tab-item selected-item" : "PA-tab-item" }
                  onClick={() =>this.onChangeTab(i.type)}
                >
                {i.name}
                </span>
              )
            })
          }
        </div>
        {selectTab === '3'
          ? <div  className='Pa-element-more' onClick={this.onLinkMore}>
              <Icon 
                name="Icon-more05"  
              />
            </div>
          : null
        }
        </div> 
        {
          selectTab === '1'? <WorkEffectivenessPage useType={useType} projectOrSale={projectOrSale}/> 
          : selectTab === '2' ? <Performance useType={useType}/> : <Appraisal useType={useType}/>
        }
      </div>
    );
  }
}


// 自定义组件props不要使用type字段，type字段会被赋值当前组件的类型
// 设置默认值设计器才会有默认配置
// PAelement.defaultProps = {
//   config: {
//     content: '考核绩效元素内容',
//     title:"考核绩效元素",
//      titleEnabled: true,
//   }
// }
// 定制化配置流式布局的默认属性
// PAelement.flow = {
//   defaultProps: {
//     config: {
//     }
//   }
// }

// 看代码逻辑grid布局的组件必须设置属性defaultOpts.layoutSizes
// PAelement.defaultOpts = {
//   operationBtns: true,
//   mask: true,
//   layoutSizes: {
//     gl: {
//       w: 4,
//       h: 15,
//     },
//   },
// }


export default PAelement;

