import { setDisableLocale, getLang } from '@weapp/utils';

if (setDisableLocale) {
  // 中文下禁用多语言文件
  setDisableLocale(getLang() === 'zh_CN');
}
