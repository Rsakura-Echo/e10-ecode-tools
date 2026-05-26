


import { observable, action, runInAction } from 'mobx';

export class AttachDialogStore {

  @observable visible = false;

  @action
  changeVisible = (status) => {
    this.visible = status;
  }

}

const attachDialogStore = new AttachDialogStore();

export default attachDialogStore;