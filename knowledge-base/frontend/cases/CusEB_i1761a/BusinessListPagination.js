import { Button, Input } from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import React, { PureComponent } from 'react';
import { clsPrefix } from './config/config';

const { InputNumber } = Input;

export default class BusinessListPagination extends PureComponent<any, any> {
  state = {
    pagination: {
      loading: false,
      pageNo: 1,
      hasPre: false,
      hasNext: false,
      totalCount: 0,
      totalPages: 0,
      startIndex: 0,
      endIndex: 0,
    },
  };

  onNext = () => {
    const { pagination } = this.state;
    if (pagination.hasNext) {
      this.props.onNext();
    }
  }

  onPrev = () => {
    const { pagination } = this.state;
    if (pagination.hasPre) {
      this.props.onPrev();
    }
  }

  onSkip = () => {
    const { pagination } = this.state;
    const { pageNo, totalPages } = pagination;
    if (pageNo <= totalPages && pageNo > 0) {
      this.props.onSkip(pageNo);
    }
  }

  onPageNoChange = (pageNo: any) => {
    const { pagination } = this.state;
    this.setState({ pagination: { ...pagination, pageNo } });
  }

  onPaginationChange = (pagination: any) => {
    this.setState((state: any) => ({
      pagination: { ...state.pagination, ...pagination },
    }));
  }

  render() {
    const { config = {}, params = {} } = this.props;
    const { listStyle } = config;
    const { add, goto } = params;

    const { pagination } = this.state;
    const {
      loading,
      pageNo,
      hasPre,
      hasNext,
      totalCount,
      startIndex,
      endIndex,
    } = pagination;
    console.log('1111')
    return (
      <div className={`${clsPrefix}-business-list-pagination ${this.props.className}`}>
        {
          listStyle === 'table' && totalCount > 0 && (
            <span className={`${clsPrefix}-business-list-pagination-total`}>
              <span>
                <span>{getLabel('53931', '当前第')} {startIndex} {getLabel('53932', '到')} {endIndex} {getLabel('53933', '条')}</span>
                <span style={{ marginLeft: 10 }}>{getLabel('53934', '共')} {totalCount} {getLabel('53933', '条')}</span>
              </span>
              <span className={`${clsPrefix}-business-list-pagination-skip`}>
                <span>{getLabel('53935', '转到')}</span>
                <span>
                  <InputNumber
                    weId={`${this.props.weId || ''}_bf5rr7`}
                    hideOps
                    style={{ textAlign: 'center' }}
                    value={pageNo}
                    onChange={this.onPageNoChange}
                  />
                </span>
                <span>{getLabel('53936', '页')}</span>
                <span>
                  <Button weId={`${this.props.weId || ''}_5txoms`} type="default" onClick={this.onSkip}>
                    <span>{getLabel('40565', '确定')}</span>
                  </Button>
                </span>
              </span>
            </span>
          )
        }
        {
          add && (
            <span>
              <Button weId={`${this.props.weId || ''}_u0g302`} type="default" onClick={add.onClick}>
                <span>{add.title}</span>
              </Button>
            </span>
          )
        }
        <span className={`${clsPrefix}-business-list-pagination-flip`}>
          <span>
            <Button weId={`${this.props.weId || ''}_uki5v8`} type="default" disabled={loading || !hasPre} onClick={this.onPrev}>
              <span>{getLabel('53938', '上一页')}</span>
            </Button>
          </span>
          <span>
            <Button weId={`${this.props.weId || ''}_stzy80`} type="default" disabled={loading || !hasNext} onClick={this.onNext}>
              <span>{getLabel('53939', '下一页')}</span>
            </Button>
          </span>
        </span>
        {
          goto && (
            <span>
              <Button weId={`${this.props.weId || ''}_3k5x1q`} type="default" onClick={goto.onClick}>
                <span>{goto.title}</span>
              </Button>
            </span>
          )
        }
      </div>
    );
  }
}
