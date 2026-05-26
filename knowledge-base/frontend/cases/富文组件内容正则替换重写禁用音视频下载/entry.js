import { regOvProps } from '@weapp/utils';

/**
 * 以下代码为替换文档正文内容video禁止下载，移动端把RichText替换为MRichText，并且判断weId改为移动端的weId即可
 */
let oldValue = '';
let replaceValue = '';
regOvProps('weappUi', 'RichText', (props) => {
  const {weId='',value=''} = props;
  if(weId.endsWith('_sex5dt')){
    if(value===oldValue){
      props.value = replaceValue;
    }else{
      replaceValue = props.value = value.replace(/<video [^>]*src=['"]([^'"]+)[^>]*>/g,function(matched){//替换富文本内的video标签，禁止下载
        let newStr = '';
        if(matched && matched.indexOf('controlslist')>=0){
          if(/controlslist=['"]([^'"]*)nodownload/.test(matched)){
            newStr = matched;
          }else{
            newStr = matched.replace('controlslist="','controlslist="nodownload ').replace("controlslist='","controlslist='nodownload ")
          }
        }else{
          newStr = matched.replace('<video','<video'+' controlslist="nodownload"')
        }
        return newStr;
      })
    }
    oldValue = value;
  }
  return props;
}, 0);
