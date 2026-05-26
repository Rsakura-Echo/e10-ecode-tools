import React, { PropsWithChildren, useContext } from 'react';
import { cs } from './utils';

interface HoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'mini' | 'default' | 'large';
  className?: string;
  prefix?: string;
  disabled?: boolean;
  onClick?: (e) => void;
}

export default function IconHover(props: PropsWithChildren<HoverProps>) {
  const { children, className, disabled, prefix, size = 'default', ...rest } = props;
  // const { getPrefixCls } = useContext(ConfigContext);
  const getPrefixCls = val => `arco-${val}`;
  const prefixCls = getPrefixCls('icon-hover');

  return (
    <span
      className={cs(
        prefixCls,
        {
          [`${prefix}-icon-hover`]: prefix,
          [`${prefixCls}-size-${size}`]: size && size !== 'default',
          [`${prefixCls}-disabled`]: disabled,
        },
        className
      )}
      onClick={props.onClick}
      {...rest}
    >
      {children}
    </span>
  );
}
