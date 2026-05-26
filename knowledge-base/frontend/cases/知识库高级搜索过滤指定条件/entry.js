


import { regOvProps } from '@weapp/utils';
import { toJS, runInAction } from 'mobx';


/**
 * 知识库高级搜索过滤指定条件
 */
regOvProps('weappUi', 'SearchAdvancedPanel', props => {

  const { searchAdvancedStore } = props;
  const { allFields, formStore } = searchAdvancedStore || {};
  console.info('allFields => ', toJS(allFields), searchAdvancedStore);
  runInAction(() => {
    // 过滤公共标签
    props.searchAdvancedStore.allFields = allFields.filter(x => x.id != 'tag');
    const initLayout = props.searchAdvancedStore
    .formStore.initLayout.map(x => {
      if (Array.isArray(x)) {
        x = x.map(y => {
          if (y.id === 'tag') {
            y.hide = true;
          }
          return y;
        })
      }
      return x;
    });
    const { datas,initItems,groups } = props.searchAdvancedStore.formStore;
    props.searchAdvancedStore.formStore.initForm({ 
      data: datas, items: initItems, groups, layout: initLayout 
    });
  })
  return props;

})
