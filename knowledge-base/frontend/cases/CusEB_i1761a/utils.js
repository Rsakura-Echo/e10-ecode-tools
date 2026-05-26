import {routeName} from './config/config';

export function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
    if (obj1 == null || obj2 == null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

export function getBuildPath(path: string, pkgName = routeName) {
  if (true) {
    const buildPath = `${window.publicUrlstatic || window.publicUrl || ''}/build/${pkgName}`;

    const returnArray = [buildPath, path].join('/');
    // 剔除协议后做处理
    const protocolMatch = returnArray.match(/^http(s)?:\/\//);
    const protocol = protocolMatch ? protocolMatch[0] : '';
    return (
      returnArray
        .replace(protocol, '')
        // 处理空值情况，如root为空时
        .replace(/\/\//g, '/')
        .replace(/^/, protocol)
    );
  }

  return path;
}

export function getImgPath(path: string, pkgName = routeName) {
  return getBuildPath(`/images/${path}`, pkgName);
}

export const setTimeoutOnce = (callback: Function, time: number = 0) => {
  const timer = setTimeout(() => {
    callback();

    if (timer) {
      clearTimeout(timer);
    }
  }, time);
};