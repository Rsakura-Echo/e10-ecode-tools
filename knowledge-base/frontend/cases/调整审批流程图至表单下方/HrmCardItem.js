import React from 'react';
import { MouseEventHandler } from 'react';
import { HrmCard, Icon } from '@weapp/ui';
import PropTypes from 'prop-types';


const openOperateGroup = (operateParams: operateParamsType, rootUrl: string) => {
    const { workflowId, nodeId, groupId, module } = operateParams;
    return triggerFun(module, FunName.openWfOperatorGroup, () => {
        let url = `/${rootUrl}/workflow/pathset/${workflowId}/nodeset/${nodeId}/${groupId}/openViewOperator`
        window.open(url);
    }, [workflowId,nodeId,groupId]);
}

const { openHrmCard } = HrmCard;
export default class HrmCardItem extends React.Component<any> {
    static contextTypes = {
        moduleConfig: PropTypes.any,
    }
    openHrmCard: MouseEventHandler<HTMLAnchorElement> = (e) => {
        const { item, isAgent } = this.props;
        let useId = '';
        if (isAgent) {
            useId = item.beAgentUserId;
        } else {
            useId = item.userId;
        }
        openHrmCard(e, useId, 'inside', 'bs/hrm')
    }

    //打开操作组链接
    openOperateGroup = () => {
        const { item } = this.props;
        let passParams = {
            workflowId: item.workflowId,
            nodeId: item.nodeId,
            groupId: item.id,
            module: this.context.moduleConfig?.module  
        }
        openOperateGroup(passParams, 'sp');
    }
    render() {
        const { item, isAgent = false, signIcon = false,cellInfo, isSpecial=false } = this.props;
        let name = isAgent ? item.beAgentUserName : item.userName;
        let isRobotNode = cellInfo.nodeType == '7' ||  cellInfo.nodeTypeI == '7' || item.userId == '0';
        return (
            <>
                {
                    !item.groupName ? (
                        (!isRobotNode) ? <a className='item' onClick={this.openHrmCard} >{`${name} `}</a> : <span className="robot-operator">{`${name} `}</span>
                    )
                        : <span className='item' onClick={this.openOperateGroup}>{item.groupName}</span>
                }
                {
                    !isSpecial && item.hasOwnProperty('showStatusName') && item['showStatusName'] != '' && <span className='operate-status-span'> {` ${item.showStatusName}`}</span>
                }
                { signIcon  && <span className="add-sign-icon"><Icon weId={`${this.props.weId || ''}_mw5x8w`} name="Icon-jointly-sign" size={'xxs'}/></span>}
            </>
        )
    }
}