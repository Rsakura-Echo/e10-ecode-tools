


import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Layout', props => {

  if (props.weId === 'qjuo8q_texgmn_w3eew9_texgmn_pphlde_pk6qdu' && window.WeFormSDK) {
    const weFormSDK = WeFormSDK.getWeFormInstance();
    const xlkFieldId = weFormSDK.convertFieldNameToId('xlcd_aj7oag', 'main', true);
    const fxkFieldId = weFormSDK.convertFieldNameToId('fxk_6wco2b', 'main', true);

    const change = (value, typeval) => {
      weFormSDK.changeSingleField(fxkFieldId, {
        value
      }, {
        viewAttr: typeval
      })
    }

    weFormSDK.bindFieldChangeEvent(xlkFieldId, (data) => {
      const { value } = data;
      if (value === "7965458937453166186") { // 复选框赋值 选项1,并且只读
        change('7965458937458866190', 1);
      } else if (value === "7965458937453666187") { // 复选框 选项2，并且必填
        change('7965458937459566191', 3);
      } else { // 选项3, 编辑
        change('7965458937460166192', 2);
      }
    })
  }
  return props;

});

