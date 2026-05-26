import axios from 'axios';
let {pathname} = window.location;

// if(pathname.indexOf("/flowpage/view") > -1 || pathname.indexOf("/flowpage/rightView") > -1){
	axios.interceptors.response.use((response) => {
		const { config,data,status } = response;
		const { url } = config;
		if (status == 200 && url.indexOf('/workflow/core/draftopinion/getOpinionByRequestIdAndWidgetId') > -1 || url.indexOf('/workflow/core/draftopinion/getOpinionById') > -1 || url.indexOf('/workflow/core/draftopinion/list') > -1) {
				//=====【项目配置  Start】=====
				let nodeids = '921588763574009858';//需要过滤的节点ids，多个节点之间，用半角逗号分隔  id1,id2,id3
				//=====【项目配置  End】=====
				let currentDepart = window.TEAMS.currentUser.department.id;//当前登录用户的部门

				//一人一条意见
				let {onePersonOpinionRecordDTOList = []} = data.data.opinion;

				//过滤数据
				data.data.opinion.onePersonOpinionRecordDTOList = onePersonOpinionRecordDTOList.filter(function(opnion){
					const {operateNodeId,department={}} = opnion;
					let ret = true;
					
					//指定节点的拟签意见才需要过滤
					if(("," + nodeids + ",").indexOf("," + operateNodeId + ",") > -1){
						const operDepart = department.departMentId;
						//意见部门和当前用户部门不一样，这条意见需要剔除
						if(operDepart != currentDepart){
							ret = false;
						}

					}
					return ret;
				});
		}
		return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	});
// }