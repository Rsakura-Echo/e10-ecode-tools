import { action,observable } from 'mobx';
import * as API from  './api/index';

export class DevStatusStore {

    apiStr:string = 'workflow';
    
    @observable update:any = false;

    @action('更新流程状态信息')
    updateStatusData = (params: any = {}) => {
        API.updateStatusData(params,this.apiStr).then((res: any) => {
            this.update = true;
        })
    }
}
export default DevStatusStore;