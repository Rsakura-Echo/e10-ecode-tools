
import { useMemo, useRef, useEffect, useState } from 'react';
const target = typeof window === 'undefined' ? global : window;
const vendors = ['webkit', 'ms', 'moz', 'o'];



export const getScrollElements = (
  container: HTMLElement,
  top: HTMLElement = document.documentElement
): HTMLElement[] => {
  const scrollElements: HTMLElement[] = [];
  let element: HTMLElement | null = container;
  while (element && element !== top) {
    if (isScrollElement(element)) {
      scrollElements.push(element);
    }
    element = element.parentElement;
  }
  return scrollElements;
};

export const contains = function (root, ele) {
  let node = ele;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};
export const off = (function () {
  if (isServerRendering) {
    return NOOP;
  }
  return function (
    element: any,
    event: string,
    handler: EventListener | EventListenerObject | Function,
    options?: boolean | AddEventListenerOptions
  ) {
    element && element.removeEventListener(event, handler, options || false);
  };
})();
export function useIsFirstRender() {
  const isFirst = useRef<boolean>(true);
  useEffect(() => {
    isFirst.current = false;
  }, []);
  return isFirst.current;
}

export const on = (function () {
  if (isServerRendering) {
    return NOOP;
  }
  return function (
    element: any,
    event: string,
    handler: EventListener | EventListenerObject | Function,
    options?: boolean | AddEventListenerOptions
  ) {
    element && element.addEventListener(event, handler, options || false);
  };
})();
export const isServerRendering = (function () {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();

let raf: any = (target as unknown as Window).requestAnimationFrame; // eslint-disable-line
let caf: any = (target as unknown as Window).cancelAnimationFrame; // eslint-disable-line

if (!raf || !caf) {
  vendors.some((prefix) => {
    raf = target[`${prefix}RequestAnimationFrame`];
    caf = target[`${prefix}CancelAnimationFrame`] || target[`${prefix}CancelRequestAnimationFrame`];
    return raf && caf;
  });

  if (!raf || !caf) {
    let lastTime = 0;
    raf = function (cb: () => void) {
      const currentTime = Date.now();
      const diff = Math.max(0, 16 - (currentTime - lastTime));
      const timer = setTimeout(() => {
        cb();
        lastTime = currentTime + diff;
      }, diff);
      return timer;
    };

    caf = function (timer: number) {
      clearTimeout(timer);
    };
  }
}

raf = raf.bind(target);
caf = caf.bind(target);

export {
  caf,
  raf 
};

export function throttleByRaf(cb: (...args: any[]) => void) {
  let timer: null | number = null;

  const throttle = function (...args: any[]) {
    timer && caf(timer);
    timer = raf(() => {
      cb(...args);
      timer = null;
    });
  };

  throttle.cancel = () => {
    caf(timer);
    timer = null;
  };

  return throttle;
}


export function useMergeValue<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
  }
): [T, React.Dispatch<React.SetStateAction<T>>, T] {
  const { defaultValue, value } = props || {};
  const firstRenderRef = useRef(true);

  const [stateValue, setStateValue] = useState<T>(
    !isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue
  );

  useEffect(() => {
    // 第一次渲染时候，props.value 已经在useState里赋值给stateValue了，不需要再次赋值。
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    // 外部value等于undefined，也就是一开始有值，后来变成了undefined（
    // 可能是移除了value属性，或者直接传入的undefined），那么就更新下内部的值。
    // 如果value有值，在下一步逻辑中直接返回了value，不需要同步到stateValue
    if (value === undefined) {
      setStateValue(value);
    }
  }, [value]);

  const mergedValue = isUndefined(value) ? stateValue : value;

  return [mergedValue, setStateValue, stateValue];
}


export function useUpdate(fn, deps = []) {
  const isDidMount = useRef(false);

  useEffect(() => {
    if (isDidMount.current) {
      fn();
    } else {
      isDidMount.current = true;
    }
  }, [...deps]);
}

export const useUpdateEffect = useUpdate;


const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]';
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]';
}

export function isFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]';
}

export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]';
}

function isHex(color) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}

function isRgba(color) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color);
}
export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isNull(obj: any): obj is null {
  return obj === null;
}

export function isNullOrUndefined(obj: any): boolean {
  return obj === null || obj === undefined;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function';
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isExist(obj: any): boolean {
  return obj || obj === 0;
}

export function isWindow(el: any): el is Window {
  return el === window;
}

export function warning(condition, message: string) {
  if (process.env.NODE_ENV !== 'production' && console) {
    if (condition) {
      console.error(`Warning: ${message}`);
    }
  }
}


export function cs(...args: ClassNamesArg[]): string {
  const length = args.length;
  let classNames: string[] = [];
  for (let i = 0; i < length; i++) {
    const v = args[i];
    if (!v) {
      continue;
    }
    if (isString(v)) {
      classNames.push(v);
    } else if (isArray(v)) {
      classNames = classNames.concat(v);
    } else if (isObject(v)) {
      Object.keys(v).forEach((k) => {
        if (v[k]) {
          classNames.push(k);
        }
      });
    } else {
      warning(true, 'arguments must be one of string/array/object.');
    }
  }
  return [...new Set(classNames)].join(' ');
}


export function text(props) {
  const { style, width = '60%', rows = 3, className, prefixCls } = props;
  const classNames = cs(`${prefixCls}-text`, className);
  const nodes = [] as JSX.Element[];

  function getTextWidth(index: number) {
    if (isArray(width)) {
      return width[index];
    }
    if (rows - 1 === index) {
      return width;
    }

    return undefined;
  }

  for (let i = 0; i < (rows as number); i++) {
    nodes.push(
      <li className={`${prefixCls}-text-row`} key={i} style={{ width: getTextWidth(i) }} />
    );
  }
  return (
    <ul className={classNames} style={style}>
      {nodes}
    </ul>
  );
  
}

export function image(props: SkeletonImageProps) {
  const { style, shape = 'square', size, position = 'left', className, prefixCls } = props;
  const classNames = cs(
    `${prefixCls}-image`,
    {
      [`${prefixCls}-image-${position}`]: position,
      [`${prefixCls}-image-${shape}`]: shape,
      [`${prefixCls}-image-${size}`]: size,
    },
    className
  );
  return <div className={classNames} style={style} />;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K | string> // string 为了某些没有声明的属性被omit
): Omit<T, K> {
  const clone = {
    ...obj,
  };
  keys.forEach((key) => {
    if ((key as K) in clone) {
      delete clone[key as K];
    }
  });
  return clone;
}

export function mergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: PropsType
): PropsType {
  const _defaultProps = { ...defaultProps, ...globalComponentConfig };
  const props = { ...componentProps };

  // https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/ReactElement.js#L312
  for (const propName in _defaultProps) {
    if (props[propName] === undefined) {
      props[propName] = _defaultProps[propName];
    }
  }

  return props;
}


export function useMergeProps<PropsType>(
  componentProps: PropsType & MergePropsOptions,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: Partial<PropsType>
): PropsType {
  const { _ignorePropsFromGlobal } = componentProps;
  const _defaultProps = useMemo(() => {
    return { ...defaultProps, ...(_ignorePropsFromGlobal ? {} : globalComponentConfig) };
  }, [defaultProps, globalComponentConfig, _ignorePropsFromGlobal]);

  const props = useMemo(() => {
    // Must remove property of MergePropsOptions before passing it to component
    const mProps = omit(componentProps, ['_ignorePropsFromGlobal']) as PropsType;

    // https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/ReactElement.js#L312
    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName];
      }
    }

    return mProps;
  }, [componentProps, _defaultProps]);

  return props;
}




const isSingleNode = (child: React.ReactNode) => {
  return isString(child) || isNumber(child);
};

export function mergedToString(children: any): string {
  const mergedResult = [''];
  React.Children.forEach(children, (child) => {
    const prevIndex = mergedResult.length - 1;
    const prevChild = mergedResult[prevIndex];

    if (isSingleNode(child) && isSingleNode(prevChild)) {
      mergedResult[prevIndex] = `${prevChild}${child}`;
    } else if (child && child.props && child.props.children) {
      mergedResult.push(mergedToString(child.props.children));
    }
  });

  return mergedResult.join('');
}
// keyboard keycode

export const Enter = {
  key: 'Enter',
  code: 13,
};

export const Esc = {
  key: 'Escape',
  code: 27,
};

export const Backspace = {
  key: 'Backspace',
  code: 8,
};

export const Tab = {
  key: 'Tab',
  code: 9,
};

export const Space = {
  key: '',
  code: 32,
};
export const ArrowUp = {
  key: 'ArrowUp',
  code: 38,
};

export const ArrowDown = {
  key: 'ArrowDown',
  code: 40,
};

export const ArrowLeft = {
  key: 'ArrowLeft',
  code: 37,
};

export const ArrowRight = {
  key: 'ArrowRight',
  code: 39,
};
