





import { regOvProps } from '@weapp/utils';


let times = 0;

regOvProps('weappUi', 'LayoutBox', props => {

  if (props.weId === "3rdcst_oxa9w7_af1w56_6rw4jw_9eb5e8_aua90q_bcw4pc_gi2t20_p06x7i_tij3ya_0dhrgb"
    && times++ === 0) {

    if (window.weappUi) {
      let old = window.weappUi.MActionSheet.showActionSheetWithGridOptions;
      window.weappUi.MActionSheet.showActionSheetWithGridOptions = (e) => {
        // e.options = e.options.filter(x => x.icon != 'Icon-flow-chart')
        old({
          ...e,
          cancelButtonIndex: e.cancelButtonIndex - (e.options.length - e.options.filter(x => x.icon != 'Icon-flow-chart').length),
          options: e.options.filter(x => x.icon != 'Icon-flow-chart')
        });
      }
    }

  }

  return props;

});
