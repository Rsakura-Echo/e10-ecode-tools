
import { asyncImport } from '@weapp/ecodesdk';
const commomComAppId  = '730529475668926465';
/**
 * message 直接取公共组件中的message, 这里只是为了方式使用，把asyncImport进行一层封装处理
 */
class message {

  asyncMessage = undefined;
  constructor() {
    this.init();
  }

  async init() { // 初始化加载message
    const res = await asyncImport(commomComAppId, 'index.js');
    this.asyncMessage = res.message;
  }

  success = async (msg: string) => {
    if (!this.asyncMessage) await this.init();
    this.asyncMessage.success(msg);
  }

  info = async(msg: string) => {
    if (!this.asyncMessage) await this.init();
    this.asyncMessage.info(msg);
  }

  error = async(msg: string) => {
    if (!this.asyncMessage) await this.init();
    this.asyncMessage.error(msg);
  }


  confirm = async (title: string, content: React.ReactNode | string, onOKClick?: Function, onCancel?: Function) => {
    if (!this.asyncMessage) await this.init();
    this.asyncMessage.confirm(title, content, onOKClick, onCancel);
  }
}



const instance = new message();
export default instance;