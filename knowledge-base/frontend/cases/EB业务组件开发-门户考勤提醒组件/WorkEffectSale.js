import React from 'react';
import { Component } from 'react';
import { TargetCardItem, IncreaseCardItem, EChartHt } from './WorkEffectItem';
import { qs, request, getLabel } from '@weapp/utils';


class WorkEffectSale extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      target: 0,   // 目标
      opportunityForecast: 0,  // 商机预测
      actualFinish: 0, // 实际完成
      rank: '无', // 排名
      newCustomer: 0, // 新增客户数
      newPeople: 0, // 新增人脉
      newOpportunity: 0, // 新增商机数
      rollOpportunity: 0, // 滚动商机数量
      targetMonth: 0, // 本月目标
      actualFinishMonth: 0 // 本月实际完成
    };
  }

  async componentDidMount() {
    // 数据在 项目页面（不启用） 中
    const PAGE_ID = '881184692112908291';

    let target = 0;
    let opportunityForecast = 0;
    let actualFinish = 0;
    let rank = 0;
    let newCustomer = 0;
    let newPeople = 0;
    let newOpportunity = 0;
    let rollOpportunity = 0;
    let targetMonth = 0;
    let actualFinishMonth = 0;

    // 目标 实际完成
    const reqP1 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881923757249495040',
    }),
      method: 'POST'
    })

    // 本月目标
    const reqP2 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881956682271924237',
    }),
      method: 'POST'
    })

    // 商机预测
    const reqP3 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881965113455813204',
    }),
      method: 'POST'
    })

     // 本月实际完成
    const reqP4 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881968635199463439',
    }),
      method: 'POST'
    })

    // 新增客户数
    const reqP5 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881545903108071430',
    }),
      method: 'POST'
    })

    // 新增人脉
    const reqP6 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881545061361909775',
    }),
      method: 'POST'
    })

    // 新增商机
    const reqP7 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881601153567367169',
    }),
      method: 'POST'
    })

    // 滚动商机
    const reqP8 = request({
      url: '/api/ebuilder/coms/dataset/getData',
      data: qs.stringify({
      pageId: PAGE_ID,
      datasetId: '881601711812452381',
    }),
      method: 'POST'
    })

    const promiseAll = await Promise.all([reqP1,reqP2,reqP3,reqP3,reqP4,reqP5,reqP6,reqP7,reqP8]);
    const reqP1Data = promiseAll[0];
    const reqP2Data = promiseAll[1];
    const reqP3Data = promiseAll[2];
    const reqP4Data = promiseAll[3];
    const reqP5Data = promiseAll[4];
    const reqP6Data = promiseAll[5];
    const reqP7Data = promiseAll[6];
    const reqP8Data = promiseAll[7];

    // 目标 实际完成
    if (reqP1Data.status){
      if (reqP1Data?.data[0]){
        const reqData = reqP1Data?.data[0];
        if(reqData.mbz !== undefined){
          target = reqData.mbz;
        }
        if(reqData.jine !== undefined){
          actualFinish = reqData.jine;
        }
      }
    }

    // 本月目标
    if (reqP2Data.status){
      if (reqP2Data?.data[0]){
        const reqData = reqP2Data?.data[0];
        if(reqData.mbzmth !== undefined){
          targetMonth = reqData.mbzmth;
        }
      }
    }

    // 商机预测
    if (reqP3Data.status){
      if (reqP3Data?.data[0]){
        const reqData = reqP3Data?.data[0];
        if(reqData.amount !== undefined && reqData.amount){
          opportunityForecast = reqData.amount;
        }
      }
    }

    // 本月实际完成
    if (reqP4Data.status){
        if (reqP4Data?.data[0]){
          const reqData = reqP4Data?.data[0];
          if(reqData.jine !== undefined){
            actualFinishMonth = reqData.jine;
        }
      }
    }

    // 新增客户数
    if (reqP5Data.status && reqP5Data?.data[0]?.totalNum !== undefined){
      newCustomer = reqP5Data?.data[0]?.totalNum;
    }

    // 新增人脉
    if (reqP6Data.status && reqP6Data?.data[0]?.totalNum){
      newPeople = reqP6Data?.data[0]?.totalNum;
    }

    // 新增商机
    if (reqP7Data.status && reqP7Data?.data[0]?.totalNum){
      newOpportunity = reqP7Data?.data[0]?.totalNum;
    }

    // 滚动商机
    if (reqP8Data.status && reqP8Data?.data[0]?.totalNum){
      rollOpportunity = reqP8Data?.data[0]?.totalNum;
    }

    target = (Number(target)/10000).toFixed(2);
    if(target === -0 ){
      target = 0;
    }
    
    opportunityForecast = (Number(opportunityForecast)/10000).toFixed(2);
    if(opportunityForecast === -0){
      opportunityForecast = 0;
    }

    actualFinish = (Number(actualFinish)/10000).toFixed(2);
    if(actualFinish === -0){
      actualFinish = 0;
    }

    rank = Number(rank).toFixed(0);
    if(rank === -0){
      rank = 0;
    }

    newCustomer = Number(newCustomer).toFixed(0);
    if(newCustomer === -0){
      newCustomer = 0;
    }

    newPeople = Number(newPeople).toFixed(0);
    if(newPeople === -0){
      newPeople = 0;
    }

    newOpportunity = Number(newOpportunity).toFixed(0);
    if(newOpportunity === -0){
      newOpportunity = 0;
    }

    rollOpportunity = Number(rollOpportunity).toFixed(0);
    if(rollOpportunity === -0){
      rollOpportunity = 0;
    }

    targetMonth = (Number(targetMonth)/10000).toFixed(2);
    if(targetMonth === -0){
      targetMonth = 0;
    }

    actualFinishMonth = (Number(actualFinishMonth)/10000).toFixed(2);
    if(actualFinishMonth === -0){
      actualFinishMonth = 0;
    }

    this.setState({
      target: target,
      opportunityForecast: opportunityForecast,
      actualFinish : actualFinish,
      rank: rank,
      newCustomer: newCustomer,
      newPeople: newPeople,
      newOpportunity: newOpportunity,
      rollOpportunity: rollOpportunity,
      targetMonth: targetMonth,
      actualFinishMonth: actualFinishMonth
    })
  }

  render() {
    const { target, opportunityForecast, actualFinish, rank, newCustomer, newPeople, newOpportunity, rollOpportunity,
      targetMonth, actualFinishMonth } = this.state;
    return (
      <div className='PA-element-content'>
        <div className='PA-element-content-top'>
          <div className='PA-element-left'>
            <TargetCardItem
              title={getLabel('230316','目标') }
              num={target}
              unit={target !== ('无' && '') ? getLabel('230317','万元') : ''}
              color={'#feb836'}
              url='/ebdapp/view/846297243998732291/page/882976049997307906-846297248306061327'
              urlDesc={getLabel('230519','查看我的目标')}
            />
            <TargetCardItem
              title={getLabel('230318','商机预测')}
              num={opportunityForecast}
              unit={opportunityForecast !== ('无' && '') ? getLabel('230317','万元') : ''}
              color={'#3789e2'}
              url='/crm/salechance/8612945869285708798/list/all?cusMenuId=6917885233176887178'
              urlDesc={getLabel('230521','查看我的商机')}
            />
            <TargetCardItem
              title={getLabel('230319','实际完成')}
              num={actualFinish}
              unit={actualFinish !== ('无' && '') ? getLabel('230317','万元') : ''}
              color={'#35ad86'}
              url='/ebdapp/view/846297243998732291/page/881199930553835527-846297248306061324'
              urlDesc={getLabel('230522','查看我的业绩')}
            />
            {
            //   <TargetCardItem
            //   title={'排名'}
            //   num={rank}
            //   unit={rank !== ('无' && '') ? 'getLabel('230317','万元')' : ''}
            //   color={'#35ad86'}
            // />
            }
          </div>
          <div className='PA-element-right'>
            <EChartHt
              title={getLabel('230320','本月')}
              xData={[getLabel('230316','目标'), getLabel('230322','实际')]}
              yData={[targetMonth, actualFinishMonth]}
            />
            <EChartHt
              title={getLabel('230321','本年')}
              xData={[getLabel('230316','目标'), getLabel('230322','实际')]}
              color={['#3789e2']}
              yData={[target, actualFinish]}
            />
          </div>
        </div>
        <div className='PA-element-content-bottom'>
          <IncreaseCardItem
            title={getLabel('230325','新增客户数')}
            num={newCustomer}
            unit={getLabel('230329','个')}
            icon={'Icon-customer'}
            url='/crm/customer/8612945869285708798/customerList/all?cusMenuId=6917885170972286710'
            urlDesc={getLabel('230523','查看我的客户')}
          />
          <IncreaseCardItem
            title={getLabel('230326','新增人脉')}
            num={newPeople}
            unit={getLabel('230329','个')}
            icon={'Icon-N-others-o'}
            url='/crm/customer/cusapp_combination/crm/customer/8612945869285708798/customerList/allPeople?cusMenuId=5408601881719220598'
            urlDesc={getLabel('230524','查看我的人脉')}
          />
          <IncreaseCardItem
            title={getLabel('230327','新增商机数')}
            num={newOpportunity}
            unit={getLabel('230329','个')}
            icon={'Icon-rate-circle-o'}
            url='/crm/salechance/8612945869285708798/list/all?cusMenuId=6917885233176887178'
            urlDesc={getLabel('230521','查看我的商机')}
          />
          <IncreaseCardItem
            title={getLabel('230328','滚动商机数量')}
            num={rollOpportunity}
            unit={getLabel('230329','个')}
            icon={'Icon-N-Customerunitprice-o'}
            url='/crm/salechance/8612945869285708798/list/all?cusMenuId=6917885233176887178'
            urlDesc={getLabel('230521','查看我的商机')}
          />
        </div>
      </div>
    );
  }
}

export default WorkEffectSale;
