import { CorsComponent } from '@weapp/ui';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import BusinessList from './business-coms/SyncBusinessList';
import {
  expandColumns,
  getRequestData,
  lineColumns,
  searchCategorys,
  getMobileData,
  getMobileLineFields
} from './cfolder/fields';
import {clsPrefix} from './config/config'

class ViewContent extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    props.getInstance(this);
  }

  listRef: React.RefObject<any> = React.createRef();

  state = {
    addVisible: false,
    viewId: '',
    viewVisible: false,
  };

  onGoto = () => {
    const { config = {} } = this.props;
    const { searchModel, searchCategory = [], searchConditions = [] } = config;

    let url = '/doc';
    if (searchModel === 'category') {
      searchCategorys.forEach((item: any) => {
        if (item.id === searchCategory && item.url) {
          url = item.url;
        }
      });
    } else if (searchModel === 'condition') {
      searchConditions.forEach((item: any) => {
        if (item.type === 'customFolders' && item.value && item.value.length > 0) {
          url = `/doc/knowledge/${item.value[0].id}/${window?.TEAMS?.currentUser?.id}`;
        }
      });
    }

    if (window.weappLayout) {
      this.props.history.push(url);
    } else {
      window.open(url);
    }
  }

  onAdd = () => {
    this.setState({ addVisible: true });
  }

  onAddClose = () => {
    this.setState({ addVisible: false });
    this.listRef.current.onLoadConfig();
  }

  onView = (item: any) => {
    this.setState({ viewId: item.id, viewVisible: true });
  }

  onViewClose = () => {
    this.setState({ viewId: '', viewVisible: false });
    this.listRef.current.onLoadConfig();
  }

  onPrev = () => {
    this.listRef.current.onPrev();
  }

  onNext = () => {
    this.listRef.current.onNext();
  }

  onSkip = (pageNo: number) => {
    this.listRef.current.onSkip(pageNo);
  }

  onPaginationChange = (pagination: any) => {
    this.props.onPaginationChange(pagination);
  };

  render() {
    const { addVisible, viewId, viewVisible } = this.state;
    return (
      <div  className={`${clsPrefix}-business-list-content content`}>
        {
          addVisible && (
            <CorsComponent
              weId={`${this.props.weId || ''}_v09pea`}
              app="@weapp/doc"
              compName="DocDetailProvider"
              id=""
              placement="middle"
              height={document.body.clientHeight - 60}
              top={null}
              params={{
                folderId: '300',
                contentType: 'html',
              }}
              visible={addVisible}
              onClose={this.onAddClose}
            />
          )
        }
        {
          viewVisible && (
            <CorsComponent
              weId={`${this.props.weId || ''}_2iojdo`}
              app="@weapp/doc"
              compName="DocDetailProvider"
              id={viewId}
              placement="middle"
              height={document.body.clientHeight - 60}
              top={null}
              visible={viewVisible}
              onClose={this.onViewClose}
            />
          )
        }
        <BusinessList
          weId={`${this.props.weId || ''}_8047qn`}
          ref={this.listRef}
          type="DocumentList"
          config={this.props.config}
          lineColumns={lineColumns}
          expandColumns={expandColumns}
          requestUrl="/api/doc/documentelement/queryList.json"
          requestMethod="post"
          getRequestData={getRequestData}
          onRowClick={this.onView}
          onPaginationChange={this.onPaginationChange}
          showType={this.props.showType}
          isMobile={this.props.isMobile}
          getMobileLineFields={getMobileLineFields}
          getMobileData={getMobileData}
        />
      </div>
    );
  }
}

export default withRouter(ViewContent);
