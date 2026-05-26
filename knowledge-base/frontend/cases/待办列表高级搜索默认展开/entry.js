import { regOvProps  } from '@weapp/utils';

//高级搜索条件是否默认展开
regOvProps("weappUi", "SearchAdvancedPanel", (props) => {
  if(location.href.indexOf('/workflow/list/todo') > -1  && props.mode != 'popup'){
    //alert()
    props.defaultVisible = true;
  }
  return props;
}, 0);