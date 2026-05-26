// 配置需要处理的字段
const FIELD_CONFIGS = [
  {
    fieldId: '1162043710433394688',
    column: 'zdydxwb',
    type: 'content',
    title:'单行文本'
  },
  {
    fieldId: '1162043710433394691',
    column: 'ryxz_xocc',
    type: 'options',
    title:'人员选择'
  }
];

// 需要拦截的API路径
const INTERCEPTED_API_PATHS = [
  'api/meeting/search/getMeetingList',
  'api/app/meeting/search/getMeetingList',
  'api/meeting/monitor/getMonitorListData',
  'api/app/meeting/monitor/getMonitorListData',
  'api/meeting/roomUsage/getRoomUsageListData',
  'api/app/meeting/roomUsage/getRoomUsageListData'
];

// 添加响应拦截器
axios.interceptors.response.use(async function (response) {
  // 检查是否是目标API响应
  if (!response?.config?.url || !INTERCEPTED_API_PATHS.some(path => response.config.url.includes(path))) {
    return response;
  }

  const responseData = response.data?.data;
  if (!responseData?.columns) {
    return response;
  }

  const { columns, data: datas, displayData: displayDatas } = responseData;

  // 1. 添加列配置
  FIELD_CONFIGS.forEach(config => {
    const columnConfig = {
      title: config.title,
      dataIndex: config.column,
      width: "10%",
      orderKey: "",
      isLocaleDate: true,
      retainTimeFormat: true,
    };
    columns.splice(columns.length - 1, 0, columnConfig);
  });

  // 2. 获取所有会议ID
  const mtids = datas.map(item => item.id);
  const fieldids = FIELD_CONFIGS.map(config => config.fieldId);

  // 3. 请求会议详情数据
  try {
    const detailResponse = await window.weappUtils.request({
      url: '/api/meeting/search/getMeetingDetailFormDatas',
      method: "post",
      data: { fieldIds: fieldids, mtIdList: mtids }
    });

    if (detailResponse.data) {
      const detailData = detailResponse.data;
      
      // 4. 处理每个会议的数据
      Object.keys(detailData).forEach(meetingId => {
        const meetingDetails = detailData[meetingId][0];
        
        if (meetingDetails?.dataDetails) {
          // 处理每个配置的字段
          FIELD_CONFIGS.forEach(config => {
            const targetField = meetingDetails.dataDetails.find(
              item => item.formField?.id === config.fieldId
            );
            
            if (!targetField) return;

            let value = '';
            if (config.type === 'content') {
              value = targetField.content || '';
            } else if (config.type === 'options') {
              value = targetField.dataOptions?.map(item => item.content).join(', ') || '';
            }

            // 更新displayData和data中的值
            [displayDatas, datas].forEach(dataArray => {
              const targetItem = dataArray.find(item => item.id === meetingId);
              if (targetItem) {
                targetItem[config.column] = value;
              }
            });
          });
        }
      });

      // 更新响应数据
      response.data.data.displayData = displayDatas;
      response.data.data.data = datas;
    }
  } catch (error) {
    console.error("获取会议详情失败:", error);
  }

  return response;
}, function (error) {
  return Promise.reject(error);
});