import {inject, observer} from "mobx-react";
import React,{Suspense} from 'react';
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import FreeSignChartDrawLine from "./freeSignChartDrawLine";
import FreeSignChartDrawNode from "./freeSignChartDrawNode";
import FreeSignChartDrawGroup from "./freeSignChartDrawGroup";
import { getCurrentElementPoint, getBranchLastGroup } from './utils';



@inject('freeChartStore')
@observer
class WorkflowFree extends React.Component<any>{

    static contextTypes = {
        moduleConfig: PropTypes.any,
    }
    componentDidMount = () => {
        const { setApiStr } = this.props.freeChartStore;
        setApiStr(window.ETChartAPIStr);
        const { templateid = -1 , modelSetModalShow = false,isReadOnlyModel, chartRenderNum,drawFlowMode } = this.props;
        if(templateid != -1){
            modelSetModalShow && this.initalFreeDatas();
        }else{
            this.initalFreeDatas();
        }
        if(drawFlowMode == 'horizontal') {
            let container = document.querySelector('.workflowDesign-free-svg-container.chartNum' + chartRenderNum) as HTMLDivElement;
            if(container) {
                container.style.top = '0px';
                container.style.left = (this.props.cellMaxWidth) + 'px';
                container.style.height = '100%';
            }
        }
    }
    initalFreeDatas(){
        const { pathParams,createNodeInfo,cellMaxHeight,cellMaxWidth,isReadOnlyModel,chartRenderNum, drawFlowMode} = this.props;
        const { initalFreeWfDatas , setOrginWfNodesInfo,changeStoreState,setCommonPathParams,setChartParams } = this.props.freeChartStore;
        setCommonPathParams({...pathParams});
        setChartParams({chartRenderNum});
        /**
        isAllowNodeFreeFlow: 0 || 1, 自由节点节点
        isFree : 0 || 1 , 自由流程
        两者是互斥的  一方为1 另一个则为0 
         */
        
        initalFreeWfDatas();
        if(pathParams.isFlowModel != '1'){
            setOrginWfNodesInfo({createNodeInfo,cellMaxHeight,cellMaxWidth,drawFlowMode});
            changeStoreState({drawFlowMode});
        } 
        changeStoreState({isReadOnlyModel});
    }

   //绘制链接自由流程图和原流程图的开始和结束线段
    renderSupStartAndEndLine(element:any={},pointIndex=''){
        const {  cellMaxHeight = 0 , createNodeInfo = {} , isFree, cellMaxWidth} = this.props;
        const {wfFreeDatasPoints , circulationParams,allValidNodesPostions,allValidNodesNodeLinks,drawFlowMode,
        validWorkFlowDatas,currentSignSetNode , everyFreeNodeOffsetY,circulationOrginNode,forecastNodeIds} = this.props.freeChartStore;
        const { freeStartNodeid = '' , freeEndNodeid = ''} = element;
        const { flowType='1'} = currentSignSetNode;
        const {  currentStartNode} = validWorkFlowDatas;
        let startPosition = allValidNodesPostions[freeStartNodeid];
        let curFreeNodeOffsetY = everyFreeNodeOffsetY[freeStartNodeid] || 0;

        const endElement = getBranchLastGroup(element) || {};
        const {nodeChartEntity = {}} = endElement;
        const {outLineStatus = 0} = nodeChartEntity;
        const {inLineStatus = 0 } = element.nodeChartEntity || {}

        let secondPt:any = {};
        if(element.nodeElement){
            secondPt = getCurrentElementPoint(element,wfFreeDatasPoints,pointIndex) || {};
        }else{
            secondPt = getCurrentElementPoint(element,wfFreeDatasPoints,pointIndex)[0] || {};
        }
        let supLines:any = [];
        let bgColor = circulationParams.noPassedLinkColor;
        let supStart , supEnd ;
        let onlyKey=`${Math.round(Math.random()*80+20)}_${new Date().getTime()}`;
        if(toJS(element)){
            let freeNodeEndArr = [];
            if(freeStartNodeid == freeEndNodeid) {
                const {allOrginNodes = []} = toJS(circulationOrginNode);
                let linkname  = '';
                for (let index = 0; index  < allOrginNodes.length ;index++) {
                    let item = allOrginNodes[index];
                    if(item.nodeId  == freeStartNodeid) {
                        linkname = item.value;
                        break
                    }
                }
                freeNodeEndArr.push({
                    id:'',
                    destNodeId : freeStartNodeid,
                    linkname : '',
                    linkinfo : linkname,
                    ispass : outLineStatus == 1 ? '1' : '0'
                })
            } else {
                freeNodeEndArr = allValidNodesNodeLinks[freeStartNodeid] || [];
                if(freeNodeEndArr.length > 0) {
                    freeNodeEndArr = freeNodeEndArr.filter((item:any) => freeEndNodeid.indexOf(item.destNodeId) > -1);
                }
            }
            // *******************
            JSON.parse(JSON.stringify(toJS(freeNodeEndArr))).map((v:any,i:number)=>{
                const linktitle = v.linkinfo;
                let endPosition = JSON.parse(JSON.stringify(allValidNodesPostions[v.destNodeId]));
                let ispassed = outLineStatus == 1 && v['ispass'] == '1';

                let endArrowStyle:any = {
                    position: 'absolute',
                    // borderBottom: `9px solid ${ispassed ? circulationParams.passedLinkColor:'#8c8c8c'}`,
                    borderBottom: `9px solid ${this.getStrockColor(v.destNodeId, ispassed ? 1 : 0, circulationParams.noPassedLinkColor, v.destNodeId)}`,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    left: '-3.5px',
                    top: '-1px',
                }
                let supHoverParams = {
                    strokeWidth:10,
                    stroke : 'transparent',
                    fill : 'none'
                }
                if(drawFlowMode != 'vertical') {
                    endArrowStyle = {
                        position: 'absolute',
                        // borderBottom: `9px solid ${ispassed ? circulationParams.passedLinkColor:'#8c8c8c'}`,
                        borderRight: `9px solid ${this.getStrockColor(v.destNodeId, ispassed ? 1 : 0, circulationParams.noPassedLinkColor, v.destNodeId)}`,
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                        left: '-0.5px',
                        top: '-4px',
                    }
                }

                if(freeStartNodeid == v.destNodeId){
                    if(drawFlowMode == 'vertical') {
                        endPosition = {...endPosition,x:endPosition.x+5};
                    } else {
                        endPosition = {...endPosition,y:endPosition.y + 6};
                    }
                }
                if(i == 0){
                    let _left = 0, _top = 0, startLineStyle:any = {};
                    if(drawFlowMode == 'vertical') {
                         _left = (isFree != '1' && freeStartNodeid == v.destNodeId) ? startPosition.x - 5 : startPosition.x;
                         _top = startPosition.y;
                         startLineStyle = {
                            left:`${_left}px`,
                            top : -startPosition.y + 'px',
                            width:'1.5px',
                            height:`${(secondPt.x > startPosition.x ? startPosition.y + 10 : startPosition.y + curFreeNodeOffsetY)}px`,
                        }
                    } else {
                        _top = (isFree != '1' && freeStartNodeid == v.destNodeId) ? startPosition.y - 5 : startPosition.y ;
                        startLineStyle = {
                            left:`-${cellMaxWidth - startPosition.x - 2}px`,
                            top: _top - 1 + 'px',
                            width:`${(cellMaxWidth - startPosition.x + curFreeNodeOffsetY)}px`,
                            height: '1.5px',
                        }
                    }
                    let pathParams = {
                        stroke: this.getStrockColor('', inLineStatus, bgColor, v.destNodeId),
                        strokeWidth:"1.5",
                        strokeMiterlimit:"10"
                    }
                    supLines.push(
                        <div className='free-wf-sup-line sup-line-start' 
                            key={`${onlyKey}-start`} 
                            data-time={onlyKey}
                            style={{
                                position:'absolute',
                                left:startLineStyle.left,
                                top: startLineStyle.top,
                            }}
                        >
                            {
                               drawFlowMode == 'vertical' ? ( <svg width="10" height="837.5px" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="translate(-1.5,0)">
                                    <path className={`${onlyKey}_verticalstartconnectsvg_showpath connectStartLabelOuter edge_${pointIndex}`} data-edgeKey={`${pointIndex}`}  key={`${onlyKey}_verticalstartconnectsvg`} d={`M 1 0 L1 ${startLineStyle.height}`} data-originColor={pathParams.stroke} fill="none" {...pathParams}></path>
                                    <path key={`${onlyKey}_verticalstartconnectsvg_shawdom`}   d={`M 5.5 0 L 5.5 ${endPosition.y}`} {...supHoverParams} data-key={`${onlyKey}_verticalstartconnectsvg`}  data-originColor={pathParams.stroke}> </path>
                                </svg> ) : (<svg width={startLineStyle.width} height="10" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path className={`${onlyKey}_horizontalstartconnectsvg_showpath connectStartLabelOuter edge_${pointIndex} `} data-edgeKey={`${pointIndex}`} key={`${onlyKey}_horizontalstartconnectsvg`}  d={`M 0 1 L ${parseInt(startLineStyle.width)} 1`} fill="none" {...pathParams} data-originColor={pathParams.stroke}></path>
                                    <path key={`${onlyKey}_shawdom`}  d={`M 0 1 L ${parseInt(startLineStyle.width)} 1`} {...supHoverParams} data-key={`${onlyKey}_horizontalstartconnectsvg`}  data-originColor={pathParams.stroke}> </path>
                                </svg>)
                            }
                            
                        </div>
                    );
                    
                }
                if(drawFlowMode == 'vertical') {
                    let pathParams = {
                        stroke: this.getStrockColor(v.destNodeId, ispassed ? 1 : 0, bgColor, v.destNodeId),
                        strokeWidth:"1.5",
                        strokeMiterlimit:"10"
                    }
                    supLines.push(
                        <div className='free-wf-sup-line sup-line-end' 
                            key={`${onlyKey}-end_${i}`}
                            style={{
                                position:'absolute',
                                width:'1.5px',
                                left:`${endPosition.x - 1}px`,
                                height:`${endPosition.y}px`,
                                top : -(endPosition.y - 2) + 'px',
                            }}
                            title={linktitle}
                        >
                            <svg width={10} height={endPosition.y} version="1.1" xmlns="http://www.w3.org/2000/svg" transform="translate(-3.5,0)">
                                <path className={`${onlyKey}_verticalendconnectsvg_showpath connectEndLabelOuter edge_${v.destNodeId}_${pointIndex} `} data-edgeKey={`${v.destNodeId}_${pointIndex}`}  key={`${onlyKey}_verticalendconnectsvg`} d={`M 5.5 0 L 5.5 ${endPosition.y}`} fill="none" {...pathParams}  data-originColor={pathParams.stroke}></path>
                                <path key={`${onlyKey}_verticalendconnectsvg_shawdom`}   d={`M 5.5 0 L 5.5 ${endPosition.y}`} {...supHoverParams} data-key={`${onlyKey}_verticalendconnectsvg`}  data-originColor={pathParams.stroke}> </path>
                                <path className={`connectEndLabelOuter edge_${v.destNodeId}_${pointIndex} `} d={'M5.5 0.5 L1.5 8.5 L9.5 8.5'} data-edgeKey={`${v.destNodeId}_${pointIndex}`}  fill={pathParams.stroke} {...pathParams} data-originColor={pathParams.stroke}></path>
                            </svg>
                        </div>
                    );
                } else {
                    let width = cellMaxWidth -endPosition.x + curFreeNodeOffsetY;
                    let pathParams = {
                        stroke: this.getStrockColor(v.destNodeId, ispassed ? 1 : 0, bgColor, v.destNodeId),
                        strokeWidth:"1.5",
                        strokeMiterlimit:"10"
                    }
                    
                    supLines.push(
                        <div className='free-wf-sup-line sup-line-end' 
                            key={`${onlyKey}_${i}`} 
                            style={{
                                position: 'absolute',
                                left:`-${cellMaxWidth - endPosition.x - 2}px`,
                                width:`${width}px`,
                                top : (endPosition.y - 1) + 'px',
                                height: '1.5px',    
                            }}
                            title={linktitle}
                        >
                             <svg width={width} height="10" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="translate(0,-3.5)">
                                <path className={`${onlyKey}_horizontalendconnectsvg_showpath connectEndLabelOuter  edge_${v.destNodeId}_${pointIndex}`} data-edgeKey={`${v.destNodeId}_${pointIndex}`} key={`${onlyKey}_horizontalendconnectsvg`}  d={`M 0 4.5 L ${width} 4.5`} fill="none" {...pathParams} data-originColor={pathParams.stroke}></path>
                                <path key={`${onlyKey}_shawdom`}   d={`M 0 4.5 L ${width} 4.5`} {...supHoverParams} data-key={`${onlyKey}_horizontalendconnectsvg`}  data-originColor={pathParams.stroke}> </path>
                                <path className={`connectEndLabelOuter  edge_${v.destNodeId}_${pointIndex}`} data-edgeKey={`${v.destNodeId}_${pointIndex}`} d={'M0.5 4.5 L8.5 0.5 L8.5 8.5'} fill={pathParams.stroke} {...pathParams} data-originColor={pathParams.stroke}></path>
                            </svg>
                        </div>
                    );
                    
                }
            })
        }
        return supLines;
    }
  

    //获取线条的颜色
    getStrockColor(nodeid:string, inLineStatus:number|string, noPassedLinkColor:any, destNodeId:any) {
      
        const { forecastNodeIds, circulationParams } = this.props.freeChartStore;

        //是否为预测出来的节点
        let isForecastNode = false;
        if(destNodeId != undefined && destNodeId != '') {//有传入出口到达节点，用此节点判断。简易模式下传入的endNodes不准确
            isForecastNode = forecastNodeIds && forecastNodeIds != '' && (","+forecastNodeIds+",").indexOf(","+destNodeId+",") > -1;
        } else {
            isForecastNode = forecastNodeIds && forecastNodeIds != '' && (","+forecastNodeIds+",").indexOf(","+nodeid+",") > -1;
        }
        if(nodeid == undefined && forecastNodeIds && forecastNodeIds != '') {
            isForecastNode = true;
        }

        let strokeColor = '';
            if(inLineStatus == 1 ) {
                strokeColor = circulationParams.passedLinkColor;
            } else if(isForecastNode){
                strokeColor = circulationParams.forecastLinkColor;
            } else {
                strokeColor = noPassedLinkColor ? noPassedLinkColor : circulationParams.noPassedLinkColor;
            }
        return strokeColor
    }
    onContainerClick = () => {
        const { isReadOnlyModel } = this.props;
        const { chartParams:{chartRenderNum} } = this.props.freeChartStore;
        if(!isReadOnlyModel) return 
        window['hideWfOperatorInfo_' + chartRenderNum]&&  window['hideWfOperatorInfo_' + chartRenderNum]();
    }
    setPathLine = (className:string, color: string, mode?:string,edgeKey?:string) => {
        let selector = className;
        if(className == '.connectStartLabel' || className == '.connectEndLabel') {
            this.setPathLine(className+'Outer', color, mode,edgeKey);
        }
        if(edgeKey) {
            selector += `.edge_${edgeKey}`
        }
        let startLine = document.querySelectorAll(selector);
        if(startLine.length > 0) {
            for(let i =0; i<startLine.length; i++) {
                let line = startLine[i] as HTMLElement;
                if(startLine[i] instanceof SVGElement) {
                    if(mode == 'enter') {
                        line.style.stroke = color;
                    } else {
                        line.style.stroke = line.dataset.originColor || color;
                    }
                 
                    if(className.indexOf('Outer') > -1) {
                        if(mode == 'enter') {
                            line.style.fill =  color;
                        } else {
                            line.style.fill = line.dataset.originColor || color;
                        }
                    }
                } else {
                    if(mode == 'enter') {
                        line.style.visibility = 'visible';
                    } else {
                        line.style.visibility = 'hidden';

                    }
                }
            }
        } 
    }
    onPathMouseEnter = (e:any) => {
        if(e.target.nodeName == 'path') {
            let pathKey = e.target.dataset.key;
            let selector = `${pathKey}_showpath`;
            let showPath = document.getElementsByClassName(selector);
            if(showPath.length > 0) {
                for(let i =0; i<showPath.length; i++) {
                    let obj = showPath[i] as HTMLElement;
                    let edgeKey = obj.dataset.edgeKey; 
                    obj.style.stroke = '#28d9ad';
                    if((obj.getAttribute('class') + '').indexOf('connectStartLabel') > -1) {
                        this.setPathLine('.connectStartLabel', '#28d9ad', 'enter',edgeKey); 
                    } else if((obj.getAttribute('class') + '').indexOf('connectEndLabel') > -1) {
                        this.setPathLine('.connectEndLabel', '#28d9ad','enter',edgeKey); 
                    }  else if((obj.getAttribute('class') + '').indexOf('arrowpath') > -1) { 
                        obj.style.fill = '#28d9ad';
                    }
                }
            }
            let labelDom = document.querySelector(`.label_${pathKey}`) as HTMLElement;
            if(labelDom) {
                labelDom.style.visibility = 'visible';
            } 
        }
    }
    onPathMouseOut = (e:any) => {
        if(e.target.nodeName == 'path') {
            let pathKey = e.target.dataset.key;
            let selector = `${pathKey}_showpath`;
            let pathDefaultColor = e.target.dataset.originColor;
            let showPath = document.getElementsByClassName(selector);
            if(showPath.length > 0) {
                for(let i =0; i<showPath.length; i++) {
                    let obj = showPath[i] as HTMLElement;
                    let edgeKey = obj.dataset.edgeKey; 
                    let color = obj.dataset.originColor || pathDefaultColor;
                    obj.style.stroke = color;
                    if((obj.getAttribute('class') + '').indexOf('connectStartLabel') > -1) {
                        this.setPathLine('.connectStartLabel', color, 'outer',edgeKey); 
                    } else if((obj.getAttribute('class') + '').indexOf('connectEndLabel') > -1) {
                        this.setPathLine('.connectEndLabel', color, 'outer',edgeKey); 
                    } else if((obj.getAttribute('class') + '').indexOf('arrowpath') > -1) { 
                        obj.style.fill = color;
                    }
                }
            }
            let labelDom = document.querySelector(`.label_${pathKey}`) as HTMLElement;
            if(labelDom) {
                labelDom.style.visibility = 'hidden';
            }
        }
    }
  
    
    render(){
        const { isReadOnlyModel,isFlowModel,chartSvgHeight,chartSvgWidth } = this.props;
        const { wfFreeDatas,componentNeedRender,popOperatorsPanelParams, operatePanelVisible,drawFlowMode } = this.props.freeChartStore;

        let freeSvgStyle = {
            // right:isFlowModel=='1' ? '400px' : 0
        }

        /** 渲染nodes 和 分支 连接线 */
        let supLines:any = [];
        const _wfFreeDatas = toJS(wfFreeDatas);
        
        if(_wfFreeDatas){
            for(let key in _wfFreeDatas){
                let arr = _wfFreeDatas[key];
                arr.map((v:any,i:number)=>{
                    /**绘制连接线 */
                    if(v){
                        /** 绘制自由节点 于 固定流程节点的辅助线 */
                        if(isFlowModel!='1'){
                            supLines = supLines.concat(this.renderSupStartAndEndLine(v,`${key}_${i}`));
                        }
                    }   
                });
            }
        }
        console.log('最新的数据', componentNeedRender)
        /***********/
        return (
            <>
                <div className='wf-design-free-svg-container' onClick={this.onContainerClick}
                     onMouseOver={this.onPathMouseEnter}
                     onMouseOut={this.onPathMouseOut}
                >
                    <div className='wf-design-free-svg' style = {freeSvgStyle}>
                        <FreeSignChartDrawLine weId={`${this.props.weId || ''}_qxaw3n`} 
                            isFlowModel={isFlowModel}
                            chartSvgHeight={chartSvgHeight}
                            chartSvgWidth={chartSvgWidth}
                        />
                        <FreeSignChartDrawNode weId={`${this.props.weId || ''}_mhkxxj`}  
                            isReadOnlyModel={isReadOnlyModel}
                            isFlowModel={isFlowModel}
                        />
                        <FreeSignChartDrawGroup weId={`${this.props.weId || ''}_29bcuw`}
                            isReadOnlyModel={isReadOnlyModel}
                            isFlowModel={isFlowModel}
                        />
                        {supLines}
                        {/* 加签时，渲染一个可点击区域覆盖在之前的节点之上 */}
                    </div>
                </div>
               
                
            </>
        )
       
    }


}
export default WorkflowFree;