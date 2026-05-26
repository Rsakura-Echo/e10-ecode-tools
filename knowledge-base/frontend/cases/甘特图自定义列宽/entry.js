import { regOvProps } from '@weapp/utils';

regOvProps('weappGantt', 'GanttBaseViewContainer', (props) => {
  props.columns=props.columns?.map((item)=>{

    console.log(item)
    if(item.key==='name'){//针对实际key值改变对应的列的宽度
      return {...item,width:400}
    }
    return item
  })
  return props;
}, 0);