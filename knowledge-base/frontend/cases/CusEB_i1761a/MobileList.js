import { MAvatar } from '@weapp/ui';
import { dayjs, getLabel, middleware } from '@weapp/utils';
import React, { PureComponent } from 'react';
import { clsPrefix } from '../config/config';
import EmptyList from './EmptyList';

export default class MobileList extends PureComponent<any, any> {
  onRowClick = (item: any) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(item);
    }
  };

  render() {
    const { type, lineFields, data } = this.props;

    if (data && data.length > 0) {
      return (
        <div className={`${clsPrefix}-business-list-mobile`}>
          <ul>
            {data.map((item: any) => (
              <li key={item.id} onClick={() => this.onRowClick(item)}>
                <div className={`${clsPrefix}-business-list-mobile-avatar`}>
                  <MAvatar
                    weId={`${this.props.weId || ''}_8chl1e@${item.id}`}
                    name={item.manager || ''}
                  />
                </div>
                <div className={`${clsPrefix}-business-list-mobile-infos`}>
                  <div className={`${clsPrefix}-business-list-mobile-title`}>
                    {item.unread && (
                      <span className={`${clsPrefix}-business-list-mobile-tag-unread`} />
                    )}
                    {type === 'TaskList' && !item.unread && item.newConment && (
                      <span className={`${clsPrefix}-business-list-mobile-tag-feedback`} />
                    )}
                    {type === 'WorkflowList' && item.readMark === 1 && (
                      <span className={`${clsPrefix}-business-list-mobile-tag-unread`} />
                    )}
                    {type === 'WorkflowList' && item.readMark === 2 && (
                      <span className={`${clsPrefix}-business-list-mobile-tag-feedback`} />
                    )}
                    {type === 'WorkflowList' ? (
                      <span className={`${clsPrefix}-business-list-mobile-name`}>
                        <span className={`${clsPrefix}-business-list-mobile-workflow-requestname`}>
                          <span dangerouslySetInnerHTML={{ __html: item.requestnamehtml }} />
                          {!item.requestnameTitle && item.requestmark && (
                            <span
                              className={`${clsPrefix}-business-list-mobile-workflow-requestmark`}
                            >
                              {item.requestmark}
                            </span>
                          )}
                        </span>
                        {item.copy && (
                          <span className={`${clsPrefix}-business-list-mobile-workflow-copy`}>
                            {getLabel('71246', '抄')}
                          </span>
                        )}
                        {item.agent && (
                          <span
                            className={`${clsPrefix}-business-list-mobile-workflow-agent`}
                            title={getLabel('71315', '委托')}
                          >
                            {getLabel('71316', '委')}
                          </span>
                        )}
                        {item.isbereject === 1 && (
                          <span
                            className={`${clsPrefix}-business-list-mobile-workflow-bereject`}
                            title={getLabel('71420', '退回')}
                          >
                            {getLabel('71421', '退')}
                          </span>
                        )}
                        {item.userOverTime && item.overdue && (
                          <span className={`${clsPrefix}-business-list-mobile-workflow-overtime`}>
                            {item.userOverTime}
                          </span>
                        )}
                        {item.userOverTime && !item.overdue && (
                          <span className={`${clsPrefix}-business-list-mobile-workflow-overtime2`}>
                            {item.userOverTime}
                          </span>
                        )}
                      </span>
                    ) : (
                      <div className={`${clsPrefix}-business-list-mobile-name`}>
                        <span className={`${clsPrefix}-business-list-mobile-name2`}>
                          {item.name}
                        </span>
                      </div>
                    )}
                    {lineFields.includes('createTime') && (
                      <div className={`${clsPrefix}-business-list-mobile-time`}>
                        <span>{dayjs(item.createTime).format('YYYY-MM-DD')}</span>
                      </div>
                    )}
                  </div>
                  {(lineFields.includes('manager')
                    || lineFields.includes('currentnode')
                    || lineFields.includes('percentFinished')) && (
                    <div className={`${clsPrefix}-business-list-mobile-manager`}>
                      <span>{lineFields.includes('manager') ? item.manager : ''}</span>
                      {lineFields.includes('currentnode') && (
                        <span className={`${clsPrefix}-business-list-mobile-currentnode`}>
                          {item.currentnode}
                        </span>
                      )}
                      {lineFields.includes('percentFinished') && (
                        <span className={`${clsPrefix}-business-list-mobile-percentFinished`}>
                          {item.percentFinished}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (data && data.length === 0) {
      return <EmptyList weId={`${this.props.weId || ''}_dw277w`} data={data} />;
    }

    return <div style={{ height: 100 }} />;
  }
}
