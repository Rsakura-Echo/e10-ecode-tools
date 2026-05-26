import {Button} from '@weapp/ui';
import loadjs from 'loadjs';
import {useState,useCallback,useEffect} from 'react';

//第三方组件使用示例
const NewButton =(props)=> {
  const { OriginCom } = props;
  const [load,setLoad] = useState(false);
  useEffect(()=>{
    if(window.antd){
      setLoad(true);
    }else{
      // 选中 resources/vue.js 右键，可以复制资源地址
      // 不要使用cdn地址，会有安全问题
      loadjs(['${appRes}/dayjs.min.js','${appRes}/antd.min.js'], {
          success: () => {
            setLoad(true)
          }
      })
    }
    
  },[])

  const onClick=useCallback(()=>{
    alert('antd btn click')
  },[])

  const renderAntdButton = useCallback(()=>{
    let AntdButton = window.antd.Button;
    return <AntdButton type='primary' style={{marginRight:'10px'}} onClick={onClick}>antdButton</AntdButton>
  },[])

  return (
    <span className="app-${appId}-newButton">
      {load && renderAntdButton()}
      <OriginCom {...props} />
    </span>
  )
}

export default NewButton;


