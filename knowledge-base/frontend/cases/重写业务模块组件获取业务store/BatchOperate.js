import React,{useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import {Button} from '@weapp/ui';

const BatchOperate = (props)=>{
  useEffect(()=>{
    console.log(props.docListStore)
  },[])
  return <Button>批量操作按钮</Button>
}

export default inject('docListStore')(observer(BatchOperate));

//这是文档列表，所以是docListStore，如果是其他组件就找对应store即可