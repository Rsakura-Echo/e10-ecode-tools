import { Carousel } from '@weapp/ui';
import { middleware } from '@weapp/utils';
import React, { PureComponent } from 'react';
import { clsPrefix } from '../config/config';
import { getImgPath } from '../utils';
import EmptyList from './EmptyList';

export default class LeftImgList extends PureComponent<any, any> {
  state = {
    openKeys: [],
  };

  onRowClick = (item: any) => {
    this.setState((prevState: any) => {
      const _openKeys: any = prevState.openKeys;
      _openKeys.push(item.id);
      return { openKeys: [..._openKeys] };
    });

    if (this.props.onRowClick) {
      this.props.onRowClick(item);
    }
  };

  render() {
    const { lineColumns, data } = this.props;
    const _openKeys: any = this.state.openKeys;
    const hasNotDefault = lineColumns.filter((item: any) => !item.isDefault).length > 0;

    if (data && data.length > 0) {
      return (
        <div className={`${clsPrefix}-business-list-leftimg`}>
          <div className={`${clsPrefix}-business-list-leftimg-imgs`}>
            <Carousel
              weId={`${this.props.weId || ''}_shwv7a`}
              autoplay
              pagination={{ type: 'bullets' }}
            >
              {data.map((item: any) => {
                const temp = /<img[^>]+src=["']([^"']+)["']+/g.exec(item.summary);
                if (temp != null) {
                  return (
                    <img
                      key={item.id}
                      title={item.name}
                      src={temp[1].replace(/&amp;/g, '&')}
                      alt=""
                      onClick={() => this.onRowClick(item)}
                    />
                  );
                }
                return (
                  <img
                    key={item.id}
                    title={item.name}
                    src={getImgPath('business-coms/docdefaultleftimg.png')}
                    alt=""
                    onClick={() => this.onRowClick(item)}
                  />
                );
              })}
            </Carousel>
          </div>
          <div className={`${clsPrefix}-business-list-leftimg-list`}>
            <div className={`${clsPrefix}-business-list-default`}>
              <table>
                {data.map((item: any) => (
                  <tr key={item.id} onClick={() => this.onRowClick(item)}>
                    <td>
                      <div className={`${clsPrefix}-business-list-default-line`}>
                        <div className={`${clsPrefix}-business-list-leftimg-dot`}>
                          {_openKeys.includes(item.id) ? null : <span />}
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
                ))}
              </table>
            </div>
          </div>
        </div>
      );
    }

    return <EmptyList weId={`${this.props.weId || ''}_l1csms`} data={data} />;
  }
}
