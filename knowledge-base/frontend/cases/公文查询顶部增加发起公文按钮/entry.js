
import { regOvProps, history } from '@weapp/utils';
import { TitleProps } from '@weapp/ui';


regOvProps('weappUi', 'Title', (props: TitleProps) => {

  if (props.weId === '_0bz2u7_0prheo_1osrun_qvaryt_kt1p89' && location.pathname.indexOf('/odoc/customPage/-11') >= 0) {
    const { Button } = window.weappUi;
    const originRight = props.customRenderRight;
    props.className = props.className + ' odoc-send-btn-wrap'
    props.customRenderRight = () => {
      return <div className="odoc-send-btn-div">
        <Button type="primary" onClick={() => {
          history.push(location.pathname + '/newFlow');
        }} >发起公文</Button>
        {originRight && originRight()}
      </div>
    }
  }


  return props;

});