

import React, { ReactInstance } from 'react';
import ReactDOM from 'react-dom';

import { asyncImport } from '@weapp/ecodesdk';
import BaseNotification from './notification';
import Notice from './notice';
import { cs, isNumber, isUndefined } from './utils';

const notificationTypes = ['info', 'success', 'error', 'warning', 'normal'];
let notificationInstance: object = {};


const CSSTransitionAsync = React.lazy(() => asyncImport('759419684898578433', 'CSSTransition'));
const TransitionGroupAsync = React.lazy(() => asyncImport('759419684898578433', 'TransitionGroup'));

const CSSTransition = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <CSSTransitionAsync ref={ref} {...props} />
  </React.Suspense>
})


const TransitionGroup = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <TransitionGroupAsync ref={ref} {...props} />
  </React.Suspense>
})


// global config
let maxCount;
let prefixCls;
let duration;
let container;
let rtl;

class Notification extends BaseNotification {
  static success: (config: NotificationProps) => ReactInstance;

  static info: (config: NotificationProps) => ReactInstance;

  static warning: (config: NotificationProps) => ReactInstance;

  static error: (config: NotificationProps) => ReactInstance;

  static normal: (config: NotificationProps) => ReactInstance;

  static config = (options: ConfigProps = {}): void => {
    if (options.maxCount) {
      maxCount = options.maxCount;
    }
    if (options.prefixCls) {
      prefixCls = options.prefixCls;
    }
    if (isNumber(options.duration)) {
      duration = options.duration;
    }
    if (options.rtl) {
      rtl = options.rtl;
    }
    if (options.getContainer && options.getContainer() !== container) {
      container = options.getContainer();
      Object.keys(notificationInstance).forEach((notice) => notificationInstance[notice].clear());
      notificationInstance = {};
    }
  };

  static clear: () => void = () => {
    Object.keys(notificationInstance).forEach((ins) => {
      notificationInstance[ins].clear();
    });
  };

  static remove: (id: string) => void = (id: string) => {
    Object.keys(notificationInstance).forEach((ins) => {
      notificationInstance[ins].remove(id);
    });
  };

  static addInstance: (config: NotificationProps) => ReactInstance = (
    noticeProps: NotificationProps
  ) => {
    let position = noticeProps.position;
    if (isUndefined(noticeProps.position)) {
      position = rtl ? 'topLeft' : 'topRight';
    }
    const _noticeProps = {
      duration,
      ...noticeProps,
    };
    if (notificationInstance[position]) {
      const notices = notificationInstance[position].state.notices;
      if (notices.length >= maxCount) {
        const updated = notices[0];
        notices.shift();
        notificationInstance[position].add({
          ..._noticeProps,
          id: updated.id,
        });
      } else {
        notificationInstance[position].add(_noticeProps);
      }
      return notificationInstance[position];
    }
    const div = document.createElement('div');
    let instance = null;
    (container || document.body).appendChild(div);
    ReactDOM.render(
      <Notification
        ref={(ref) => {
          notificationInstance[position] = ref;
          notificationInstance[position].add(_noticeProps);
          instance = notificationInstance[position];
          return instance;
        }}
      />,
      div
    );
  };

  remove = (id: string) => {
    const noticeItem = this.state.notices.find((item) => item.id === id);
    if (noticeItem) {
      this.update({ ...noticeItem, style: { ...noticeItem.style, opacity: 0 } });
    }

    // 200 是透明度动画结束的时间
    setTimeout(() => {
      super.remove(id);
    }, 200);
  };

  render() {
    const { notices } = this.state;
    let position = this.state.position;
    if (isUndefined(position)) {
      position = rtl ? 'topLeft' : 'topRight';
    }
    const prefixClsNotification = prefixCls ? `${prefixCls}-notification` : 'arco-notification';
    let transitionClass: string;
    if (position === 'topLeft' || position === 'bottomLeft') {
      transitionClass = 'slideNoticeLeft';
    } else {
      transitionClass = 'slideNoticeRight';
    }
    const classNames = cs(
      `${prefixClsNotification}-wrapper`,
      `${prefixClsNotification}-wrapper-${position}`,
      { [`${prefixClsNotification}-wrapper-rtl`]: rtl }
    );

    return (
      <div className={classNames}>
        <TransitionGroup component={null}>
          {notices.map((notice) => (
            <CSSTransition
              key={notice.id}
              timeout={{
                enter: 400,
                exit: 300,
              }}
              classNames={transitionClass}
              onExit={(e) => {
                e.style.height = `${e.scrollHeight}px`;
              }}
              onExiting={(e) => {
                e.style.height = 0;
              }}
              onExited={(e) => {
                e.style.height = 0;
                notice.onClose && notice.onClose();
              }}
            >
              <Notice
                {...notice}
                onClose={this.remove}
                prefixCls={prefixClsNotification}
                iconPrefix={prefixCls}
                noticeType="notification"
                rtl={rtl}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

notificationTypes.forEach((type) => {
  Notification[type] = (noticeProps: NotificationProps) => {
    return Notification.addInstance({
      ...noticeProps,
      type,
    });
  };
});

export default Notification;


// weappEcodesdk.asyncImport('758884759464861696', 'index').then(esm => esm.default.info({
//   closable: true,
//   title: 'Notification',
//   content: 'This is a notification!',
// }))