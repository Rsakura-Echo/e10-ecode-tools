//视图切换，默认列表视图
axios.interceptors.response.use((response) => {
		const { config,data,status } = response;
		const { url } = config;
		if (location.href.indexOf('/workflow/list/todo') > -1 && status == 200 && url.indexOf('/api/workflow/list/getListConfig') > -1 ) {
				if(data.data.tableType == 'waterfall'){
          data.data.tableType = 'list';
        }         
		}
		return response;
	}, function (error) {
		console.info('接口请求出错啦', error);
	}
);