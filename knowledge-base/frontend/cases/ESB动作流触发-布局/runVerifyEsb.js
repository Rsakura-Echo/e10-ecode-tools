window.weappUtils.request({
  url: '/api/ebuilder/form/esb/runVerifyEsb',
  method: 'POST',
  data: {
    esbActionIds: '1167723740175081475', // eb 表单事件动作 ID
    objId: '1078896094132166672',        // eb 表单 ID
    formData: {
      dataDetails: [
        {
          content: '文本值',
          formField: { id: '1078896094132166687' },
        },
        {
          dataText: { content: '多行文本值' },
          formField: { id: '1078896094132166688' },
        },
        {
          content: '123',
          formField: { id: '1078896094132166689' },
          type: 'number',
        },
      ],
    },
  },
});
