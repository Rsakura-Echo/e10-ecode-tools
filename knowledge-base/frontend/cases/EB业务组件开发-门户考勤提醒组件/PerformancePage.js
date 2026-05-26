import React from 'react';
import { request, getLabel } from '@weapp/utils';
import { Empty, Icon, Dialog } from "@weapp/ui";

// 考核 Performance 
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newList:'',
      getNoReadAuditPassedList:'',
      getNoReportList:'',
      getNoReadNewCommentList:'',
      getNeedMeAuditList:'',
    }
  }

  componentDidMount() {
     request({
      url: '/api/workrelate/performance/flow/getPortalPendingNums',
      method: 'POST',
    }).then((result: any) => {
      this.setState({
        newList:result.data
      })
    });

// 当前报告人未查看过，审批通过后的报告（实例：您的xx计划报告已通过）
    request({
      url: '/api/workrelate/plan/element/getNoReadAuditPassedList',
      method: 'POST',
       data: {},
    }).then((result: any) => {
      // console.log('当前报告人未查看过，审批通过后的报告（实例：您的xx计划报告已通过）',result)
      this.setState({
        getNoReadAuditPassedList:result.data.reportList
      })
    });
// 当前时间段需要提交但未提交的报告（实例：请提交xx年xx月计划报告）
     request({
      url: '/api/workrelate/plan/element/getNoReportList',
      method: 'POST',
       data: {},
    }).then((result: any) => {
      // console.log('当前时间段需要提交但未提交的报告（实例：请提交xx年xx月计划报告）',result)
      this.setState({
        getNoReportList:result.data.reportList
      })
    });
  // 有新评论，但自己还没看过的报告（实例：您的xx计划报告有新反馈） 
     request({
      url: '/api/workrelate/plan/element/getNoReadNewCommentList',
      method: 'POST',
       data: {},
    }).then((result: any) => {
      // console.log('有新评论，但自己还没看过的报告（实例：您的xx计划报告有新反馈）',result)
      this.setState({
        getNoReadNewCommentList:result.data.reportList
      })
    });
//  需要当前登录人审批的报告（实例：您有x个待审批工作总结）
     request({
      url: '/api/workrelate/plan/element/getNeedMeAuditList',
      method: 'POST',
       data: {},
    }).then((result: any) => {
      // console.log('需要当前登录人审批的报告（实例：您有x个待审批工作总结）',result)
      this.setState({
        getNeedMeAuditList:result.data
      })
    });
  }

  openNewLink=(link)=>{
    const {useType} =this.props;
    if(useType != 'Design' && link && link !=''){
      window.open(link,'_blank');
    }
  }

  render() {
    const {newList,getNoReportList=[],getNoReadAuditPassedList=[],getNoReadNewCommentList=[],getNeedMeAuditList=[]} = this.state;

    // 绩效部分
    // let auditTitle = `您有`+newList.auditNum+`个待审批考核方案`;
    // let scoreTitle = `您有`+newList.scoreNum+`个待评分绩效考核`;
    // let approveTitle = `您有`+newList.approveNum+`个待审批绩效考核`;
    let auditLink = '/sp/performance/flow/dealresult?tab=audit';
    let approveLink = '/sp/performance/flow/dealresult?tab=approve';
    let scoreLink = '/sp/performance/flow/dealresult?tab=score';

    return (
       <div  className='PA-content'>
        <div className='PA-performance'>
          <div style={{display:'none'}}>{getLabel('230311','当前周期未设置方案数量')}</div>
          {newList.auditNum ? (<div id='audit'><span onClick={() => this.openNewLink(auditLink)}>{getLabel('230312','您有')}{newList.auditNum}{getLabel('230313','个待审批考核方案')}</span></div>) : null}
          {newList.scoreNum ? (<div id='score'><span onClick={() => this.openNewLink(scoreLink)}>{getLabel('230312','您有')}{newList.scoreNum}{getLabel('230314','个待评分绩效考核') }</span></div>) : null}
          {newList.approveNum ? (<div id='approve'><span onClick={() => this.openNewLink(approveLink)}>{getLabel('230312','您有')}{newList.approveNum}{getLabel('230315','个待审批绩效考核')}</span></div>) : null}
          {
              getNoReadAuditPassedList[0] != undefined ?
              (
                getNoReadAuditPassedList.map((i)=>{
                  return <div className='getNoReadAuditPassed'><span onClick={() => this.openNewLink(i.linkUrl)}>{i.title}</span></div>
                })
              ):null 
          }
          {
              getNoReadNewCommentList[0] != undefined ?
              (
                getNoReadNewCommentList.map((i)=>{
                  return <div className='getNoReadNewComment'><span onClick={() => this.openNewLink(i.linkUrl)}>{i.title}</span></div>
                })
              ):null
          }
          {
            getNeedMeAuditList != undefined ?
            
                <div className='getNeedMeAudit'><span onClick={() => this.openNewLink(getNeedMeAuditList.linkUrl)}>{getNeedMeAuditList.title}</span></div>
              
            :null
          }
          {
            getNoReportList[0] != undefined ?
              (
                getNoReportList.map((i)=>{
                  return <div className='getNoReport'><span onClick={() => this.openNewLink(i.linkUrl)}>{i.title}</span></div>
                })
              ):null 
          } 
          {
            (!newList.auditNum && !newList.scoreNum && !newList.approveNum 
            && !getNoReadAuditPassedList[0] && !getNoReadNewCommentList[0] && !getNoReportList[0] 
            && (!getNeedMeAuditList || !getNeedMeAuditList.title))
            ? <div className='PA-empty'>
              <Empty
                title={getLabel('54023','暂无数据')}
                image={
                  <Icon
                    style={{ width: 100, height: 100 }}
                    name={'Icon-NDuniversal-mcolor'} 
                  />}
              />
            </div>
             : null
          }
        </div>
      </div>
    );
  }
}


export default Performance;

