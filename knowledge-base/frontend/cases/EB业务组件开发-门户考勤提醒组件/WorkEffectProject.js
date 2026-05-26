import React from 'react';
import { Component } from "react";
import { TargetCardItem, IncreaseCardItem, EChartHt } from './WorkEffectItem';
import { qs, request, getLabel } from '@weapp/utils';

class WorkEffectProject extends React.Component<any> {
  constructor(props) {
    super(props);

    this.state = {
      checkTarget: 0, // 验收目标
      actualFinish: 0,// 实际完成
      rank: '无', // 排名
      unCheckProject: 0, // 未验收项目
      planCheck: 0, // 本月计划验收
      allowance: 0, // 本月余量
      actualCheck: 0, // 本月实际验收
      checkTargetMonth: 0, // 本月目标
      actualFinishMonth: 0 // 本月实际
    };
  }

  async componentDidMount() {
    // 数据在 项目页面（不启用） 中
    const PAGE_ID = '881184413015531523';
    
    let checkTarget = 0;
    let actualFinish = 0;
    // let rank = 0;
    let unCheckProject = 0;
    let planCheck = 0;
    let allowance = 0;
    let actualCheck = 0;
    let checkTargetMonth = 0;
    let actualFinishMonth = 0;

    // 验收目标 实际完成
    const reqP1 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
        pageId: PAGE_ID,
        datasetId: '882713807764529168'
      }),
      method: 'POST'
    })

    // 未验收项目
    const reqP2 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
        pageId: PAGE_ID,
        datasetId: '882676883897131024'
      }),
      method: 'POST'
    })

    // 本月计划验收
    const reqP3 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
        pageId: PAGE_ID,
        datasetId: '882680113838809166'
      }),
      method: 'POST'
    })

    // 本月实际验收
    const reqP4 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
        pageId: PAGE_ID,
        datasetId: '882679117441564675'
      }),
      method: 'POST'
    })

    // 本月目标
    const reqP5 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
        pageId: PAGE_ID,
        datasetId: '884153253073494020'
      }),
      method: 'POST'
    })

    // 本月实际
    const reqP6 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
        pageId: PAGE_ID,
        datasetId: '884161778810068995'
      }),
      method: 'POST'
    })


    const promiseAll = await Promise.all([reqP1,reqP2,reqP3,reqP4,reqP5, reqP6])

    const reqP1Data = promiseAll[0];
    const reqP2Data = promiseAll[1];
    const reqP3Data = promiseAll[2];
    const reqP4Data = promiseAll[3];
    const reqP5Data = promiseAll[4];
    const reqP6Data = promiseAll[5];

    if (reqP1Data.status && reqP1Data?.data[0]){
      const reqData = reqP1Data?.data[0];
      if(reqData.target !== undefined){
        checkTarget = reqData.target;
      }
      if(reqData.jine !== undefined){
        actualFinish = reqData.jine;
      }
    }

    if (reqP2Data.status && reqP2Data?.data[0]){
      const reqData = reqP2Data?.data[0];
      if(reqData?.aece16c06b754ec99870f29c56db056b?.main){
        unCheckProject = reqData?.aece16c06b754ec99870f29c56db056b?.main;
      }
    }

    if (reqP3Data.status && reqP3Data?.data[0]){
      const reqData = reqP3Data?.data[0];
      if(reqData?.eebd1dac79f5468a87cc6240c5cae9ce?.main){
        planCheck = reqData?.eebd1dac79f5468a87cc6240c5cae9ce?.main;
      }
    }

    if (reqP4Data.status && reqP4Data?.data[0]){
      const reqData = reqP4Data?.data[0];
      if(reqData?.e296093c7cc0424f83ba2a938f61186a?.main){
        actualCheck = reqData?.e296093c7cc0424f83ba2a938f61186a?.main;
      }
    }

    if (reqP5Data.status && reqP5Data?.data[0]){
      const reqData = reqP5Data?.data[0];
      if(reqData.target !== undefined){
        checkTargetMonth = reqData.target;
      }
    }

    if (reqP6Data.status && reqP6Data?.data[0]){
      const reqData = reqP6Data?.data[0];
      if(reqData.jine !== undefined){
        actualFinishMonth = reqData.jine;
      }
    }


    checkTarget = (Number(checkTarget,10)/10000).toFixed(2);
    if(checkTarget === -0){
      checkTarget = 0;
    }

    actualFinish =  (Number(actualFinish,10)/10000).toFixed(2);
    if(actualFinish === -0){
      actualFinish = 0;
    }

    allowance = (Number(unCheckProject) - Number(unCheckProject)).toFixed(0);

    unCheckProject = Number(unCheckProject).toFixed(0);
    if(unCheckProject === -0){
      unCheckProject = 0;
    }

    planCheck =  Number(planCheck).toFixed(0);
    if(planCheck === -0){
      planCheck = 0;
    }

    actualCheck = Number(actualCheck).toFixed(0);
    if(actualCheck === -0){
      actualCheck = 0;
    }

    checkTargetMonth = (Number(checkTargetMonth)/10000).toFixed(2);
    if(checkTargetMonth === -0){
      checkTargetMonth = 0;
    }

    actualFinishMonth = (Number(actualFinishMonth)/10000).toFixed(2);
    if(actualFinishMonth === -0){
      actualFinishMonth = 0;
    }

    this.setState({
      checkTarget: checkTarget,
      actualFinish: actualFinish,
      unCheckProject: unCheckProject,
      planCheck: planCheck,
      allowance: allowance,
      actualCheck: actualCheck,
      checkTargetMonth: checkTargetMonth,
      actualFinishMonth: actualFinishMonth,
    })

  }

  render() {
    const { checkTarget, actualFinish, rank, unCheckProject, planCheck, allowance, actualCheck, 
      checkTargetMonth, actualFinishMonth } = this.state;

    return (
      <div className='PA-element-content'>
        <div className='PA-element-content-top'>
          <div className='PA-element-left'>
            <TargetCardItem
              title={getLabel('230335','验收目标')}
              num={checkTarget}
              unit={checkTarget !== '无' ? getLabel('230317','万元') : ''}
              color={'#feb836'}
            />
            <TargetCardItem
              title={getLabel('230319','实际完成')}
              num={actualFinish}
              unit={actualFinish !== '无' ? getLabel('230317','万元') : ''}
              color={'#3789e2'}
            />
            {
            //   <TargetCardItem
            //   title={'排名'}
            //   num={rank}
            //   unit={rank !== '无' ? '万元' : ''}
            //   color={'#35ad86'}
            // />
            }
          </div>
            <div className='PA-element-right'>
            <EChartHt
              title={getLabel('230320','本月')}
              xData={[getLabel('230316','目标'), getLabel('230322','实际')]}
              yData={[checkTargetMonth, actualFinishMonth]}
            />
            <EChartHt
              title={getLabel('230321','本年')}
              xData={[getLabel('230316','目标'), getLabel('230322','实际')]}
              color={['#3789e2']}
              yData={[checkTarget, actualFinish]}
            />
          </div>
        </div>
          <div className='PA-element-content-bottom'>
          <IncreaseCardItem
            title={getLabel('230331','未验收项目')}
            num={unCheckProject}
            unit={getLabel('230329','个')}
            icon={'Icon-customer'}
          />
          <IncreaseCardItem
            title={getLabel('230332','本月计划验收')}
            num={planCheck}
            unit={getLabel('230329','个')}
            icon={'Icon-N-others-o'}
          />
          <IncreaseCardItem
            title={getLabel('230333','本月余量')}
            num={allowance}
            unit={getLabel('230329','个')}
            icon={'Icon-rate-circle-o'}
          />
          <IncreaseCardItem
            title={getLabel('230334','本月实际验收')}
            num={actualCheck}
            unit={getLabel('230329','个')}
            icon={'Icon-N-Customerunitprice-o'}
          />
        </div>
      </div>
    );
  }
}

export default WorkEffectProject;
