import { request,RequestOptionConfig } from '@weapp/utils';

/**
 * 更新流程状态信息
 * @param data 
 * @param apiStr 
 * @returns 
 */
export const updateStatusData = (data:any,apiStr:string) => {
    return request({
        // url: `/api/secondev/${apiStr}/core/seconddev/devStatus/updateDevStatusToEB`,
        //url: `/api/${apiStr}/core/seconddev/aiassistant/getRelateData`,
        url: `/api/secondev/${apiStr}/devStatus/updateDevStatusToEB`,
        method: 'post',
        data: data,
    })
}

export const test =()=>{
    const params = {"module":"ebuilderform","customParam":{"type":"submit","objId":"920193041112039425"},"local":true,"formData":{"module":"ebuilderform","dataDetails":[{"formField":{"id":"920194527061671939"},"content":"00:00:00"},{"type":"number","formField":{"id":"920193590859464706"},"content":"11111"},{"formField":{"id":"920193590859464707"},"content":"dd"},{"formField":{"id":"920193590859464708"},"dataOptions":[{"optionId":"863004022604963841","content":"xx005"}]},{"formField":{"id":"920194527061671937"},"dataText":{"content":"dddd"}},{"formField":{"id":"920194527061671938"},"content":"2023-10-18"},{"formField":{"id":"920906061394640896"},"content":"ssss"},{"type":"number","formField":{"id":"920906061394640897"},"content":"1"},{"formField":{"id":"920193590859464709"},"dataOptions":[{"optionId":"7","content":"转发"}]}],"client":"pc","dataStatus":"submit","form":{"id":"920193045247623169"},"formLayout":{"id":"920193045247623172"}}};     
    return request({
        url:'/api/ebuilder/form/form/message/sendMessage',
        method: 'post',
        data: params,
        headers: {"Ebbusinessid":"920193045247623169"},        
    })
}


