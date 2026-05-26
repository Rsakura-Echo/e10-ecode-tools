

import { regOvProps, dayjs } from '@weapp/utils';

const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const fieldId = '1476628166004607334';

const setText = (value) => {
  const dom = document.querySelector(`#widget_${fieldId} .weapp-form-widget-content .ecode-week-text`);
  if (dom) {
    dom.innerText = value;
  } else {
    if (document.querySelector(`#widget_${fieldId} .weapp-form-widget-content`)) {
      const div = document.createElement('div');
      div.classList.add('ecode-week-text');
      div.innerText = value;
      document.querySelector(`#widget_${fieldId} .weapp-form-widget-content`).appendChild(div);
    }
  }
}

regOvProps('weappUi', 'DatePicker', props => {

  if (props.weId === 'f56o40_9d1m87_ktrfwy_su9cgs_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_7c2u94') {
    const { value } = props;
    // 判断当前值的星期
    if (value) {
      const week = weappUtils.dayjs(value).toDate().getDay();
      setText(weekArr[week]);
    } else {
      setText('');
    }
  }

  return props;
});

