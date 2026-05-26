// import stores from '../../stores/';
import * as mobx from 'mobx';
import { getLabel } from '@weapp/utils';

let currentStore = {};
/**
 获取拥有下级节点的第一个父级节点
 */
export const getFirstParentHaveNext = (id = '', freeNodeDatas = {}) => {
    let res;
    if (id != null && id != '') {
        let obj = getFreeObjById(id, freeNodeDatas) || {};
        if (obj.hasNext) {
            res = obj;
        } else {
            res = getFirstParentHaveNext(obj.parentid);
        }
    }
    return res;
}
/**
 检测当前节点或者分支是否是流转过
 nodeEntity.isPassed
 */
export const checkCurrentNodeIsPassed = (data = {}, nextNode = {}) => {
    const {nodeElement = false, nodeEntity = {}, groupStatus} = data;

    let currentNodeIsPassed = false;
    if (nodeElement) {
        const {nodeStatus = '0'} = nodeEntity;
        currentNodeIsPassed = nodeStatus != '0' ? true : currentNodeIsPassed;
    } else {
        /**
         //0: 未处理  1：当前组  2：已处理 3 : 线条需要前红后黑 节点显示绿色
         //流转时判断使用
         */
        let _res = checkCurrentBranchIsPassed(data);
        currentNodeIsPassed = _res ? _res : currentNodeIsPassed;
        // let nextParr = nextNode.parallelNodeGroupDatas || [];
        // let pass = false;
        // nextParr.map(v=>{ //如果下个分支中存在节点退回
        //     if(v.nodeEntity.nodeStatus == '3'){
        //         pass = true;
        //     }
        // });
        // currentNodeIsPassed = (groupStatus == '2' || pass) ? true : false;
    }
    return currentNodeIsPassed;
};
const checkCurrentBranchIsPassed = (data = {}) => {
    const {nodeElement = false, nodeEntity = {}, parallelNodeGroupDatas = []} = data;
    let currentNodeIsPassed = false;
    parallelNodeGroupDatas.map(v => {
        if (v.nodeElement) {
            const {nodeEntity = {}} = v;
            const {nodeStatus = '0'} = nodeEntity;
            currentNodeIsPassed = nodeStatus != '0' ? true : currentNodeIsPassed;
        } else {
            currentNodeIsPassed = checkCurrentBranchIsPassed(v);
        }
    });
    return currentNodeIsPassed;
}
/**
 通过传入id 获取到当前对象中的指定位置对象
 可设置data查询范围
 */
export const getFreeObjById = (id = '', data) => {
    const {workflowNewDesignStore = {}} = currentStore;
    const {wfFreeDatas = {}} = workflowNewDesignStore;
    data = data || wfFreeDatas;

    let freeObj = null;
    if (data.id && data.id == id) {
        freeObj = data;
    }
    if (data.hasNext) {
        let res = getFreeObjById(id, data.next);
        freeObj = res ? res : freeObj;
    }
    if (data.parallelNodeGroupDatas && data.parallelNodeGroupDatas.length > 0) {
        data.parallelNodeGroupDatas.map(v => {
            let res = getFreeObjById(id, v);
            freeObj = res ? res : freeObj;
        })
    }
    return freeObj;
}
/**
 检测在传入data对象中是否存在id为传入id的对象
 */
export const isExistThisElement = (id = '', data) => {
    const {workflowNewDesignStore = {}} = currentStore;
    const {wfFreeDatas = {}} = workflowNewDesignStore;
    data = data || wfFreeDatas;

    let result = false;
    if (id.indexOf('virtual') > -1) {
        id = id.split('_')[0];
    }
    if (id == data.id) {
        result = true;
    } else {
        if (data.hasNext) {
            let _result = isExistThisElement(id, data.next);
            result = _result ?  _result : '';

        }
        if (!data.nodeElement) {
            data.parallelNodeGroupDatas.map(v => {
                let _result = isExistThisElement(id, v);
                result = _result ? _result : '';
            })
        }
    }
    return result;
}
/**
 获取数据的上一节点
 */
export const getLastObjById = (id = '', data = {}) => {
    let lastObj = null;

    if (data.hasNext) {
        if (data.next.id == id) {
            lastObj = data;
        } else {
            let res = getLastObjById(id, data.next);
            lastObj = res ? res : lastObj;
        }
    }
    if (!data.nodeElement) {
        let parallelArr = data.parallelNodeGroupDatas || [];
        parallelArr.map(v => {
            let res = getLastObjById(id, v);
            lastObj = res ? res : lastObj;
        })
    }
    return lastObj;
}
/**
 获取当前对象的point数据
 */
export const getCurrentElementPoint = (data = {}, wfFreeDatasPoints = {}, pointIndex = '') => {
    let resPoint, curPts = wfFreeDatasPoints[pointIndex];
    if (data.nodeElement) {
        resPoint = {};
        for (let key in curPts) {
            let id_arr = key.split('_');
            let _id = id_arr[0];
            if (id_arr[0] == 'resource' || id_arr[0] == 'subcom' || id_arr[0] == 'group' || id_arr[0] == 'dept') {
                _id = _id + '_' + id_arr[1];
            }
            if (_id == data.id) {
                resPoint = curPts[key];
            }
        }
    } else {
        resPoint = [];
        for (let key in curPts) {
            let id_arr = key.split('_');
            let _id = id_arr[0];
            if (_id == data.id) {
                if (key.indexOf('_branch_') > -1) {
                    resPoint[0] = curPts[key];
                }
                if (key.indexOf('_merge_') > -1) {
                    resPoint[1] = curPts[key];
                }
            }
        }
    }

    return resPoint;
}
/**
 获取当前分支中的分支嵌套层级
 */
export const getElementBranchLevel = (branch = {}, element = {}) => {
    const {workflowNewDesignStore = {}} = currentStore;
    const {wfFreeDatas} = workflowNewDesignStore;

    let level = 1;
    if (element.parentid == branch.id) {
        level = 1;
    } else {
        let parent = getFreeObjById(element.parentid, wfFreeDatas);
        if (parent && element.parentid) {
            let _level = getElementBranchLevel(branch, parent);
            level += _level;
        }
    }
    return level;

}

//判断节点编辑属性
export const checkEditRight = (element = {}, judgeCommonParams = {}) => {
    const {isReadOnlyModel} = judgeCommonParams;
    //只读模板
    if (isReadOnlyModel) return true;
    const {nodeChartEntity = {}} = element;
    const {edit = false} = nodeChartEntity;
    return !edit;
}

/**
 * 超时设置数据合理性校验
 * @param nodeEntity
 * @param curValue
 */
export const judgeRemindTime = (nodeEntity = {} ,curValue ,fieldKey, form) => {
    let _curVlaue = nodeEntity[fieldKey];
    nodeEntity[fieldKey] = curValue;

    const {advanceRemind = 0,overflowtimetype = 0, overflowtimehour = 0, overflowtimeminute = 0} = nodeEntity;
    //当前设置不超时时重置所有当前节点超时设置
    if(fieldKey == 'overflowtimetype' && overflowtimetype == '0') {
        let resetOverflowTimeSetting  = {
            overtimeToNextOperator:'0',
            afterLoopRemind:'0',
            afterRemindInterval:'5',
            beforeLoopRemind:'0',
            beforeRemindInterval:'5',
            advanceRemind:'0',
            overflowtimehour:0,
            overflowtimeminute:0,
            overflowtimedate:''
        }
        form.updateFields({advanceRemind:'0', overflowtimehour:0, overflowtimeminute:0, overflowtimedate:'',}, false);
        return resetOverflowTimeSetting;
    } else {
        // let _advanceRemind = toNumber(advanceRemind);
        // let _overflowtimetype = toNumber(overflowtimetype);

        // let needTips = [0, 1, 2].indexOf(_overflowtimetype) < 0 && _advanceRemind > _overflowtimetype;
        // if (!needTips) needTips = _overflowtimetype == 1 && _advanceRemind > (toNumber(overflowtimehour) * 60 + toNumber(overflowtimeminute));
        // if (!needTips) needTips = _overflowtimetype == 0 && _advanceRemind != 0;
        // if (needTips) {
        //     message.warning(getLabel(506879,'超时时间未设置或设置的超时时间小于提前提醒时间！'),5);
        // }
    }
    return {};
}

/**
 * 获取本分支最后一个group
 * @param element
 * @return {*}
 */
export const getBranchLastGroup = (element = {}) =>{
    const {next = {},hasNext = false} = element;
    if(hasNext) {
        return getBranchLastGroup(next);
    } else {
        return element;
    }
}

export const  getPosition =  (dot1, dot2, angle) => {
  var x1 = dot1.x;
  var y1 = dot1.y;
  var x2 = dot2.x;
  var y2 = dot2.y;
  var PI = Math.PI;

  // 两点间的x轴夹角弧度
  var xAngle=Math.atan2((y2-y1), (x2-x1));
  // 转为角度
  xAngle = 360*xAngle/(2*PI);
  // 两点间的长度
  var L=Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
  // 计算等腰三角形斜边长度
  var L2 = L/2 / Math.cos(angle* 2*PI/360);

  // 求第一个顶点坐标，位于下边
  var val1={};
  // 求第二个顶点坐标，位于上边
  var val2={};
  val1['x']=x1+Math.round(L2 * Math.cos((xAngle+angle)* 2*PI/360));
  val1['y']=y1+Math.round(L2 * Math.sin((xAngle+angle)* 2*PI/360));
  val2['x']=x1+Math.round(L2 * Math.cos((xAngle-angle)* 2*PI/360));
  val2['y']=y1+Math.round(L2 * Math.sin((xAngle-angle)* 2*PI/360));
  return [val1,val2];
}

//绘制带圆弧的线条
export const drawArcLine = (lineStartPos1,lineArcPos,lineEndPos4, arcAngle,adjustPosValue) => {
    var adjustValue = 10;
    if(!!adjustPosValue && adjustPosValue < adjustValue) adjustValue = adjustPosValue; 
    //  整体的出发点start 
    var startM = 'M' + lineStartPos1.x+' ' + lineStartPos1.y;
    if(lineArcPos.y == lineEndPos4.y) {
        if(lineArcPos.y > lineStartPos1.y) {
            if(lineStartPos1.x < lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x, y:lineArcPos.y - adjustValue };
                var lineArcPosEnd = {x: lineArcPos.x + adjustValue, y:lineArcPos.y };
            } else if(lineStartPos1.x == lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x, y:lineArcPos.y };
                var lineArcPosEnd = {x: lineArcPos.x , y:lineArcPos.y };
            } else {
                var lineArcPosStart = {x: lineArcPos.x, y:lineArcPos.y - adjustValue };
                var lineArcPosEnd = {x: lineArcPos.x - adjustValue, y:lineArcPos.y };
            }
        } else { 
            if(lineStartPos1.x < lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x, y:lineArcPos.y + adjustValue };
                var lineArcPosEnd = {x: lineArcPos.x + adjustValue, y:lineArcPos.y };
            } else if(lineStartPos1.x == lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x, y:lineArcPos.y  };
                var lineArcPosEnd = {x: lineArcPos.x , y:lineArcPos.y };
            } else {
                var lineArcPosStart = {x: lineArcPos.x, y:lineArcPos.y + adjustValue};
                var lineArcPosEnd = {x: lineArcPos.x - adjustValue, y:lineArcPos.y };
            }
        }
    } else if(lineArcPos.y == lineStartPos1.y) {
        if(lineArcPos.y < lineEndPos4.y) {
            if(lineStartPos1.x < lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x - adjustValue, y:lineArcPos.y};
                var lineArcPosEnd = {x: lineArcPos.x, y:lineArcPos.y + adjustValue };
            } else if(lineStartPos1.x ==  lineEndPos4.x){
                var lineArcPosStart = {x: lineArcPos.x , y:lineArcPos.y};
                var lineArcPosEnd = {x: lineArcPos.x, y:lineArcPos.y  };
            } else {
                var lineArcPosStart = {x: lineArcPos.x + adjustValue, y:lineArcPos.y };
                var lineArcPosEnd = {x: lineArcPos.x , y:lineArcPos.y + adjustValue};
            }
        } else {
            if(lineStartPos1.x < lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x - adjustValue, y:lineArcPos.y };
                var lineArcPosEnd = {x: lineArcPos.x, y:lineArcPos.y - adjustValue };
            } else if( lineStartPos1.x ==  lineEndPos4.x) {
                var lineArcPosStart = {x: lineArcPos.x , y:lineArcPos.y };
                var lineArcPosEnd = {x: lineArcPos.x, y:lineArcPos.y  };
            }else {
                var lineArcPosStart = {x: lineArcPos.x + adjustValue, y:lineArcPos.y };
                var lineArcPosEnd = {x: lineArcPos.x, y:lineArcPos.y - adjustValue};
            }
        }
    }
   

     //直线连接到圆弧的起点yuanStart 然后链接圆弧
    var startL =  'L' + lineArcPosStart.x+' ' + lineArcPosStart.y;      
   
    // 画弧形
    var pos = getPosition(lineArcPosStart, lineArcPosEnd, arcAngle || 40);//这个控制点有上下两个，可以都试一下
    if(lineArcPos.y == lineEndPos4.y) {
        if(lineArcPos.y > lineStartPos1.y) {
            if(lineStartPos1.x < lineEndPos4.x) {
                var arcQ =' '+ 'Q' + pos[0]['x']+' ' + pos[0]['y'];
            } else {
                var arcQ =' '+ 'Q' + pos[1]['x']+' ' + pos[1]['y'];
            }
        } else {
            if(lineStartPos1.x < lineEndPos4.x) {
                var arcQ =' '+ 'Q' + pos[1]['x']+' ' + pos[1]['y'];
            } else {
                var arcQ =' '+ 'Q' + pos[0]['x']+' ' + pos[0]['y'];
            }
        }
    } else if(lineArcPos.y == lineStartPos1.y) {
        if(lineArcPos.y < lineEndPos4.y) {
            if(lineStartPos1.x < lineEndPos4.x) {
                var arcQ =' '+ 'Q' + pos[1]['x']+' ' + pos[1]['y'];
            } else {
                var arcQ =' '+ 'Q' + pos[0]['x']+' ' + pos[0]['y'];
            }
        } else {
            if(lineStartPos1.x < lineEndPos4.x) {
                var arcQ =' '+ 'Q' + pos[0]['x']+' ' + pos[0]['y'];
            } else {
                var arcQ =' '+ 'Q' + pos[1]['x']+' ' + pos[1]['y'];
            }
        }
    }
        arcQ +=' '+ lineArcPosEnd.x+' ' + lineArcPosEnd.y;
    // 确定尾
    var endL = 'L'+lineEndPos4.x + ' ' + lineEndPos4.y;
    return [startM , startL ,arcQ , endL].join(' ')

}