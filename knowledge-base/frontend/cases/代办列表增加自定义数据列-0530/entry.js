
import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const ButtonPlus = React.lazy(() => 
  new Promise((resolve) => asyncImport('730529475668926465', 'index').then(esm => 
    resolve({ default: esm.ButtonPlus }))));
// 代办列表增加自定义数据列， 需切换为表格模式下
regOvProps('weappUi', 'Table', (props) => {
  if (props.weId === 'f56o40_9d1m87_crs1an_lcktvw_8d2ywu_i83sct') {
    props.columns.push({
      align: 'left',
      title: 'ecode添加的操作列',
      dataIndex: 'ecode_opt',
      width: '100px',
      bodyRender: (data) => {
        return <ButtonPlus onClick={() => {
          asyncImport('730529475668926465', 'message.js').then(message => {
            // console.info(message);
            message.default.confirm('附加操作-' + data.requestid, '流程数据 => ' + JSON.stringify(data));
          });
        }} >附加操作</ButtonPlus>
      }
    })
  }
  return props;
});
