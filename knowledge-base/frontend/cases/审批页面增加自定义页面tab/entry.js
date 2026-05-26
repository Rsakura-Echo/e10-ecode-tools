

import { regOvProps, regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const CustomMenuContentAsync = React.lazy(() => asyncImport('${appId}', 'index'));

regOvProps('weappUi', 'Menu', props => {
  if (props.bindKey === 'wf_flowpage_main') {
    let menuData = [...props.data || [], {
		  id: 'cust', content: '自定义',
    }];
  	props.data = menuData;
  }
  return props;
})

regOvComponent('weappUi', 'MenuContent', (Com) => {
	return React.forwardRef((props, ref) => {
    const { key, dataId, value } = props;
    // 通过复写dataId为main 来实现
		if (props.bindKey !== 'wf_flowpage_main' || value != 'cust' || dataId != 'main') return <Com ref={ref} {...props} />;
		return (
			<React.Suspense fallback={() => {}}>
        <CustomMenuContentAsync ref={ref} {...props} OriginCom={Com} />
      </React.Suspense>
		);
	});
});