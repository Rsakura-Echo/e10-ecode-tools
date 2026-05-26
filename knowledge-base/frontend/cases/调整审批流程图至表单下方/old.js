

import React from 'react';

import { Spin } from '@weapp/ui';
import {  getLabel, corsImport, appInfo } from '@weapp/utils';
import ReactDOM from 'react-dom';
import {inject, observer, Provider} from 'mobx-react';

const loadChartFiles = (params: object, wrapContainer: HTMLElement, chartNum?:string|number, callback?:Function) => {
  window.mxResources.loadDefaultBundle = false;
  const { publicUrl, publicDomain }  = appInfo('@weapp/workflowcharts') as any;
  window.WFChart_CKEDITOR_BASEPATH = (publicDomain || '') + (publicUrl || '') +  '/build/workflowcharts/ckeditor/'; //设置ckeditor文本编辑相关的资源的路径
  window.setChartParams(params);
  var bundle = window.mxResources.getDefaultBundle((publicDomain || '') + (publicUrl || '') + '/build/workflowcharts/grapheditor', window.mxLanguage) ||
      window.mxResources.getSpecialBundle((publicDomain || '') + (publicUrl || '') + '/build/workflowcharts/grapheditor', window.mxLanguage);
      window.mxUtils.getAll([bundle, (publicDomain || '') + (publicUrl || '') + '/build/workflowcharts/default.xml'], function (xhr: any) {
        let themes: any = {};
        window.mxResources.parse(xhr[0].getText());
        themes[window.Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();
        let timer = setTimeout(() => {
            clearTimeout(timer);
            new window.EditorUi(new window.Editor(window.urlParams['chrome'] == '0', themes), wrapContainer, null,chartNum);
            typeof callback == 'function' && callback();
        }, 100);
  });
}

class CustWfChart extends React.Component {

  prefixCls = "ecode-cust-wf-chart"
  constructor(props) {
    super(props);

    this.state = {
      showOperatorPanel: false,
      operatePanelPos: {leftX: 0, leftY: 0},
      loadingFlag: false, //流程图加载的标志
      renderNum: this.random(1,100),
    }
  }

  //生成随机数
  random = (min:number,max:number) => {
    return Math.floor(min+Math.random()*(max-min));
  }

  openChartDesign = () => {
    window.wfGetLabel = getLabel;
    const { renderNum } = this.state;
    let commonParams = weappWorkflow.getCurrentFlowPageSDK().baseStore.commonParam;
    let renderDom:any = null, passClassName = '';
    corsImport('@weapp/workflowcharts').then(() => {
      if(passClassName != '' && passClassName) {
          renderDom = document.getElementById(passClassName) || document.getElementById('chart-area' + renderNum);
      } else {
          renderDom = document.getElementById('chart-area' + renderNum);
      }
      loadChartFiles(commonParams, renderDom, renderNum);
    })
  }

  componentDidMount() {
    const { renderNum } = this.state;
    this.openChartDesign();
    window.setLoadingFlag = this.setLoadingFlag;

    window['setOperatePanel_'+renderNum] = () => {} //前台流程图操作者操作者
    window['hideWfOperatorInfo_'+renderNum] = () => {}; //前台流程图操作者操作者
    if(typeof onGraphCellClick == 'function') {
        window.onGraphCellClick = onGraphCellClick;
    }
    if(typeof chartLoadedFunc == 'function') {
        if(isSignEditChart) {
            window.freeChartLoadedFunc = chartLoadedFunc; 
        } else {
            window.workflowChartLoadCallback = chartLoadedFunc; 
        }
    } else {
        window.freeChartLoadedFunc = createFreeDrawBox; 
    }
  }

  setLoadingFlag = (val: boolean) => {
    this.setState({ loadingFlag: val});
  }

  render() {
    const { loadingFlag, renderNum } = this.state;
    return <div className={this.prefixCls}>
      <Spin weId={`${this.props.weId || ''}_702ufz`} spinning={loadingFlag}>
        <div id={"chart-area" + renderNum} className="chart-area"> </div>
      </Spin>
    </div>


  }

}


export default CustWfChart;



function createFreeDrawBox(freeLoadChartParams:any) {
  const render = () => {
    let freeChartStore = new FreeChartStore();
    const { chartRenderNum } = freeLoadChartParams;
        ReactDOM.render(
            <Provider weId={'_3d7lr7'} freeChartStore={freeChartStore}>
                <FreeChartSvgIndex weId={`liveox`} 
                    {...freeLoadChartParams}
                />
            </Provider>
            , document.querySelector('.workflowDesign-free-svg-container.chartNum' + chartRenderNum));
    };
    render();
}
