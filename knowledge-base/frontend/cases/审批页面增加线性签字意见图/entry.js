
import { regOvProps, regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const CustWfChartAsync = React.lazy(() => asyncImport('${appId}', 'index'));
const CustWfChart = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <CustWfChartAsync {...props} ref={ref} />
  </React.Suspense>
})


regOvProps('weappUi', 'Menu', props => {
  if (props.bindKey === 'wf_flowpage_main') {
    let menuData = [...props.data || [], {
		  id: 'cust_line_sign', content: '线性签批意见',
    }];
  	props.data = menuData;
  }
  return props;
})

regOvComponent('weappUi', 'MenuContent', (Com) => {
	return React.forwardRef((props, ref) => {
    const { key, dataId, value } = props;
    // 通过复写dataId为main 来实现
		if (props.bindKey !== 'wf_flowpage_main' || value != 'cust_line_sign' || dataId != 'main') return <Com ref={ref} {...props} />;
		return <CustWfChart Com={Com} ref={ref} {...props} />
	});
});