import { regOvProps  } from '@weapp/utils';


axios.interceptors.response.use((response) => {
		const { config,status } = response;
		let { url,data } = config;
    
		if ( status == 200 && (url.indexOf('/api/workflow/core/flow/create') > -1 || url.indexOf('/api/workflow/core/flow/submit') > -1) ) {

        //=======项目配置  Start======
        //格式：workflowid ： 回写字段id
        const configData = {
          "1042536747909357593" : "1042536807980179458"
        }
        //=======项目配置  End======
        

        if(typeof data === 'string')
          data = JSON.parse(data);
        const{workflowId,requestId,freeNodes=[]} = data;

        const wffpSdk = window.weappWorkflow.getFlowPageSDK();
        const nodetype = wffpSdk.getCommonParam().userCurrentNodeType;

        if(nodetype == 0 && configData[workflowId] && configData[workflowId] != ''){
          let linkStr = '';
          freeNodes.map(freeNode => {
              const{nodeAddCcOperators = [],nodeAddOperators = [],signOrder} = freeNode;
              //拼接操作者
              let opStr = '';
              let separator = '|';
              if(signOrder === '0')
                separator = '/';
              else if(signOrder === '2')
                separator = ',';

              nodeAddOperators.map(op => {
                opStr += separator + op.name;
              })

              if(opStr != '')
                opStr = opStr.substring(1);

              //拼接抄送人
              let ccOpStr = '';
              nodeAddCcOperators.map(op => {
                ccOpStr += "§" + op.name;
              })

              //拼接节点字符串
              linkStr += '→' + opStr + ccOpStr;
          })

          if(linkStr != '')
            linkStr = linkStr.substring(1);

          let _params = {requestId,linkStr,fieldId: configData[workflowId]};

          axios.post("/api/secondev/workflow/doSave2", _params).then(function(response){

          });

        }
		}
    return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	});

regOvProps("weappUi", "LayoutRow", (props) => {
  if(props.className == 'nodeType' && props.weId.indexOf('_cqtuwx') > -1
    || props.className == 'allowModify' && props.weId.indexOf('_zeqvqr') > -1
    || props.className == 'node-item-row row-node-type ' && props.weId.indexOf('_wg2g9t') > -1
    || props.className == 'node-item-row row-node-modify' && props.weId.indexOf('_bipqew') > -1
  ){
    props.style = {display:'none'};
  }
  return props;
}, 0);