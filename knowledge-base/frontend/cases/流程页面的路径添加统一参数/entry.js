
import { qs } from '@weapp/utils';

const appendParams = {
    paramsA: '1',
    paramsB: '2'
}

window.oldOpen = window.open;
window.open = (url)=>{
    if(url.includes('/sp/workflow/flowpage')) {
        if (url.includes('?')) {
            if (url.endsWith('?')) {
                url = url + qs.stringify(appendParams);    
            } else {
                url = url + "&" + qs.stringify(appendParams);
            }
        } else if (url) {
            url = url + "?" + qs.stringify(appendParams);
        }
    }
    window.oldOpen(url);
}