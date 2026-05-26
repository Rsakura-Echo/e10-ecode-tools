import {getLabel} from '@weapp/utils';
const Test = ()=>{
  return <div style={{
    width:200,
    height:200,
    position:'fixed',
    top:200,
    left:'50%',
    background:'red',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff'
  }}>{getLabel('-1021741667285295104','文档比对')}</div>
}


export default Test;