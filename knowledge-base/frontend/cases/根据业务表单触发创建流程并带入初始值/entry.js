



import { regOvProps, qs } from '@weapp/utils';


const execCode = () => {
  // 注册表单事件
  console.info('获取表单sdk');
  // 轮循抛出异常
  let times = 0;
  let subInterval = setInterval(() => {
    try {
      const sdk = WeFormSDK.getWeFormInstance("workflow", "1966260700094985777");
      clearInterval(subInterval);
      // 这里说明是获取到了实例
      let paramsObj = qs.parse(location.search.substring(1));
      Object.keys(paramsObj).forEach(key => {
        if (key.startsWith('field')) {
          sdk.changeFieldValue(key, { value: paramsObj[key] });
        }
      })
    } catch(err) { }
    if (times++ > 50) {
      clearInterval(subInterval);
    }
  }, 50)
}

let execTimes = 0;
regOvProps('weappUi', 'Title', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn' && 'WeFormSDK' in window && execTimes++ === 0) {
    let times = 0;
    const interval = setInterval(() => {
      try {
        clearInterval(interval);
        execCode();
      } catch(err) {}
      if (times++ > 30) {
        console.error('超时推出轮循');
        clearInterval(interval);
      }
    }, 100);

  }
  return props;

});
