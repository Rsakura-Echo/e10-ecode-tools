
import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject,Provider } from 'mobx-react';
import { toJS } from 'mobx';
import { Select, HrmCard, DatePicker,Icon } from '@weapp/ui';
import { getLabel } from "@weapp/utils";
import { WffpNodeSubRequest } from '../../flowpage/block/comps';
import { OperatePanelStore } from './operatePanelStore';
import HrmCardItem  from './HrmCardItem';

const {getLocaleDateString}=DatePicker;

class OperatePanel extends React.Component<any> {
    render() {
        let operatePanelStore = new OperatePanelStore();
        return (
            <Provider weId={`${this.props.weId || ''}_ukosyv`} 
                operatePanelStore = {operatePanelStore} 
            >
                <Main weId={`${this.props.weId || ''}_l42tno`} 
                    {...this.props} 
                />

            </Provider>
        )
    }
}
export default OperatePanel;


@inject('operatePanelStore')
@observer
class Main extends React.Component<any> {

    static contextTypes = {
        moduleConfig: PropTypes.any,
    }

    state = {
        renderFlag: false,
        showSubWf: false
    }

    componentDidMount() {
        const { initParams, operatePanelStore,cell } = this.props;
        const { setCommonParams,setApiStrByModule } = operatePanelStore;
        setApiStrByModule(this.context.moduleConfig);
        setCommonParams(initParams);
        this.getOperateInfo(cell);
    }

 
    componentWillReceiveProps(nextProps:any) {
        const { initParams, operatePanelStore,cell } = nextProps;
        const { setCommonParams,cellInfo,getCellNodeId,clearStatusInfo } = this.props.operatePanelStore;
        setCommonParams(initParams);
        let lastCellNodeId = getCellNodeId(cellInfo);
        let nextCellNodeId = getCellNodeId(nextProps.cell);
        if(lastCellNodeId != nextCellNodeId) {
            clearStatusInfo();
            this.getOperateInfo(nextProps.cell);
        }
    }
    componentDidUpdate() {
        const { panelRenderDoneCallback }  = this.props;
        typeof panelRenderDoneCallback == 'function' && panelRenderDoneCallback();
    }

    getOperateInfo = (cell:any) => {
        if(cell.nodeAttributeI == 1 || cell.nodeAttributeI == 3) return //分流合流节点不能点开流程图
        const { getCellNodeId, getOperator, setCurrentOperateInfo,judgeValueInOperatorMap,getOperatorFlowInfo,setCurrentNodeInfo } = this.props.operatePanelStore;
        let nodeId = getCellNodeId(cell);
        setCurrentNodeInfo(cell);
        let sonNotGetData = cell.isOpenPanel == '0' && cell.hasOwnProperty('isHaveSubWorkflow'); //不能点开的子流程节点，
        if(!judgeValueInOperatorMap(cell) && !sonNotGetData || window.urlParams.workflowTestFlag) {
            let operatorFlowInfo = getOperatorFlowInfo(cell,{nodeId});
            // let operatorInfo = getOperator(cell, {nodeId});
            // Promise.allSettled([operatorFlowInfo,operatorInfo]);
        } else {
            setCurrentOperateInfo(cell);
        }
    }

    //获取操作时间结构
    getOperateTime = (info: any) => {
        let keys = Object.keys(info);
        let liDom: any = [];
        keys.length > 0 && keys.map((item: any) => {
            if (item == 'operateDateTime' && info[item] && info[item] != '') {
                liDom.push(<li key={`time_${item.nodeId}`}>{getLabel('63087', '提交')}: {getLocaleDateString(info[item])}</li>);
            }
            if (item == 'receiveDateTime' && info[item] && info[item] != '') {
                liDom.push(<li key={`time_${item.nodeId}`}>{getLabel('66054', '接收')}: {getLocaleDateString(info[item])}</li>);
            }
            if (item == 'viewDateTime' && info[item] && info[item] != '') {
                liDom.push(<li key={`time_${item.nodeId}`}>{getLabel('63091', '查看')}: {getLocaleDateString(info[item])}</li>);
            }
        });
        return liDom;
    }

    //获取操作着内容
    getMapContent = (arrInfo: any, simpleMode?:boolean) => {
        const { operateShowMode } = this.props.operatePanelStore;  
        let returnDomArr: any = [];
        const { cell } = this.props;
        arrInfo && arrInfo.length > 0 && arrInfo.map((item: any, index: number) => {
            let signIcon =  item.addByUserId  > 0 && operateShowMode != 1;
            let dom = (
                <div className={ simpleMode? 'simplemode single-operate-item-warp' : 'single-operate-item-warp'} key={item.nodeId}>
                    <p className='operate-name'>
                        {
                            item.agent ?
                                (
                                    <span key={`parent_${item.id}_${index}`}>
                                        <HrmCardItem weId={`${this.props.weId || ''}_ssfb1e@a_${index}`} item={item} isAgent={true} cellInfo={cell} isSpecial={operateShowMode == 1}/> 
                                        <span >{`->`}</span>
                                        <HrmCardItem weId={`${this.props.weId || ''}_xi6psr@b_${index}`} item={item} signIcon={signIcon}  cellInfo={cell} isSpecial={true}/>
                                    </span>
                                )
                                :
                                (
                                    <span key={`parent_${item.userId}_${index}`}>
                                        {
                                            <HrmCardItem weId={`${this.props.weId || ''}_givd0a@c_${index}`} item={item} signIcon={signIcon}  cellInfo={cell} isSpecial={operateShowMode == 1}/>
                                        }
                                    </span>
                                )
                        }
                    </p>
                    {
                        !simpleMode && <ul>
                            {this.getOperateTime(item)}
                        </ul>
                    }
                </div>
            )
            returnDomArr.push(dom);
        });
        return  returnDomArr
          
    }
    setshowSubWf = () => {
        this.setState({
            showSubWf: true
        })
    }

    closeshowSubWf = () => {
        this.setState({
            showSubWf: false
        })
    }
    //获取子流程底部内容
    getsoncontent = () => {
        const { cell } = this.props;
        let emptySonData = cell.isOpenPanel == '0' && cell.hasOwnProperty('isHaveSubWorkflow')
        let style = emptySonData? {height: '60px', lineHeight: '60px'} : {}
        return (
            <div className="son-container">
                <p className="link-word" 
                    style={style}
                    onClick={this.setshowSubWf}>
                        {getLabel('70080','查看子流程详情') }
                </p>
            </div>
        )
    }

    //获取流程计划到达时间内容
    getPlanTimeContent = (info: any) => {
        let returnDom = [];
        if (info && info.hasOwnProperty('planFinishDateTime') && info['planFinishDateTime'] != '') {
            returnDom.push(<p className="time-span " key={'planFinishDateTime'}>{getLabel('66626', '计划完成时间：')} <span title={getLocaleDateString(info['planFinishDateTime'])}>{getLocaleDateString(info['planFinishDateTime'])}</span></p>)
        }
        if (info && info.hasOwnProperty('realityFinishDateTime') && info['realityFinishDateTime'] != '') {
            returnDom.push(
                <p className="time-span" key={'realityFinishDateTime'} title={getLabel('66627', '实际完成时间：')}>
                    {getLabel('66627', '实际完成时间：')}
                    <span style={{ color: info.overtime ? '#ff4d4f' : '#898989' }} title={getLocaleDateString(info['realityFinishDateTime'])}>
                        {getLocaleDateString(info['realityFinishDateTime'])}
                    </span>
                </p>
            )
        }
        return (
            <div className="time-content-wrap">
                {returnDom}
            </div>
        )

    }

    operateStatusChange = (value: any) => {
        const { cell } = this.props;
        const { recodeOperateStatusValue,getOperator,resetCurrentPage, isOldApi,getCellNodeId } = this.props.operatePanelStore;
        recodeOperateStatusValue(cell.nodeId, value);
        resetCurrentPage();
        const { getBatchValue } = this.props.operatePanelStore;
        let nodeId = getCellNodeId(cell);
        if(!isOldApi) {
            getOperator(cell,{nodeId, status:getBatchValue().status, operateRound: getBatchValue().batch});
        }
    }
    selectChange = (value: any) => {
        const { cell } = this.props;
        const { recodeSelectBatchValue, recodeOperateStatusValue,getOperator,resetCurrentPage,isOldApi,getCellNodeId } = this.props.operatePanelStore;
        recodeSelectBatchValue(cell.nodeId, value);
        recodeOperateStatusValue(cell.nodeId, '');
        resetCurrentPage();
        const { getBatchValue } = this.props.operatePanelStore;
        let nodeId = getCellNodeId(cell);
        if(!isOldApi) {
            getOperator(cell,{nodeId, status:getBatchValue().status, operateRound: getBatchValue().batch});
        }
    }
    cancelClick = (event:any) => {
        event.stopPropagation();
    }
    //加载更多
    loadMoreData = (batch:string|number, status:string|number) => {
        const { getOperator,getCellNodeId } = this.props.operatePanelStore;
        const { cell } = this.props;
        let nodeId = getCellNodeId(cell);
        getOperator(cell,{nodeId, status, operateRound: batch}, null, true);
    }

    // 切换操作者的展示模式 
    changeOperateShowMode = () => {
        const { changeOperateShowMode } = this.props.operatePanelStore;
        changeOperateShowMode();
    }
    getFontColor = (status:string) => {
        let color = '';
        switch(status) {
            case('NO_VIEWED'): color = '#FF4D4F'; break;
            case('NO_SUBMITTED'): color = '#52C41A'; break;
            case('VIEWED'): color = '#FAAD14'; break;
            case('SUBMITTED'): color = '#5D9CEC'; break;
            default: color = '#5D9CEC';
        }
        return color;
    }

    //  采用操作者状态展示操作者 
    getStatusShowContent = (info:any) => {
        const { getBatchValue } = this.props.operatePanelStore;
        let { statusOptions, status } = getBatchValue();
        let _s = status.toLocaleLowerCase();
        if(_s == 'all') {
            return Object.keys(info).length > 0 && Object.keys(info).map((v:any,index:number) => {
                let operateContent = this.getMapContent(info[v],true);
                let selectOption = statusOptions.filter((option:any) => option.id == v);
                let fontColor = this.getFontColor(v)
                return (
                    <div className='operator-content' key={`operator_${status}_${index}`} style={{color: fontColor}}>
                        <p className='status-label'>{selectOption&&selectOption[0]?.content}</p>
                        {operateContent.length == 0 ? 
                            <p className='empty-span'>{getLabel('57855', '暂无数据')}</p> 
                            : <OperatorGroupPanel weId={`${this.props.weId || ''}_a5qjmt`} operateContent={operateContent}/>
                        }
                    </div>
                )
            })
        } else  {
            let operateContent = this.getMapContent(info[status],true);
            let selectOption = statusOptions.filter((option:any) => option.id == status);
            let fontColor = this.getFontColor(status)
            return (
                <div className='operator-content' style={{color: fontColor}}>
                    <p className='status-label'>{selectOption&&selectOption[0]?.content}</p>
                    {operateContent.length == 0 ? 
                            <p className='empty-span'>{getLabel('57855', '暂无数据')}</p> 
                            : 
                                <div className='operator-item-warp'>
                                    {
                                        operateContent
                                    }
                                </div>
                        }
                </div>
            )
        }
    }
    render() {
        const { showSubWf } = this.state;
        const { cell = null, position: { leftX, leftY }, origin = '' } = this.props;
        const { cellOperatorInfo = [],renderData,operateShowMode, loadOperatorInfo, loadOperateFlowInfo,operatorFlowInfo,getBatchValue,cellHasChangeBtn, isWfModule} = this.props.operatePanelStore;
        let renderOperateInfo:any = [];
        let renderDataFlag = renderData;
        const {statusCount = {},timeGroupMap = {} } = operatorFlowInfo;

        let info  = getBatchValue();
        let timeBatchData = timeGroupMap[info.batch] || {}; //实际到达时间数据
        if(cellOperatorInfo.hasOwnProperty('operatorGroupInfo')) { //未操作者的情况
            renderOperateInfo = cellOperatorInfo['operatorGroupInfo'];
        } else if (cellOperatorInfo.hasOwnProperty('operatorInfo') && cellOperatorInfo['operatorInfo']) { //来自操作组的数据
            if(operateShowMode == 0) { // 采用时间模式展示操作者
                renderOperateInfo = cellOperatorInfo['operatorInfo'][info.batch] && cellOperatorInfo['operatorInfo'][info.batch][info.status] || [];
            } else { // 采用操作者状态展示操作者 
                renderOperateInfo = cellOperatorInfo['operatorInfo'][info.batch];
            }
        }
        let emptySonData = cell.isOpenPanel == '0' && cell.hasOwnProperty('isHaveSubWorkflow'); //不能点开的子流程节点， 
        let operatorLoading = loadOperateFlowInfo || loadOperatorInfo;
        return (
            <div id='panel-container' style={{ left: leftX + 'px', top: leftY + 'px' }} onClick={this.cancelClick} >
                <div className="wfFrontOperator-container" >
                    <div className='wfFrontOperator-header'>
                        {
                            !operatorLoading && info.batchOption.length > 1 && <div className="batch-select-wrap">
                                <Select weId={`${this.props.weId || ''}_ihb9db`}
                                    data={info.batchOption}
                                    value={info.batch}
                                    onSelect={this.selectChange}
                                    className={''}
                                />
                            </div>
                        }
                        {
                            !operatorLoading && info.statusOptions.length > 1 && <div className='operate-status-wrap'>
                                <Select weId={`${this.props.weId || ''}_963sbp`}
                                    data={info.statusOptions}
                                    value={info.status}
                                    onSelect={this.operateStatusChange}
                                />
                            </div>
                        }
                        {
                            cellOperatorInfo.hasOwnProperty('operatorGroupInfo') && <span style={{ color: '#898989' }}>{getLabel('61418', '未操作')}</span>
                        }
                        {  
                            cell.hasOwnProperty('isHaveSubWorkflow') && cell.isOpenPanel == '0' && <span style={{ color: '#898989' }}>{getLabel('33776','子流程')} </span>
                        }
                    </div>
                    {
                        isWfModule && !operatorLoading && cellHasChangeBtn && (operateShowMode == 0 && renderOperateInfo.length != 0 || operateShowMode == 1 && Object.keys(renderOperateInfo).length != 0) && 
                            <div className='change-icon' title={operateShowMode == 0 ? getLabel('145973','点击按操作状态维度查看')  : getLabel('145975','点击按操作时间维度查看') } onClick={this.changeOperateShowMode}>
                                <Icon weId={`${this.props.weId || ''}_givv0c`} name="Icon-replace" size='xs'/>
                            </div>
                    }
                    <div className='wfFrontOperator-main'>
                        {
                            !operatorLoading && this.getPlanTimeContent(timeBatchData)
                        }
                         {
                            !operatorLoading && ( cellOperatorInfo.hasOwnProperty('operatorGroupInfo')  || operateShowMode == '0') &&  this.getMapContent(renderOperateInfo)
                        }
                        {
                             !operatorLoading && operateShowMode == 1 &&  this.getStatusShowContent(renderOperateInfo)
                        }
                        {
                            !operatorLoading && renderOperateInfo == 0 && !emptySonData && <div className='operatorItem'>
                                <p>{getLabel('57855', '暂无数据')}</p>
                            </div>
                        }
                        {
                            operatorLoading && <div className='operatorItem'>
                                <p>{getLabel('63097', '正在加载数据，请稍后')}</p>
                            </div>
                        }
                        {
                            !operatorLoading && cellOperatorInfo.isHasMore && <RenderFooter weId={`${this.props.weId || ''}_stb59p`} onClick={this.loadMoreData} batch={info.batch} status={info.status}/>
                              
                        }
                    </div>
                    {
                        !operatorLoading && origin != "interve-list"  &&  cell.isHaveSubWorkflow && this.getsoncontent()
                    }
                    {/* 流程干预点开不需要跳转子流程列表 */}
                    { showSubWf && origin != "interve-list" && <WffpNodeSubRequest weId={`${this.props.weId || ''}_janknx`}  nodeId={cell.nodeId} closeCallFun={this.closeshowSubWf}/>}
                </div>
            </div>
        )
    }
}

class RenderFooter extends React.Component<any> {
    onClick = () => {
        const { batch, status } = this.props;
        this.props?.onClick(batch,status)
    }
    render(): React.ReactNode {
        return (
            <div onClick={this.onClick} className="loadmore-footer">
            <span>{getLabel('57982', '加载更多')}</span>
            <Icon weId={`${this.props.weId || ''}_7r531x`} name={'Icon-Down-arrow01'} className="cursor-pointer" />
         </div>
        )
    }
}

class OperatorGroupPanel extends React.Component<any> {
    state = {
        folder:false, // 是否折叠
    }
   
    onFolder = () => {
        this.setState({folder: !this.state?.folder});
    }
    render() {
        const { operateContent } = this.props;
        const { folder = false } = this.state;
        return (
            <>
                 {
                    operateContent.length >= 20 && <div className={!folder ? 'folder folder-btn' : 'open folder-btn'} title={!folder ? getLabel('53487', '更多') : getLabel('108922','收起') } onClick = {this.onFolder}>
                         {
                             !folder ?  <Icon weId={`${this.props.weId || ''}_7r531x`} name={'Icon-Down-arrow01'} className="cursor-pointer" />
                             :  <Icon weId={`${this.props.weId || ''}_7r531x`} name={'Icon-up-arrow01'} className="cursor-pointer" /> 
                         }
                    </div>
                }
                <div className={'operator-item-warp'} >
                    {
                        !folder &&  operateContent.length >= 20 ? <div>{operateContent.slice(0,20) }...</div> : operateContent
                    }
                </div>
            
            </>
        )
    }
}