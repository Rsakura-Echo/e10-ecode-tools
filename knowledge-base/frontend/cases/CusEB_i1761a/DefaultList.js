import { Icon } from '@weapp/ui';
import { middleware } from '@weapp/utils';
import React, { PureComponent } from 'react';
import { clsPrefix } from '../config/config';
import EmptyList from './EmptyList';

export default class DefaultList extends PureComponent<any, any> {
  onRowClick = (item: any) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(item);
    }
  };

  onExpand = (e: any, key: any) => {
    e.stopPropagation();
    this.props.onExpand(key);
  };

  render() {
    const {
      type, lineColumns, expandColumns, data, expandKey,
    } = this.props;

    const hasNotDefault = lineColumns.filter((item: any) => !item.isDefault).length > 0;

    if (data && data.length > 0) {
      if (expandColumns && expandColumns.length > 0) {
        return (
          <div className={`${clsPrefix}-business-list-default`}>
            <table>
              {data.map((item: any) => {
                const key = item.requestid || item.id;
                return (
                  <tr key={key} onClick={() => this.onRowClick(item)}>
                    <td>
                      <div className={`${clsPrefix}-business-list-default-line`}>
                        <div className={`${clsPrefix}-business-list-tag`} style={{ width: 20 }}>
                          {item.unread && (
                            <span className={`${clsPrefix}-business-list-tag-unread`} />
                          )}
                          {type === 'EmailList' && item.readStatus === 0 && (
                            <span className={`${clsPrefix}-business-list-tag-unread`} />
                          )}
                          {type === 'WorkflowList' && item.readMark === 1 && (
                            <span
                              className={`${clsPrefix}-business-list-tag-unread ${clsPrefix}-business-list-tag-workflow-${key}`}
                            />
                          )}
                          {type === 'WorkflowList' && item.readMark === 2 && (
                            <span
                              className={`${clsPrefix}-business-list-tag-feedback ${clsPrefix}-business-list-tag-workflow-${key}`}
                            />
                          )}
                          {type === 'TaskList' && !item.unread && item.newConment && (
                            <span className={`${clsPrefix}-business-list-tag-feedback`} />
                          )}
                        </div>
                        {expandColumns.length > 0 && (
                          <div
                            className={`${clsPrefix}-business-list-expand`}
                            style={{ width: 14 }}
                            onClick={(e: any) => this.onExpand(e, key)}
                          >
                            {expandKey === key ? (
                              <Icon
                                weId={`${this.props.weId || ''}_btxtf3@${key}`}
                                name="Icon-Down-arrow01"
                              />
                            ) : (
                              <Icon
                                weId={`${this.props.weId || ''}_ud3szq@${key}`}
                                name="Icon-Right-arrow01"
                              />
                            )}
                          </div>
                        )}
                        {lineColumns.map((item2: any) => {
                          let style: any = { width: item2.width };
                          if (item2.isAuto) {
                            if (hasNotDefault) {
                              style = { flex: 1, width: item2.width };
                            } else {
                              style = { flex: 1, width: '80px' };
                            }
                          }
                          return (
                            <div key={item2.dataIndex} style={style}>
                              {item2.bodyRender
                                ? item2.bodyRender(item, {}, item2.dataIndex)
                                : item[item2.dataIndex]}
                            </div>
                          );
                        })}
                      </div>
                      {expandColumns.length > 0 && (
                        <div
                          className={`${clsPrefix}-business-list-default-expand`}
                          style={{ display: expandKey === key ? 'block' : 'none' }}
                        >
                          <table>
                            {expandColumns.map((item2: any) => (
                              <tr key={item2.dataIndex}>
                                <td title={item2.title}>{item2.title}</td>
                                <td>
                                  {item2.bodyRender
                                    ? item2.bodyRender(item, {}, item2.dataIndex)
                                    : item[item2.dataIndex]}
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
      }

      return (
        <div className={`${clsPrefix}-business-list-default`}>
          <table>
            {data.map((item: any) => {
              const key = item.requestid || item.id;
              return (
                <tr key={key} onClick={() => this.onRowClick(item)}>
                  <td>
                    <div className={`${clsPrefix}-business-list-default-line`}>
                      <div className={`${clsPrefix}-business-list-tag`} style={{ width: 20 }}>
                        {item.unread && (
                          <span className={`${clsPrefix}-business-list-tag-unread`} />
                        )}
                        {type === 'EmailList' && item.readStatus === 0 && (
                          <span className={`${clsPrefix}-business-list-tag-unread`} />
                        )}
                        {type === 'WorkflowList' && item.readMark === 1 && (
                          <span
                            className={`${clsPrefix}-business-list-tag-unread ${clsPrefix}-business-list-tag-workflow-${key}`}
                          />
                        )}
                        {type === 'WorkflowList' && item.readMark === 2 && (
                          <span
                            className={`${clsPrefix}-business-list-tag-feedback ${clsPrefix}-business-list-tag-workflow-${key}`}
                          />
                        )}
                        {type === 'TaskList' && !item.unread && item.newConment && (
                          <span className={`${clsPrefix}-business-list-tag-feedback`} />
                        )}
                      </div>
                      {lineColumns.map((item2: any) => {
                        let style: any = { width: item2.width };
                        if (item2.isAuto) {
                          if (hasNotDefault) {
                            style = { flex: 1, width: item2.width };
                          } else {
                            style = { flex: 1, width: '80px' };
                          }
                        }
                        return (
                          <div key={item2.dataIndex} style={style}>
                            {item2.bodyRender
                              ? item2.bodyRender(item, {}, item2.dataIndex)
                              : item[item2.dataIndex]}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      );
    }

    return <EmptyList weId={`${this.props.weId || ''}_v0v83b`} data={data} />;
  }
}
