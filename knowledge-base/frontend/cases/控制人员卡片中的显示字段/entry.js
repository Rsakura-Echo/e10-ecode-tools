

import { regOvProps } from '@weapp/utils';


// 要隐藏的字段标题
const hideTitles = ['邮箱'];

const checkHrmCard = (props) => {
  // 获取所有的字段
  const nodes = document.querySelectorAll('.ui-hrm-card-column-panel-detail_card-detail-single');
  for (let i = 0; i < nodes.length; i++) {
    const tNode = nodes[i].querySelector('.ui-hrm-card-column-panel-detail_card-item-label-content');
    // console.info('i => ', i, nodes[i])
    if (tNode && hideTitles.includes(tNode.getAttribute('title'))) {
      nodes[i].remove();
    }
  }

}

regOvProps('weappUi', 'HrmCardPopup', props => {
  setTimeout(() => {
    checkHrmCard(props);
  }, 300)
  
  return props;
});
