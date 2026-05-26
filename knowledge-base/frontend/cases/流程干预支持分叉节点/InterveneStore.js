import { action,observable } from 'mobx';
import * as API from  './api/index';

export class InterveneStore {
  
    @observable visible = false;

    
    @observable showDialog = ()=>{
      this.visible = true;
    }

}
export default InterveneStore;