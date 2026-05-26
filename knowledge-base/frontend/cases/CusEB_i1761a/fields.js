import { DatePicker } from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import React from 'react';

const { getLocaleDate } = DatePicker;

export const mobileFields = [
  {
    id: 'name',
    name: getLabel('53866', '名称'),
    type: 'string',
    fixed: true,
  },
  { id: 'manager', name: getLabel('53867', '负责人'), type: 'employee' },
  { id: 'createTime', name: getLabel('53868', '创建时间'), type: 'date' },
];

export const lineFields = [
  {
    id: 'name',
    name: getLabel('53866', '名称'),
    type: 'string',
    width: '300px',
    fixed: true,
    default: true,
  },
  {
    id: 'manager',
    name: getLabel('53867', '负责人'),
    type: 'employee',
    width: '90px',
    default: true,
  },
  {
    id: 'createTime',
    name: getLabel('53868', '创建时间'),
    type: 'date',
    width: '120px',
    default: true,
  },
];

export const expandFields = lineFields;

export const orderFields = [
  { id: 'name', name: getLabel('53866', '名称') },
  { id: 'manager', name: getLabel('53867', '负责人') },
  { id: 'create_time', name: getLabel('53868', '创建时间') },
  { id: 'last_update_time', name: getLabel('53876', '更新时间') },
  { id: 'last_comment_time', name: getLabel('53877', '反馈时间') },
];

export const lineColumns = lineFields.map((item) => {
  const column: any = {
    title: item.name,
    dataIndex: item.id,
    width: item.width,
    isAuto: item.fixed,
    isDefault: !!item.default,
  };

  if (item.type === 'employee') {
    column.bodyRender = (data: any, pos: any, name: any) => {
      name = name === 'manager' ? 'creator' : item.id;
      return (
        <span title={data[name] && data[name].username}>{data[name] && data[name].username}</span>
      );
    };
  } else if (item.type === 'date') {
    column.bodyRender = (data: any, pos: any, name: any) => (
      <span title={data[name] && getLocaleDate(data[name])}>
        {data[name] && getLocaleDate(data[name])}
      </span>
    );
  } else if (item.type === 'browser') {
    column.bodyRender = (data: any, pos: any, name: any) => (
      <span title={data[name] && data[name].name}>{data[name] && data[name].name}</span>
    );
  } else {
    column.bodyRender = (data: any, pos: any, name: any) => (
      <span title={data[name]}>{data[name]}</span>
    );
  }

  return column;
});

export const expandColumns = lineColumns;

export const searchModels = [
  { id: '0', content: getLabel('40502', '请选择') },
  { id: 'category', content: getLabel('53881', '按类型搜索') },
  { id: 'condition', content: getLabel('53882', '按条件搜索') },
  // { id: 'entity', content: getLabel('54612', '按实体搜索') },
];

export const searchCategorys = [
  {
    id: 'mine',
    content: getLabel('54613', '我的文档'),
    url: `/doc/knowledge/300/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'mineManager',
    content: getLabel('54614', '我负责的文档'),
    url: `/doc/knowledge/300/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'mineParticipants',
    content: getLabel('54615', '我参与的文档'),
    url: `/doc/knowledge/300/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'shareout',
    content: getLabel('54616', '我分享的文档'),
    url: `/doc/knowledge/shareout/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'watched',
    content: getLabel('54617', '我关注的文档'),
    url: `/doc/knowledge/watched/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'subordinates',
    content: getLabel('54618', '我下属的文档'),
    url: `/doc/knowledge/subordinates/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'mineCreate',
    content: getLabel('54619', '我创建的文档'),
    url: `/doc/knowledge/300/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'shareToMe',
    content: getLabel('54620', '共享给我的文档'),
    url: `/doc/knowledge/shareToMe/${window?.TEAMS?.currentUser?.id}`,
  },
  {
    id: 'all',
    content: getLabel('54621', '我全部的文档'),
    url: `/doc/knowledge/all/${window?.TEAMS?.currentUser?.id}`,
  },
];

export const searchFields = [
  { id: 'author', content: getLabel('53867', '负责人'), type: 'employee' },
  { id: 'creator', content: getLabel('53875', '创建人'), type: 'employee' },
  { id: 'create_time', content: getLabel('53868', '创建时间'), type: 'date' },
  { id: 'last_update_time', content: getLabel('53876', '更新时间'), type: 'date' },
  { id: 'folder', content: getLabel('54265', '文件夹'), type: 'customFolders' },
];

export const getRequestData = (params: any) => {
  const { pageNo, pageSize, config } = params;
  const {
    orderFields: _orderFields,
    searchModel: _searchModel,
    searchCategory: _searchCategory,
    searchConditions: _searchConditions,
  } = config;

  const formData = new FormData();
  const queryStr: any = { pageNo, pageSize };

  if (_orderFields && _orderFields.length > 0) {
    queryStr.order = {
      property: _orderFields[0].id,
      direction: _orderFields[0].orderWay === '0' ? 'ASC' : _orderFields[0].orderWay.toUpperCase(),
    };
  }

  if (_searchModel === 'category') {
    if (_searchCategory === 'mine') {
      queryStr.filter = { type: 'mineMgrAndPart' };
    } else {
      queryStr.filter = { type: _searchCategory };
    }
  } else {
    queryStr.filter = { type: 'all' };
  }

  if (_searchModel === 'condition') {
    queryStr.conditions = _searchConditions.map((ci: any) => {
      const item = { ...ci };
      if (item.type === 'select') {
        item.type = 'array';
        if (item.value instanceof Array) {
          item.value = item.value.join(',');
        }
      }
      if (item.type === 'date') {
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
      if (item.type === 'customFolders') {
        item.type = 'folder';
        if (item.value instanceof Array) {
          item.value = item.value.map((i: any) => i.id).join(',');
        }
      }
      return item;
    });
  }

  if (_searchModel === 'entity') {
    const { docs = [] } = config;
    const docIds = docs.map((item: any) => item.id);
    formData.append('entityFlag', 'true');
    formData.append('docIds', docIds.join(','));
  }

  formData.append('queryStr', JSON.stringify(queryStr));

  return formData;
};

export const getMobileData = (data: any) => data.map((item: any) => ({
  id: item.id,
  name: item.name,
  unread: item.unread,
  manager: item.creator.username,
  createTime: item.createTime,
}));

export const getMobileLineFields = (_lineFields: any) => _lineFields.map((item: any) => item);

export default {};
