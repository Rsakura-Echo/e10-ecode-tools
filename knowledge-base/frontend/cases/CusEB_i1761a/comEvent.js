import { corsImport } from '@weapp/utils';
import { EventName } from './types';

let __event: any = null;

export const getEvent = (comId?: any) => {
  // 运行时events对象统一
  // TODO 移除
  const pageSDKs = window.ebuilderSDK?.pageSDKs || {};
  let pageSDK: any = null;

  if (typeof comId === 'string') {
    pageSDK = Object.values(pageSDKs).find((pageSdk: any) => !!pageSdk.getCom(comId));
  }

  if (!pageSDK) {
    pageSDK = window.ebuilderSDK?.getPageSDK();
  }

  if (pageSDK) {
    return pageSDK?.events;
  }

  if (__event) {
    return __event;
  }

  // 兼容设计器使用comEvent的场景
  // 兼容外部直接使用@weapp/designer中的View的场景
  return corsImport('@weapp/designer').then((designer) => {
    const events = new designer.EventEmitter();

    __event = events;

    return events;
  });
};

/**
 * 兼容comEvent历史遗留的用法，第二个参数传入的是非组件id
 * comEvent.on('filter', 'com_manage_11', fn)
 */
const legacyEvents: string[] = [];

const isLegacyEvent = (eventName: EventName, comId?: string) => {
  if (typeof comId === 'string') {
    return legacyEvents.includes(`${eventName}_${comId}`);
  }

  return false;
};

/**
 * comEvent主要是解决：
 * 1. 组件之间的通信问题
 * 2. 供外部调用触发的事件
 * 通过事件注入、传参的方式
 */
export default {
  /**
   * 绑定事件
   * @param EventName 事件类型
   * @param comId 事件作用域，通常为组件id
   * @param fn 事件handler
   */
  on: async (eventName: EventName, comId: string | Function, fn?: any) => {
    const event = await getEvent(comId);

    if (typeof comId === 'string' && !/^\w{32}$/.test(comId)) {
      const evtName = `${eventName}_${comId}`;

      event?.on(evtName, fn);

      if (!legacyEvents.includes(evtName)) {
        legacyEvents.push(evtName);
      }
    } else {
      event?.on(eventName, comId, fn);
    }
  },
  /**
   * 移除事件
   * @param eventName 事件类型
   * @param comId 事件作用域，通常为组件id，如果不指定具体组件id，则移除所有eventName开头的事件
   * @param args 事件handler支持的参数
   */
  off: async (eventName: EventName, comId?: string, fn?: any) => {
    const event = await getEvent(comId);

    if (isLegacyEvent(eventName, comId)) {
      const evtName = `${eventName}_${comId}`;

      return event?.off(evtName, fn);
    }

    return event?.off(eventName, comId, fn);
  },
  /**
   * 触发事件
   * @param eventName 事件类型
   * @param comId 事件作用域，通常为组件id，如果不指定具体组件id，则触发所有eventName开头的事件
   * @param args 事件handler支持的参数
   */
  emit: async (eventName: EventName, comId?: string, ...args: any[]) => {
    const event = await getEvent(comId);

    if (isLegacyEvent(eventName, comId)) {
      const evtName = `${eventName}_${comId}`;

      return event?.emit(evtName, ...args);
    }

    return event?.emit(eventName, comId, ...args);
  },
  /**
   * 只绑定第一次的触发事件
   * @param EventName 事件类型
   * @param comId 事件作用域，通常为组件id
   * @param fn 事件handler
   */
  unique: async (eventName: EventName, comId: string | Function, fn?: any) => {
    const event = await getEvent(comId);

    event?.off(eventName, comId);
    event?.on(eventName, comId, fn);
  },
};
