import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { getLabel } from '@weapp/utils';import { getFreeObjById , isExistThisElement , getCurrentElementPoint,drawArcLine  } from './utils';

@inject('freeChartStore')
@observer
class FreeChartDrawLine extends React.Component<any> {

    //获取10位随机数
    getRandom(){
        return Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,10-1));
    }

     //获取线条的颜色
     getStrockColor = (nodeid:string|number, inLineStatus:number|string, noPassedLinkColor?:any, destNodeId?:any) => {
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
    drawSvgPath(data:any={},startPos:any,inital = false,preNode={},element={},ptIndex='', mapKey=''){
        //元素没有next 有父级 链接到父级
        //元素没有next 没有父级 链接到外部流程图
        const {  isSingle = false , isFlowModel = '0' , isFree} = this.props;
        const { wfFreeDatasPoints, circulationParams , allValidNodesPostions,drawFlowMode} = this.props.freeChartStore;
        const { freeStartNodeid = '',freeEndNodeid=''} = data;
        let startPosition = allValidNodesPostions[freeStartNodeid] || {};

        startPos = startPos || startPosition;

        const { nodeEntity = {},nodeElement} = data;
        const { nodeStatus = '0' , nodetype='' , nodename=''} = nodeEntity;

        const {nodeChartEntity = {}} = data;
        const {inLineStatus = 0,outLineStatus = 0} = nodeChartEntity;

        let pathArr = [],labelSpanArr = [];
        let onlyKey=`${this.getRandom()}_${new Date().getTime()}`;
        if(inital){//绘制链接主流程图的连接线
            let secondPt:any = {};
            if(nodeElement){
                secondPt = getCurrentElementPoint(data,wfFreeDatasPoints,ptIndex) || {};
            }else{
                secondPt = getCurrentElementPoint(data,wfFreeDatasPoints,ptIndex)[0] || {};
            }

            let strokeColor = this.getStrockColor(nodeEntity.id, inLineStatus);
            let pathProps = {
                fill:'none',
                stroke: strokeColor,
                strokeWidth:'1.5',
                strokeMiterlimit:10
            }
            let _startPos = {
                x: (isFree!='1' && freeStartNodeid == freeEndNodeid) ? startPosition.x - 5  : startPosition.x ,
                y : 0
            };
            if(drawFlowMode == 'horizontal') { //横向绘图，起始节点
                _startPos = {
                    y: (isFree!='1' && freeStartNodeid == freeEndNodeid) ? startPosition.y - 5  : startPosition.y ,
                    x :0
                };
            }
            let supHoverParams = {
                strokeWidth:10,
                stroke : 'transparent',
                fill : 'none'
            }
            if(drawFlowMode == 'vertical') {  //纵向起始线段
                let pathParams = '', pathParams2 = '',adjustValue = 20, arcAngle=40;
                if(Math.abs(secondPt.x - _startPos.x) < 20) {
                    adjustValue = Math.floor(Math.abs(secondPt.x - _startPos.x) / 2);
                    arcAngle = adjustValue;
                } 
                if(secondPt.x <= _startPos.x) {
                    if(Math.floor(_startPos.x - adjustValue - secondPt.x) < 10) {
                        adjustValue = 10;
                    }
                    pathParams = drawArcLine(_startPos,{x:_startPos.x,y:20},{x:_startPos.x - adjustValue, y:20},40,adjustValue);
                    pathParams2 = drawArcLine({x:_startPos.x - adjustValue, y:20},{x:secondPt.x,y:20}, secondPt,40,adjustValue);
                } else {
                    if(Math.floor(_startPos.x + adjustValue - secondPt.x) < 10) {
                        adjustValue = 10;
                    }
                    pathParams = drawArcLine(_startPos,{x:_startPos.x,y:20},{x:_startPos.x + adjustValue, y:20},40,adjustValue);
                    pathParams2 = drawArcLine({x:_startPos.x + adjustValue, y:20},{x:secondPt.x,y:20}, secondPt,40,adjustValue);
                }
                let datakey = `${Math.round(Math.random()*80+20)}${new Date().getTime()}`;
                pathArr.push(
                    <path className={`${onlyKey}_showpath connectStartLabel edge_${ptIndex}`} data-edgeKey={ptIndex}  key={onlyKey} d={pathParams} {...pathProps} 
                            stroke = {this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            data-originColor={this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            >
                            <title>{nodename}</title>
                    </path>
                );
                pathArr.push(
                    <path  className={`${onlyKey}_showpath connectStartLabel edge_${ptIndex}`} data-edgeKey={ptIndex} key={onlyKey} d={pathParams2} {...pathProps}
                            stroke = {this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            data-originColor={this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            >
                            <title>{nodename}</title>
                    </path>
                );
                  // /**悬浮提示辅助线条 */
                pathArr.push(
                    <path key={`${onlyKey}_shawdom`}  d={pathParams} {...supHoverParams} data-key={onlyKey}  data-originColor={this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}>
                        <title>{nodename}</title>
                    </path>
                );
                pathArr.push(
                    <path key={`${onlyKey}_shawdom_2`}  d={pathParams2}  {...supHoverParams} data-key={onlyKey}  data-originColor={this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}>
                        <title>{nodename}</title>
                    </path>
                );
                if(secondPt.x <= _startPos.x) {
                    labelSpanArr.push(<div className={`label label_${datakey} connectStartLabel edge_${ptIndex}`} data-edgeKey={ptIndex} key={`${onlyKey}_svgPathVerticallabel`} style={{left: secondPt.x + Math.floor(Math.abs(_startPos.x - secondPt.x)/2), top: _startPos.y + 16}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                } else {
                    labelSpanArr.push(<div className={`label label_${datakey} connectStartLabel edge_${ptIndex} `} data-edgeKey={ptIndex} key={`${onlyKey}_svgPathVerticallabel`} style={{left: _startPos.x + Math.floor(Math.abs(_startPos.x - secondPt.x)/2), top: _startPos.y + 16}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                }

            } else {   //横向起始线段
                let pathParams = '', pathParams2 = '',adjustValue = 20, arcAngle=40;
                if(Math.abs(secondPt.y - _startPos.y) < 20) { 
                    adjustValue = Math.floor(Math.abs(secondPt.y - _startPos.y) / 2);
                    arcAngle = adjustValue;
                }
                if(_startPos.y > secondPt.y) {
                    if(Math.abs(secondPt.y - (_startPos.y-adjustValue)) < 20) { 
                        adjustValue = Math.floor(Math.abs(secondPt.y - _startPos.y) / 2);
                        arcAngle = adjustValue;
                    }
                    pathParams = drawArcLine(_startPos,{x:_startPos.x + 30,y:_startPos.y},{x:_startPos.x + 30, y:_startPos.y - adjustValue},40,adjustValue);
                    pathParams2 = drawArcLine({x:_startPos.x + 30, y:_startPos.y - adjustValue},{x:_startPos.x + 30,y:secondPt.y}, secondPt,40, adjustValue);
                } else {
                    if(Math.abs(secondPt.y - (_startPos.y + adjustValue)) < 20) { 
                        adjustValue = Math.floor(Math.abs(secondPt.y - _startPos.y) / 2);
                        arcAngle = adjustValue;
                    }
                    pathParams = drawArcLine(_startPos,{x:_startPos.x + 30,y:_startPos.y},{x:_startPos.x + 30, y:_startPos.y + adjustValue},40,adjustValue);
                    pathParams2 = drawArcLine({x:_startPos.x + 30, y:_startPos.y + adjustValue},{x:_startPos.x + 30,y:secondPt.y}, secondPt,40,adjustValue);
                }
                pathArr.push(
                    <path   className={`${onlyKey}_showpath connectStartLabel edge_${ptIndex} `} data-edgeKey={ptIndex}  key={onlyKey}  d={pathParams} {...pathProps} 
                            stroke = {this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            data-originColor= {this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            >
                            <title>{nodename}</title>
                    </path>
                );
                pathArr.push(
                    <path   className={`${onlyKey}_showpath connectStartLabel edge_${ptIndex}`} data-edgeKey={ptIndex}  key={onlyKey} d={pathParams2} {...pathProps} 
                            stroke = {this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            data-originColor= {this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}
                            >
                            <title>{nodename}</title>
                    </path>
                );
                  // /**悬浮提示辅助线条 */
                 pathArr.push(
                    <path key={`${onlyKey}`}  d={pathParams} {...supHoverParams} data-key={onlyKey}  data-originColor={this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}>
                        <title>{nodename}</title>
                    </path>
                );
                  pathArr.push(
                    <path key={`${onlyKey}_shawdom`}  d={pathParams2} {...supHoverParams} data-key={onlyKey}  data-originColor={this.getStrockColor(nodeEntity.id, inLineStatus, circulationParams.noPassedLinkColor)}>
                        <title>{nodename}</title>
                    </path>
                );
                labelSpanArr.push(<div className={`label label_${onlyKey} connectStartLabel edge_${ptIndex}`} data-edgeKey={ptIndex} key={`${onlyKey}_svgPathHorizontallabel`} style={{left: Math.floor(Math.abs(_startPos.x - secondPt.x)/2), top: secondPt.y - 4}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
            }
            if(nodeElement && isFlowModel !='1'){
                if(drawFlowMode == 'horizontal') {
                    pathArr.push(this.renderSvgArrow(secondPt,'fill',inLineStatus == 1,false,nodetype, nodeEntity.id,onlyKey));
                } else {
                    pathArr.push(this.renderSvgArrow(secondPt,'fill',inLineStatus == 1,true,nodetype, nodeEntity.id,onlyKey));
                }
            }
            let _path = this.drawSvgPath(data , secondPt , false , preNode , element,ptIndex);
            _path.pathArr.map(v=>{
                pathArr.push(v);
            })
            _path.labelSpanArr.map(v=>{
                labelSpanArr.push(v);
            })

        }else{
            if(data.nodeElement){//判断如果这个节点流转过的话，线条颜色变化
                let elementPts = getCurrentElementPoint(data,wfFreeDatasPoints,ptIndex);
                let _path:any = []; 
                
                let currentElementPts = {
                    x : elementPts.x,
                    y : elementPts.y
                }

                _path = this.drawSvgLine([startPos,currentElementPts],data,inLineStatus);
                _path.pathArr.map((v:any)=>{
                    pathArr.push(v); 
                });
                _path.labelSpanArr.map((v:any)=>{
                    labelSpanArr.push(v); 
                });
                if(data.hasNext){
                    _path = this.drawSvgPath(data.next , currentElementPts , false , data , element,ptIndex);//x 坐标是否需要加上节点宽度一半
                    _path.pathArr.map((v:any)=>{
                        pathArr.push(v); 
                    })
                    _path.labelSpanArr.map((v:any)=>{
                        labelSpanArr.push(v); 
                    })
                }else{
                    let parent = getFreeObjById(data.parentid,element);
                    if(!data.parentid || !parent){
                        let obj = this.drawLastSvgLine(0,outLineStatus == 1,currentElementPts,nodetype,element,ptIndex,outLineStatus);
                        obj.pathArr.map((v:any)=>{
                            pathArr.push(v); 
                        })
                        obj.labelSpanArr.map((v:any)=>{
                            labelSpanArr.push(v); 
                        })
                    }
                    if(data.parentid != '' && data.parentid != null && parent != null){
                        //获取到第一个拥有next的父级 判断是否流转过
                        let parentPts = getCurrentElementPoint(parent,wfFreeDatasPoints,ptIndex); // is array
                        _path = this.drawSvgLine([currentElementPts,parentPts[1]],data,outLineStatus);//没有下一节点，存在分支当中
                        _path.pathArr.map((v:any)=>{
                            pathArr.push(v); 
                        })
                        _path.labelSpanArr.map((v:any)=>{
                            labelSpanArr.push(v); 
                        })
                    }
                }
            }else{
                let elementPts = getCurrentElementPoint(data,wfFreeDatasPoints,ptIndex);
                let _path:any = [];
                //判断数组中元素是否存在流转过的节点
                _path = this.drawSvgLine([startPos,elementPts[0]],data,inLineStatus);
                _path.pathArr.map((v:any)=>{
                    pathArr.push(v); 
                });
                _path.labelSpanArr.map((v:any)=>{
                    labelSpanArr.push(v); 
                });
                let paraArr = data.parallelNodeGroupDatas;
                paraArr.map((v:any)=>{
                    _path =this.drawSvgPath(v , elementPts[0],false,data,element,ptIndex);
                    _path.pathArr.map((v:any)=>{
                        pathArr.push(v); 
                    });
                    _path.labelSpanArr.map((v:any)=>{
                        labelSpanArr.push(v); 
                    });
                })
                if(data.hasNext){
                    _path =this.drawSvgPath(data.next , elementPts[1],false,data,element,ptIndex);
                    _path.pathArr.map((v:any)=>{
                        pathArr.push(v); 
                    });
                    _path.labelSpanArr.map((v:any)=>{
                        labelSpanArr.push(v); 
                    });
                }else{
                    let parent = getFreeObjById(data.parentid,element);
                    if(!data.parentid || !parent){
                        const groupStatus = data.groupStatus || '0';
                        let arr = this.drawLastSvgLine(0,outLineStatus == 1,elementPts[1],nodetype,element,ptIndex);
                        arr.pathArr.map((v:any)=>{
                            pathArr.push(v); 
                        })
                        arr.labelSpanArr.map((v:any)=>{
                            labelSpanArr.push(v); 
                        })
                    }
                    //获取到第一个拥有next的父级 判断是否流转过
                    if(data.parentid != null && parent != null){
                        let parentPts = getCurrentElementPoint(parent,wfFreeDatasPoints,ptIndex); // is array

                        _path = this.drawSvgLine([elementPts[1],parentPts[1]],parent,outLineStatus);
                        _path.pathArr.map((v:any)=>{
                            pathArr.push(v); 
                        })
                        _path.labelSpanArr.map((v:any)=>{
                            labelSpanArr.push(v); 
                        })
                    }
                }
            }
        }
        return {pathArr,labelSpanArr};
    }

    //实际上绘制线条
    drawSvgLine(points:any=[],currNodes:any={},lineStatus:any){//[{x1,y1},{x2,y2}] //inBranchAndNoNext : 为true时 取当前节点的流转状态
        const {  isFlowModel = '0'} = this.props;
        const { svgPathLine , wfFreeDatas , circulationParams, forecastNodeIds, drawFlowMode="horizontal"} = this.props.freeChartStore;
        const { nodeEntity = {} , groupStatus='0', nodeChartEntity = {}, id} = currNodes;
        const {  nodeType = '' ,nodename=''} = nodeEntity;
        let onlyKey=`${this.getRandom()}_${new Date().getTime()}`;
        // inBranchAndNoNext ? nodeIsPassed = (groupStatus=='2'?true:false) : '';
        // if(preNode && preNode.groupStatus == 3){ //特殊状态 groupStatus == 3;
        //     nodeIsPassed = false;
        // }

        //console.log(nodename,"----currNodes",toJS(currNodes),"preNode",preNode.id,toJS(preNode));
        let nodeIsPassed = lineStatus == 1;

        let strokeColor = this.getStrockColor(nodeEntity.id, lineStatus);
        /**
        //inBranchAndNoNext : 为true时 取当前节点的流转状态
        (//groupStatus : 0 : 未处理 , 1：当前节点 , 2 ： 已处理 
        ----此处需要当此节点已处理后才改变后续连接线颜色)
        */
        points = toJS(points);

        let svgPath:any = [],labelSpanArr:any = [];
        let pathProps = {
            fill:'none',
            stroke:strokeColor,
            strokeWidth:'1.5',
            strokeMiterlimit:10,
            upLevel : nodeIsPassed
        }
        let supHoverParams = {
            strokeWidth:10,
            stroke : 'transparent',
            fill : 'none'
        }
        if(points.length == 2){
            let point_1 =  JSON.parse(JSON.stringify(points[0])) || {};
            let point_2 =  JSON.parse(JSON.stringify(points[1])) || {};
            if(point_1.x == point_2.x && point_1.y == point_2.y){
                return {pathArr:svgPath,labelSpanArr};
            }
            let pathParams = '';
            if(point_1.x == point_2.x || point_1.y == point_2.y){//在同一竖直线或者横线上
                pathParams = `M${point_1.x-0.5} ${point_1.y-0.5} L${point_2.x-0.5} ${point_2.y-0.5}`;
            }  else{
                let point_sups = [];
                if(point_1.virtual || point_2.virtual){
                    if(point_1.virtual && point_2.virtual){
                        if(drawFlowMode == 'horizontal') {//现在图行绘制走向是横向的
                            if(point_1.isBranch){
                                point_sups.push({x:point_1.x , y:point_2.y});
                            }else{
                                point_sups.push({x:point_2.x , y:point_1.y});
                            }
                        } else {
                            if(point_1.isBranch){
                                point_sups.push({x:point_2.x , y:point_1.y});
                            }else{
                                point_sups.push({x:point_1.x , y:point_2.y});
                            }
                        }
                    }else{
                        if(drawFlowMode == 'horizontal') {//现在图行绘制走向是横向的 
                            if(point_1.virtual){
                                point_sups.push({x:point_1.x , y:point_2.y});
                            }else{
                                point_sups.push({x:point_2.x , y:point_1.y});
                            }
                        } else {
                            if(point_1.virtual){
                                point_sups.push({x:point_2.x , y:point_1.y});
                            }else{
                                point_sups.push({x:point_1.x , y:point_2.y});
                            }
                        }

                    }
                    if(point_1.x != point_2.x && point_1.y != point_2.y) {
                        pathParams =  drawArcLine(point_1, point_sups[0],point_2);
                    } else {
                        let supPtsParams = '';
                        point_sups.map(pt=>{
                            supPtsParams += `L${pt.x-0.5} ${pt.y-0.5} `;
                        });
                        pathParams = `M${point_1.x-0.5} ${point_1.y-0.5} ${supPtsParams} L${point_2.x-0.5} ${point_2.y-0.5}`;
                    }
                    
                }
            }
            svgPath.push(
                <path className={`${onlyKey}_showpath ${point_1.isBranch ? 'branch_start' : ''} ${point_2.isMerge ? 'branch_end' : ''}`} key={`${onlyKey}`} d={pathParams} {...pathProps} data-originColor={pathProps.stroke}>
                    <title>{nodename}</title>
                </path>
            );
            // /**悬浮提示辅助线条 */
            svgPath.push(
                <path key={onlyKey}  d={pathParams} {...supHoverParams} data-key={onlyKey}  data-originColor={pathProps.stroke}>
                    <title>{nodename}</title>
                </path>
            );
            if(drawFlowMode == 'horizontal') {
                if(point_2.virtual) {
                    labelSpanArr.push(<div className={`label label_${onlyKey}`} key={`${onlyKey}_branchMergelabel`} style={{left:point_2.x - 40, top: point_1.y - 4}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                } else  {
                    labelSpanArr.push(<div className={`label label_${onlyKey}`}key={`${onlyKey}_branchNormallabel`} style={{left:point_2.x - 60, top: point_2.y - 4}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                }
            } else {
                if(point_2.virtual) {
                    if(point_2.isMerge) {
                        labelSpanArr.push(<div className={`label label_${onlyKey}`} key={`${onlyKey}_branchMergelabel`} style={{left:point_1.x - 16, top: point_1.y + 50}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                    } else {
                        labelSpanArr.push(<div className={`label label_${onlyKey}`} key={`${onlyKey}_branchMergelabel`} style={{left:point_2.x - 16, top: point_1.y + 50}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                    }
                }else {
                    labelSpanArr.push(<div className={`label label_${onlyKey}`} key={`${onlyKey}_branchMergelabel`} style={{left:point_2.x - 16, top: point_1.y + 15}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
                }
            } 
            if(currNodes.nodeElement && !point_2.virtual && !(isFlowModel == '1' &&  nodeType == '3')){
                if(drawFlowMode == 'horizontal') {
                    svgPath.push(this.renderSvgArrow(point_2,'fill',nodeIsPassed,false,nodeType, nodeEntity.id,onlyKey));
                } else {
                    svgPath.push(this.renderSvgArrow(point_2,'fill',nodeIsPassed,true,nodeType, nodeEntity.id,onlyKey));
                }
            }
        }
        return {pathArr:svgPath,labelSpanArr};
    }
    //绘制箭头
    renderSvgArrow(point:any={} , arrowType = 'notfill' , nodeIsPassed:boolean, vertical = false,nodetype:any, nodeid:string|number,pathKey?:string|number){
        const { circulationParams} = this.props.freeChartStore;
        let strokeColor = this.getStrockColor(nodeid, nodeIsPassed ? 1 : 0, circulationParams.noPassedLinkColor);
        let onlyKey=`${this.getRandom()}_${new Date().getTime()}`;
        let arrowWidth = 7;
        let arrowHight = 8;
        let arrowGap = 50;
        let arrowParams = '';
        let pathParams:any = {
            // stroke:nodeIsPassed ? circulationParams.passedLinkColor : circulationParams.noPassedLinkColor,
            stroke:strokeColor,
            fill : strokeColor,
            strokeWidth:'1.5',
        };
        let OffsetTrans_x = 0 , OffsetTrans_y = 0;
        if(nodetype == '0' || nodetype == '3'){//创建 || 归档
            // pathParams['transform'] = `translate(-0.5px, 0.5px)`;
            OffsetTrans_x = -0.5;
            OffsetTrans_y = 0.5;
        }else if(nodetype == '2' || nodetype == '4'){//提交 || 审阅
            // pathParams['transform'] = `translate(-0.5px, 13.5px)`;
            OffsetTrans_x = -0.5;
            OffsetTrans_y = 13.5;
        }else{//审批
            // pathParams['transform'] = `translate(-0.5px,-1.5px)`;
            OffsetTrans_x = -0.5;
            OffsetTrans_y = -1.5;
        }
        if(arrowType != 'fill'){//配置箭头样式， fill 或者 stroke
            pathParams.fill = 'none';
        }
        let X = point.x || '';
        let Y = point.y || '';
        var timStamp =new Date().getTime();
        if(vertical){
            arrowParams = `M${point.x - arrowHight/2 + OffsetTrans_x} ${point.y - arrowGap - arrowWidth+OffsetTrans_y} L${point.x+OffsetTrans_x} ${point.y 
            - arrowGap+OffsetTrans_y} L${point.x + arrowHight/2+OffsetTrans_x} ${point.y - arrowGap - arrowWidth+OffsetTrans_y}`;
        }else{
            arrowParams = `M${X - arrowWidth} ${(Y) - arrowHight/2} L${X} ${Y } L${X - arrowWidth} ${(Y) + arrowHight/2}`;
        }
        return (
            <path 
                className={`${pathKey}_showpath arrowpath`}
                key={onlyKey} 
                d={arrowParams}
                {...pathParams} 
                style={{"transform":pathParams['transform'],"-ms-transform":pathParams['transform']}}
                data-originColor={pathParams.stroke}
            >
            </path>
        )
    }

    drawLastSvgLine(centerY = 400,currentNodeIsPassed:boolean,lastPoints:any={},nodetype:string,element?:any,ptIndex?:any,outLineStatus?:any){
        const {  isFlowModel ,isFree} = this.props;// endPosition = {x:30,y:0} ,
        const { wfFreeDatasPoints , wfFreeDatas , circulationParams , currentPostParams,
            allValidNodesPostions,allValidNodesNodeLinks,currentSignSetNode,validWorkFlowDatas,everyFreeNodeOffsetY,circulationOrginNode,forecastNodeIds,drawFlowMode
        } = this.props.freeChartStore;
        const { nodeName = '' , nodeType = '0' , flowType='1'} = currentSignSetNode;
        const {  allValidNodes = [], currentStartNode , currentEndNodes} = validWorkFlowDatas;

        /** 多个终点处理  获取所有后续出口节点*/
        const {freeStartNodeid,freeEndNodeid} = element;
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
                ispass : currentNodeIsPassed ? '1' : '0',
            })
        } else {
            freeNodeEndArr =  allValidNodesNodeLinks[freeStartNodeid] || [];
            if(freeNodeEndArr.length > 0) {
                freeNodeEndArr = freeNodeEndArr.filter((item:any) => freeEndNodeid.indexOf(item.destNodeId) > -1);
            }
        }

        /********** */
        if(isFlowModel == '1'){
            return {pathArr:[],labelSpanArr:[]};
        }
        let maxX = 0 , maxY = 0;
        let lastArr:any = [], labelSpanArr:any = [];
        let newPtsObj =  JSON.parse(JSON.stringify(wfFreeDatasPoints[ptIndex]));
        let curFreeNodeOffsetY = everyFreeNodeOffsetY[freeStartNodeid] || 0;
        for(let key in newPtsObj){
            let idsArr = key.split('_') , newidArr:any=[] , _ids = '';
            idsArr.map((v,i)=>{
                if(i != idsArr.length -1){
                    newidArr.push(v);
                }
            });
            _ids = newidArr.join('_');
            if(isExistThisElement(_ids,element)){//删除后  不存在的元素 或分支 的点依然存在在数据当中 需要过滤
                maxX = maxX > newPtsObj[key].x ? maxX : newPtsObj[key].x;
                maxY = maxY > newPtsObj[key].y ? maxY : newPtsObj[key].y;
            }
        }
        let onlyKey=`${this.getRandom()}_${new Date().getTime()}_lastSvgLine`;
        // let branchEndLinks = sortB y(toJS(freeNodeEndArr), ['ispass']);
        let branchEndLinks = toJS(freeNodeEndArr);
        JSON.parse(JSON.stringify(branchEndLinks)).map((v:any,i:number)=>{
            const linktitle = v.linkinfo;
            let endPosition =  JSON.parse(JSON.stringify((allValidNodesPostions[v.destNodeId])));
            let ispassed = currentNodeIsPassed && v['ispass'] == '1';

            let pathProps = {
                fill:'none',
                // stroke:ispassed ? circulationParams.passedLinkColor : circulationParams.noPassedLinkColor,
                stroke:this.getStrockColor(freeEndNodeid, ispassed ? 1 : 0, circulationParams.noPassedLinkColor, v.destNodeId),
                strokeWidth:'1.5',
                strokeMiterlimit:10,
            }
            let supHoverParams = {
                strokeWidth:10,
                stroke : 'transparent',
                fill : 'none'
            }
            let points:any = [], pathParams = '', pathParams2 = '',adjustValue = 40;
            if(drawFlowMode == 'vertical') {
                if(isFree != '1' && freeStartNodeid == v.destNodeId){
                    endPosition = {...endPosition,x:endPosition.x+6}
                }
                if(maxX + 123 < lastPoints.x) {
                    points = [
                        {x:lastPoints.x,y:lastPoints.y},
                        {x:lastPoints.x,y:lastPoints.y + 60},
                        {x:Math.floor((lastPoints.x + lastPoints.x + 123)/2),y:lastPoints.y + 60},
                        {x:lastPoints.x ,y:lastPoints.y + 60},
                        {x:lastPoints.x,y:curFreeNodeOffsetY + 40},
                    ];
                } else {
                    points = [
                        {x:lastPoints.x,y:lastPoints.y},
                        {x:lastPoints.x,y:lastPoints.y + 60},
                        {x:Math.floor((lastPoints.x + maxX + 123)/2),y:lastPoints.y + 60},
                        {x:maxX + 123 ,y:lastPoints.y + 60},
                        {x:maxX + 123 ,y:curFreeNodeOffsetY + 40},
                    ];
                }
            } else {
                if(isFree != '1' && freeStartNodeid == v.destNodeId){
                    endPosition = {...endPosition,y:endPosition.y+6}
                }
                points = [
                    {x:lastPoints.x,y:lastPoints.y},
                    {x:lastPoints.x + 200,y:lastPoints.y},
                    {x:lastPoints.x + 200,y: Math.floor((lastPoints.y + maxY + 60)/2)},
                    {x:lastPoints.x + 200,y:maxY + 60},
                ];
                if(endPosition.y > maxY + 60) { 
                    points.push({x:curFreeNodeOffsetY + 70, y:maxY + 60});
                } else {
                    points.push({x:curFreeNodeOffsetY + 50, y:maxY + 60});
                }
            }
           
            points.map((c:any,k:number)=>{
                if(k >= 2 && points[k].x != points[k-2].x && points[k].y != points[k-2].y) {
                    pathParams +=  drawArcLine(points[k-2], points[k-1],points[k]);
                } 
            });
            lastArr.push(
                <path className={`${onlyKey}_showpath connectEndLabel edge_${v.destNodeId}_${ptIndex}`}  data-edgeKey={`${v.destNodeId}_${ptIndex}`} key={onlyKey} d={pathParams} {...pathProps} data-originColor={pathProps.stroke}>
                    <title>{linktitle}</title>
                </path>
            );
            lastArr.push(
               <path key={`${onlyKey}_shawdom_0`}  d={pathParams} {...supHoverParams} data-key={onlyKey}  data-originColor={pathProps.stroke}>
                   <title>{linktitle}</title>
               </path>
           );
           if(drawFlowMode == 'horizontal') {
               labelSpanArr.push(<div className={`label label_${onlyKey} connectEndLabel edge_${v.destNodeId}_${ptIndex}`} data-edgeKey={`${v.destNodeId}_${ptIndex}`} key={`${onlyKey}_lastPathlabel`} style={{left: Math.floor((lastPoints.x + 160 )/2), top: maxY + 60 - 4}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
            } else {
               labelSpanArr.push(<div className={`label label_${onlyKey} connectEndLabel edge_${v.destNodeId}_${ptIndex}`} data-edgeKey={`${v.destNodeId}_${ptIndex}`}  key={`${onlyKey}_lastPathlabel`} style={{left:maxX + 123 - 12, top: Math.floor(( maxY + 60  )/2)}}><span className="label_text">{getLabel('110' ,'出口')}</span></div>)
           }

            /**绘制最后一条线上方的 横向的线条  */
        
            if(drawFlowMode == 'vertical') {
                if(endPosition.x >  maxX + 123) {
                    if(Math.abs(endPosition.x - maxX - 123) < adjustValue) {
                        adjustValue = Math.abs(endPosition.x - maxX - 123);
                    }
                    pathParams = drawArcLine({x:maxX + 123 ,y:curFreeNodeOffsetY + adjustValue},  {x:maxX + 123 ,y:curFreeNodeOffsetY + 20+ 0.5}, {x:endPosition.x - 20 , y: curFreeNodeOffsetY+20+0.5},40,adjustValue);
                    pathParams2 = drawArcLine({x:endPosition.x - 20, y: curFreeNodeOffsetY+20+0.5}, {x:endPosition.x, y: curFreeNodeOffsetY+20+0.5} ,{x:endPosition.x, y: curFreeNodeOffsetY+0.5},40,adjustValue);
                } else {
                    pathParams = drawArcLine({x:maxX + 123 ,y:curFreeNodeOffsetY + adjustValue},  {x:maxX + 123 ,y:curFreeNodeOffsetY + 20+ 0.5}, {x:endPosition.x + 20, y: curFreeNodeOffsetY+20+0.5});
                    pathParams2 = drawArcLine({x:endPosition.x + 20, y: curFreeNodeOffsetY+20+0.5}, {x:endPosition.x, y: curFreeNodeOffsetY+20+0.5} ,{x:endPosition.x, y: curFreeNodeOffsetY+0.5});
                }
            } else {
                if(endPosition.y > maxY + 60) {
                    if(Math.abs(endPosition.y - maxY - 60) < adjustValue) {
                        adjustValue = Math.floor(Math.abs(endPosition.y - maxY - 60) / 2);
                    }
                    pathParams = drawArcLine({x: curFreeNodeOffsetY + 0.5 + 70, y: maxY + 60}, {x: curFreeNodeOffsetY + 40 + 0.5, y: maxY + 60}, {x: curFreeNodeOffsetY + 40 + 0.5, y:maxY + 60 + adjustValue}, 40, adjustValue);
                    pathParams2 = drawArcLine({x: curFreeNodeOffsetY + 40 + 0.5, y: maxY + 60 + adjustValue}, {x: curFreeNodeOffsetY + 40 + 0.5, y: endPosition.y}, {x: curFreeNodeOffsetY + 0.5, y:endPosition.y},40, adjustValue);
                } else {
                    if(Math.abs(endPosition.y - maxY - 60) < adjustValue) {
                        adjustValue = Math.floor(Math.abs(endPosition.y - maxY - 60) / 2);
                    }
                    pathParams = drawArcLine({x: curFreeNodeOffsetY + 0.5 + 50, y: maxY + 60}, {x: curFreeNodeOffsetY + 20 + 0.5, y: maxY + 60}, {x: curFreeNodeOffsetY + 20 + 0.5, y:maxY + 60 - adjustValue}, 40 ,adjustValue);
                    pathParams2 = drawArcLine({x: curFreeNodeOffsetY + 20 + 0.5, y: maxY + 60 - adjustValue}, {x: curFreeNodeOffsetY + 20 + 0.5, y: endPosition.y}, {x: curFreeNodeOffsetY + 0.5, y:endPosition.y }, 40, adjustValue);
                }
            }
            lastArr.push(
                <path className={`${onlyKey}_showpath connectEndLabel edge_${v.destNodeId}_${ptIndex}`} data-edgeKey={`${v.destNodeId}_${ptIndex}`} key={onlyKey} d={pathParams} {...pathProps} 
                        stroke = {this.getStrockColor(freeEndNodeid, ispassed ? 1:0, circulationParams.noPassedLinkColor, v.destNodeId)}
                        data-originColor={this.getStrockColor(freeEndNodeid, ispassed ? 1:0, circulationParams.noPassedLinkColor, v.destNodeId)}
                    >
                    <title>{linktitle}</title>
                </path>
            );
            lastArr.push(
                <path className={`${onlyKey}_showpath connectEndLabel edge_${v.destNodeId}_${ptIndex}`} data-edgeKey={`${v.destNodeId}_${ptIndex}`}  key={onlyKey} d={pathParams2} {...pathProps} 
                        stroke = {this.getStrockColor(freeEndNodeid, ispassed ? 1:0, circulationParams.noPassedLinkColor, v.destNodeId)}
                        data-originColor={this.getStrockColor(freeEndNodeid, ispassed ? 1:0, circulationParams.noPassedLinkColor, v.destNodeId)}
                    >
                    <title>{linktitle}</title>
                </path>
            );
               // /**悬浮提示辅助线条 */
            lastArr.push(
                <path key={`${onlyKey}_shawdom_1`}  d={pathParams} {...supHoverParams} data-key={onlyKey}  data-originColor={this.getStrockColor(freeEndNodeid, ispassed ? 1:0, circulationParams.noPassedLinkColor, v.destNodeId)}>
                    <title>{linktitle}</title>
                </path>
            );
            lastArr.push(
                <path key={`${onlyKey}_shawdom_2`}  d={pathParams2} {...supHoverParams} data-key={onlyKey}  data-originColor={this.getStrockColor(freeEndNodeid, ispassed ? 1:0, circulationParams.noPassedLinkColor, v.destNodeId)}>
                    <title>{linktitle}</title>
                </path>
            );
        });
        return {pathArr:lastArr,labelSpanArr};
    }

    render() {
        const { wfFreeDatas, allValidNodesPostions,wfFreeDatasPoints,drawFlowMode } = this.props.freeChartStore;
        const { isFlowModel,chartSvgHeight } = this.props;
        const _wfFreeDatas = toJS(wfFreeDatas);
        let svgLinesArr:any = [],labelSpanArr:any = [];
        let maxX = 0 , maxY = 0;
        for( let key in wfFreeDatasPoints){
            let curObj = wfFreeDatasPoints[key];
            for(let subKey in curObj){
                let obj = curObj[subKey];
                maxX = maxX > obj.x ? maxX : obj.x;
                maxY = maxY > obj.y ? maxY : obj.y;
            }
            
        }
        let svgStyle:any = {};
        if(drawFlowMode == 'vertical') {
            svgStyle = {
                width:maxX + 160 + 'px',
                minWidth:'100%',
                height : maxY + 80 + 'px',
                overflow : 'auto'
            }
        } else {
            svgStyle = {
                width:maxX + 500 + 'px',
                minWidth:'100%',
                overflow : 'auto',
                minHeight: '100%',
                height: Math.max(chartSvgHeight, maxY + 80) + 'px',
                zIndex:22
            }
        }
        for(let key in _wfFreeDatas){
            let arr = _wfFreeDatas[key];
            arr.map((v:any,i:number)=>{
                /**绘制连接线 */
                if(v){
                    let nodePos = allValidNodesPostions[v.freeStartNodeid || key];
                    let lineStartPos =  isFlowModel == '1' ? {x:0,y:0} : {x:nodePos.x,y:0};
                    let newLine:any = [];
                    newLine = this.drawSvgPath(v,lineStartPos,true,{},v,`${key}_${i}`, key) || [];
                    svgLinesArr = [...svgLinesArr, ...newLine.pathArr];
                    labelSpanArr = newLine.labelSpanArr;
                }   
            });
        }
        return (
            <>
                <svg key={new Date().getTime()} width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    style={svgStyle} 
                >
                    {svgLinesArr}
                </svg>
                {
                    isFlowModel != '1' && labelSpanArr
                }
            </>
        )
    }
}

export default FreeChartDrawLine