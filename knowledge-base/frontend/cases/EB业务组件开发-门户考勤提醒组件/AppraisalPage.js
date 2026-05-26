
import React from 'react';
import { request } from '@weapp/utils';

// 绩效 appraisal 
class Appraisal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appraisalList:[
        {assessmentCycle:'',score:''},
        {assessmentCycle:'',score:''},
        {assessmentCycle:'',score:''},
        {assessmentCycle:'',score:''},
        {assessmentCycle:'',score:''},
        {assessmentCycle:'',score:''},
      ]
    }
  }

  componentDidMount() {
    request({
      url: '/api/workrelate/performance/flow/getPortalRecently',
      method: 'POST',
      data: {},
    }).then((result: any) => {
      this.setState({
        appraisalList:result.data
      })
    });
  }

  onLinkMore = () =>{
    window.open('/sp/performance/flow/mineResult','_blank')
  }

  onLinkData = (item) =>{
    const {useType} =this.props;
    if(useType != 'Design' && item && item.linkUrl){
      window.open(item.linkUrl,'_blank')
    }
  }

  render() {
    const {appraisalList =[]} = this.state;

    return (
       <div className='PA-content'>
        <div className='PA-appraisal'>
         {
          appraisalList.map((i)=>{
            return(
              <div className='PA-appraisal-item' onClick={() => this.onLinkData(i)}>
              <p className='PA-appraisal-item-score'>{i.score}</p>
              <p className='PA-appraisal-item-assessmentCycle'>{i.assessmentCycle}</p>
            </div>
            )
            })
          }
        </div>
      </div>
    );
  }
}


export default Appraisal;

