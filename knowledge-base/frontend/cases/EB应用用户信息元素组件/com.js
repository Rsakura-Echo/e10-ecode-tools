
import React from 'react';

const prefixCls = `ebapp-ecode-com-userinfo`;

export default class Com extends React.Component {


  render() {
    return <div className={prefixCls}>
      <div className={`${prefixCls}-left`}>
        <div className={`${prefixCls}-logo`}>
          <img src={""}/>
        </div>
        <div className={`${prefixCls}-username`}>
          {window.TEAMS.currentUser.username}
        </div>
      </div>
      <div className={`${prefixCls}-right`}>
        <div className={`${prefixCls}-infolist`}>
          <div className={`${prefixCls}-infoitem`}>
            <div className={`${prefixCls}-lebal`}>手机号</div>
            <div className={`${prefixCls}-content`}>{window.TEAMS.currentUser.mobile}</div>
          </div>
          <div className={`${prefixCls}-infoitem`}>
            <div className={`${prefixCls}-lebal`}>当前租户</div>
            <div className={`${prefixCls}-content`}>{window.TEAMS.currentTenant.tenantName}</div>
          </div>
          <div className={`${prefixCls}-infoitem`}>
            <div className={`${prefixCls}-lebal`}>当前租户Key</div>
            <div className={`${prefixCls}-content`}>{window.TEAMS.currentTenant.tenantKey}</div>
          </div>
        </div>
      </div>
    </div>
  }

}
