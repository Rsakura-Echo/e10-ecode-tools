import { Table } from '@weapp/ui';
import { middleware } from '@weapp/utils';
import React, { PureComponent } from 'react';
import { clsPrefix } from '../config/config';
import EmptyList from './EmptyList';

@middleware('weappEbdcoms', 'BusinessTableList')
export default class TableList extends PureComponent<any, any> {
  onSort = (columns: any, sortColumn: any) => {
    if (this.props.onSort) {
      this.props.onSort(sortColumn);
    }
  };

  onRowClick = (item: any) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(item);
    }
  };

  render() {
    const { columns, data, isShowHead } = this.props;

    if (data && data.length > 0) {
      return (
        <div className={`${clsPrefix}-business-list-table`}>
          <Table
            weId={`${this.props.weId || ''}_vzg8wn`}
            columns={columns}
            data={data}
            isShowHead={isShowHead}
            onSort={this.onSort}
            onRowClick={this.onRowClick}
          />
        </div>
      );
    }

    return <EmptyList weId={`${this.props.weId || ''}_sbjm6w`} data={data} />;
  }
}
