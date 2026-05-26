

import { regOvProps } from '@weapp/utils';

// 修改页面的 icon
//  https://eteams.cn/favicon.ico

const change = () => {
  const links = document.querySelectorAll('link');

  for (let i = 0; i < links.length; i++) {
    if (links[i].rel === 'icon') {
      links[i].href = 'https://eteams.cn/favicon.ico';
    }
  }

}

change();
regOvProps('weappUi', 'LayoutBox', props => {
  change();
  return props;
})


