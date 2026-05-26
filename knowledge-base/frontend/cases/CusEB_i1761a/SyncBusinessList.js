import { Spin } from '@weapp/ui';
import { request } from '@weapp/utils';
import React from 'react';
import filterEvent from '../comEvent';
import { clsPrefix } from '../config/config';
// import './BusinessList.less';
import EmptyList from './EmptyList';
import DefaultList from './DefaultList';
import LeftImgList from './LeftImgList';
import MobileList from './MobileList';
import TableList from './TableList';
import {deepEqual,setTimeoutOnce} from '../utils';

export default class BusinessList extends React.PureComponent<any, any> {
  state = {
    loading: true,
    pageNo: 1,
    pageSize: 5,
    data: null,
    expandKey: '',
    lineColumns: [],
    expandColumns: [],
    dataSet:{}
  };

  componentDidMount() {
    this.onLoadConfig();
    if (this.props.type === 'CustomerList') {
      filterEvent.on('filter', this.props.id, (params: any) => {
        const {
          type,
          config = {},
          lineColumns,
          expandColumns,
          requestUrl,
          requestMethod,
        } = this.props;
        const { pageNo = 1, pageSize = 5, listStyle } = config;
        const { filter = {}, searchConditions = [], showFields = [] } = params;

        const formData = new FormData();
        const queryStr: any = { pageNo, pageSize };
        queryStr.filter = filter;
        queryStr.conditions = searchConditions.map((ci: any) => {
          const item = { ...ci };
          // 标签字段特殊处理，升级后原来标签字段拆分为个人标签和公共标签
          if (item.id === 'tag_my' || item.id === 'tag_common') {
            item.id = 'tag';
          }
          if (
            item.type === 'select'
            || item.type === 'Select'
            || item.type === 'RadioBox'
            || item.type === 'CheckBox'
          ) {
            item.type = 'array';
            if (item.value instanceof Array) {
              item.value = item.value.join(',');
            }
          }
          if (item.type === 'date' || item.type === 'DateComponent') {
            if (item.value instanceof Array) {
              item.value = item.value.join('~');
            }
          }
          if (
            item.type === 'employee'
            || item.type === 'sharer'
            || item.type === 'department'
            || item.type === 'browser'
          ) {
            item.type = 'array';
            if (item.value instanceof Array) {
              item.value = item.value.map((i: any) => i.id).join(',');
            }
          }
          if (item.type === 'progress') {
            item.type = 'string';
          }
          if (item.type === 'number' || item.type === 'NumberComponent' || item.type === 'Money') {
            item.type = 'number';
            item.compareNumber = item.value;
          }
          return item;
        });
        const customConditions = searchConditions.filter((item: any) => item.id.startsWith('custom_'));
        queryStr.customConditions = customConditions.map((ci: any) => {
          const item = { ...ci, id: ci.id.split('_')[1] };
          if (item.type === 'Select' || item.type === 'RadioBox' || item.type === 'CheckBox') {
            if (item.value instanceof Array) {
              item.value = item.value.join(',');
            }
          }
          if (item.type === 'DateComponent') {
            if (item.value instanceof Array) {
              item.value = item.value.join('~');
            }
          }
          if (item.type === 'Employee' || item.type === 'Department') {
            if (item.value instanceof Array) {
              item.value = item.value.map((i: any) => i.id).join(',');
            }
          }
          return item;
        });
        formData.append('queryStr', JSON.stringify(queryStr));
        const requestData = formData;

        if (listStyle === 'table') {
          const _lineColumns: any = [];
          for (let i = 0, len = showFields.length; i < len; i++) {
            _lineColumns.push(
              ...lineColumns.filter((item: any) => item.dataIndex === showFields[i]),
            );
          }

          this.setState(
            {
              lineColumns: _lineColumns,
              loading: true,
            },
            () => {
              request({
                url: requestUrl,
                method: requestMethod,
                data: requestData,
              }).then((result: any) => {
                this.onResultSet(type, pageNo, pageSize, result);
                this.setState({ loading: false });
              });
            },
          );
        } else {
          const _expandColumns: any = [];
          for (let i = 0, len = showFields.length; i < len; i++) {
            _expandColumns.push(
              ...expandColumns.filter((item: any) => item.dataIndex === showFields[i]),
            );
          }

          this.setState(
            {
              expandColumns: _expandColumns,
              loading: true,
            },
            () => {
              request({
                url: requestUrl,
                method: requestMethod,
                data: requestData,
              }).then((result: any) => {
                this.onResultSet(type, pageNo, pageSize, result);
                this.setState({ loading: false });
              });
            },
          );
        }
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (!deepEqual(prevProps.config, this.props.config)) {
      this.onLoadConfig();
    }
  }

  onLoadConfig = () => {
    const { pageNo = 1 } = this.state;
    const { config = {}, lineColumns, expandColumns } = this.props;
    const { listStyle, pageSize = 5, showFields = {} } = config;
    const { lineFields = [], expandFields = [] } = showFields;
    const _lineColumns: any = [];
    if (listStyle === 'table') {
      _lineColumns.push({
        title: '',
        dataIndex: '',
        width: '50px',
        className: `${clsPrefix}-business-list-table-index`,
        bodyRender: (data: any, pos: any) => pos.row + 1,
      });
    }
    for (let i = 0, len = lineFields.length; i < len; i++) {
      _lineColumns.push(...lineColumns.filter((item: any) => item.dataIndex === lineFields[i]));
    }

    const _expandColumns: any = [];
    for (let i = 0, len = expandFields.length; i < len; i++) {
      _expandColumns.push(
        ...expandColumns.filter((item: any) => item.dataIndex === expandFields[i]),
      );
    }

    this.setState(
      {
        lineColumns: _lineColumns,
        expandColumns: _expandColumns,
      },
      () => {
        this.onLoadData(pageNo, pageSize);
      },
    );
  };

  onLoadData = (pageNo: number, pageSize: number, sortColumn?: any, callback?: any) => {
    // 传递过来的数据可能是字符串类型
    if (typeof pageNo === 'string') {
      pageNo = Number(pageNo);
    }
    if (typeof pageSize === 'string') {
      pageSize = Number(pageSize);
    }

    this.setState({ loading: true, pageNo, pageSize });
    this.props.onPaginationChange({ loading: true });

    const {
      type, config = {}, requestUrl, requestMethod, getRequestData,
    } = this.props;
    const {
      listStyle, orderFields, searchModel, searchCategory, searchConditions,
    } = config;
    let requestData = {};

    if (getRequestData) {
      requestData = getRequestData({ pageNo, pageSize, config });
    } else {
      const formData = new FormData();
      const queryStr: any = { pageNo, pageSize };

      if (sortColumn) {
        queryStr.orderBy = sortColumn.orderKey;
        queryStr.orderWay = sortColumn.orderType;
      } else if (listStyle !== 'table' && orderFields && orderFields.length > 0) {
        queryStr.orderBy = orderFields[0].id;
        queryStr.orderWay = orderFields[0].orderWay === '0' ? 'asc' : orderFields[0].orderWay;
      }

      if (searchModel === 'category') {
        queryStr.filter = { type: searchCategory };
      } else {
        queryStr.filter = { type: 'all' };
      }

      if (searchModel === 'condition') {
        queryStr.conditions = searchConditions.map((ci: any) => {
          const item = { ...ci };
          // 标签字段特殊处理，升级后原来标签字段拆分为个人标签和公共标签
          if (item.id === 'tag_my' || item.id === 'tag_common') {
            item.id = 'tag';
          }
          if (
            item.type === 'select'
            || item.type === 'Select'
            || item.type === 'RadioBox'
            || item.type === 'CheckBox'
          ) {
            item.type = 'array';
            if (item.value instanceof Array) {
              item.value = item.value.join(',');
            }
          }
          if (item.type === 'date' || item.type === 'DateComponent') {
            if (item.value instanceof Array) {
              item.value = item.value.join('~');
            }
          }
          if (
            item.type === 'employee'
            || item.type === 'sharer'
            || item.type === 'department'
            || item.type === 'browser'
          ) {
            item.type = 'array';
            if (item.value instanceof Array) {
              item.value = item.value.map((i: any) => i.id).join(',');
            }
          }
          if (item.type === 'progress') {
            item.type = 'string';
          }
          if (item.type === 'number' || item.type === 'NumberComponent' || item.type === 'Money') {
            item.type = 'number';
            item.compareNumber = item.value;
          }
          return item;
        });

        const customConditions = searchConditions.filter((item: any) => item.id.startsWith('custom_'));
        queryStr.customConditions = customConditions.map((ci: any) => {
          const item = { ...ci, id: ci.id.split('_')[1] };
          if (item.type === 'Select' || item.type === 'RadioBox' || item.type === 'CheckBox') {
            if (item.value instanceof Array) {
              item.value = item.value.join(',');
            }
          }
          if (item.type === 'DateComponent') {
            if (item.value instanceof Array) {
              item.value = item.value.join('~');
            }
          }
          if (item.type === 'Employee' || item.type === 'Department') {
            if (item.value instanceof Array) {
              item.value = item.value.map((i: any) => i.id).join(',');
            }
          }
          return item;
        });
      }

      formData.append('queryStr', JSON.stringify(queryStr));
      requestData = formData;
    }

    request({
      url: requestUrl,
      method: requestMethod,
      data: requestData,
    }).then((result: any) => {
      if (type === 'EmailList') {
        const { total = 0, displayData: data = [] } = result.data || {};
        const hasPre = Math.ceil(total / pageSize) > 1 && pageNo > 1;
        const hasNext = pageNo < Math.ceil(total / pageSize);
        this.setState({ loading: false, data });
        this.onPaginationChang(pageNo, pageSize, total, data, hasPre, hasNext);
      } else if (type === 'WorkflowList') {
        const { total = 0, displayData: data = [] } = result.data || {};
        const hasPre = Math.ceil(total / pageSize) > 1 && pageNo > 1;
        const hasNext = pageNo < Math.ceil(total / pageSize);
        // 请求的不是第一页，并且无数据的情况下，跳转到第一页
        if (pageNo > 1 && data.length === 0) {
          this.onSkip(1);
        } else {
          this.setState({ loading: false, data });
          this.onPaginationChang(pageNo, pageSize, total, data, hasPre, hasNext);
        }
      } else if (type === 'DocumentList') {
        const { totalCount: total = 0, result: data = [], hasPre } = result.resultMap?.page || {};
        const hasNext = data.length === pageSize; // 文档查询统计数有性能问题，如果返回数据和设置显示条数一致，认为有下一页
        this.setState({ loading: false, data });
        this.onPaginationChang(pageNo, pageSize, total, data, hasPre, hasNext);
        // 文档未读状态单独获取
        if (data && data.length > 0) {
          const docids = data.map((item: any) => item.id);
          request({
            url: '/api/doc/documentelement/queryListStatus.json',
            method: 'get',
            params: { ids: docids.join(',') },
          }).then((res: any) => {
            const { data: status = {} } = res || {};
            const newdata = data.map((item: any) => ({ ...item, ...status[item.id] }));
            this.setState({ data: newdata });
          });
        }
      } else if (type === 'FormDataList') {
        const { totalCount: total = 0, result: data = [], hasPre } = result.page || {};
        const hasNext = data.length === pageSize; // 业务表单查询统计数有性能问题，如果返回数据和设置显示条数一致，认为有下一页
        this.setState({ loading: false, data });
        this.onPaginationChang(pageNo, pageSize, total, data, hasPre, hasNext);
      } else {
        this.onResultSet(type, pageNo, pageSize, result);
      }
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  onResultSet = (type: any, pageNo: any, pageSize: any, result: any) => {
    const {
      totalCount: total = 0, result: data = [], hasPre, hasNext,
    } = result.page || {};
    // 请求的不是第一页，并且无数据的情况下，跳转到第一页
    if (pageNo > 1 && data.length === 0) {
      this.onSkip(1);
    } else {
      this.setState({ loading: false, data });
      this.onPaginationChang(pageNo, pageSize, total, data, hasPre, hasNext);
    }
  };

  onPaginationChang = (
    pageNo: number,
    pageSize: number,
    totalCount: number,
    data: any,
    hasPre: boolean,
    hasNext: boolean,
  ) => {
    this.props.onPaginationChange({
      loading: false,
      pageNo,
      hasPre,
      hasNext,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      startIndex: (pageNo - 1) * pageSize + 1,
      endIndex: (pageNo - 1) * pageSize + data.length,
    });
  };

  onPrev = () => {
    const { pageNo, pageSize } = this.state;
    if (pageNo > 1) {
      this.onLoadData(pageNo - 1, pageSize, null, () => {
        this.setState({ expandKey: '' });
      });
    }
  };

  onNext = () => {
    const { pageNo, pageSize } = this.state;
    this.onLoadData(pageNo + 1, pageSize, null, () => {
      this.setState({ expandKey: '' });
    });
  };

  onSkip = (pageNo: number) => {
    const { pageSize } = this.state;
    this.onLoadData(pageNo, pageSize);
  };

  onSort = (sortColumn: any) => {
    const { pageNo, pageSize, lineColumns } = this.state;
    const _lineColumns = lineColumns.map((column: any) => {
      const item = { ...column };
      if (item.orderKey === sortColumn.orderKey) {
        item.orderType = sortColumn.orderType;
      } else {
        item.orderType = '';
      }
      return item;
    });
    this.setState({ lineColumns: _lineColumns });
    this.onLoadData(pageNo, pageSize, sortColumn);
  };

  onRowClick = (item: any) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(item);
    }
    // 去除未读标识
    setTimeoutOnce(() => {
      const { data = [] } = this.state;
      const _data = data
        && data.map((item2: any) => {
          if (this.props.type === 'WorkflowList') {
            if (item2.requestid === item.requestid) {
              item2.readMark = 0;
            }
          } else if (item2.id === item.id) {
            item2.unread = false;
          }
          return item2;
        });
      this.setState({ data: _data });
    }, 500);
  };

  onExpand = (key: any) => {
    const { expandKey } = this.state;
    if (expandKey === key) {
      this.setState({ expandKey: '' });
    } else {
      this.setState({ expandKey: key });
    }
  };

  onMView = (url: any) => {
    if (window?.weappEmJssdk?.checkJsApi('unListen')) {
      window?.weappEmJssdk?.invoke('unListen', { event: 'listenVisible' });
    }
    if (window?.weappEmJssdk?.checkJsApi('listenVisible')) {
      window?.weappEmJssdk?.invoke('listenVisible', {
        callback: (res: any) => {
          if (res.visible === true) {
            this.onLoadConfig();
          }
        },
      });
    }
    if (window?.weappEmJssdk?.checkJsApi('openLink')) {
      window?.weappEmJssdk?.invoke('openLink', { url, openType: 2 });
    } else {
      window.open(url);
    }
  };

  render() {
    const { isMobile, type, config = {} } = this.props;
    const { listStyle, showFields = {} } = config;
    const { lineFields = [] } = showFields;
    const {
      loading, lineColumns, expandColumns, data, expandKey,
    } = this.state;

    if (lineColumns.length < 1) {
      return null;
    }

    // @ts-ignore
    if (data && data.length === 0) {
      return <EmptyList weId={`${this.props.weId || ''}_0b34vl`} data={data} />;
    }

    if (isMobile) {
      return (
        <Spin weId={`${this.props.weId || ''}_50bg8c`} spinning={loading}>
          <MobileList
            weId={`${this.props.weId || ''}_zcj97t`}
            type={type}
            loading={loading}
            lineFields={this.props.getMobileLineFields(lineFields)}
            data={data ? this.props.getMobileData(data) : null}
            onRowClick={this.onRowClick}
          />
        </Spin>
      );
    }

    if (listStyle === 'table') {
      return (
        <Spin weId={`${this.props.weId || ''}_uxvn33`} spinning={loading}>
          <div className={`${clsPrefix}-business-list`}>
            <TableList
              weId={`${this.props.weId || ''}_nnor8f`}
              type={type}
              columns={lineColumns}
              data={data}
              onSort={this.onSort}
              onRowClick={this.onRowClick}
            />
          </div>
        </Spin>
      );
    }
    if (listStyle === 'leftimg') {
      return (
        <Spin weId={`${this.props.weId || ''}_s7wjuz`} spinning={loading}>
          <div className={`${clsPrefix}-business-list`}>
            <LeftImgList
              weId={`${this.props.weId || ''}_lcdotg`}
              type={type}
              lineColumns={lineColumns}
              expandColumns={expandColumns}
              data={data}
              onRowClick={this.onRowClick}
            />
          </div>
        </Spin>
      );
    }

    return (
      <Spin weId={`${this.props.weId || ''}_nmnlrw`} spinning={loading}>
        <div className={`${clsPrefix}-business-list`}>
          <DefaultList
            weId={`${this.props.weId || ''}_658uh6`}
            type={type}
            lineColumns={lineColumns}
            expandColumns={expandColumns}
            data={data}
            expandKey={expandKey}
            onRowClick={this.onRowClick}
            onExpand={this.onExpand}
          />
        </div>
      </Spin>
    );
  }
}
