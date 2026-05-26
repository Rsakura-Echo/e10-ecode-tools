
//逻辑关系比较表达式
export const mathCompareOptions = [{ id: '1', content: '=', separator: false, disabled: false },
                            { id: '2', content: '!=',separator: false, disabled: false  },
                            { id: '3', content: '>',separator: false, disabled: false },
                            { id: '4', content: '>=',separator: false, disabled: false },
                            { id: '5', content: '<',separator: false, disabled: false },
                            { id: '6', content: '<=',separator: false, disabled: false }];
//步级表达式
export const stepCompareOptions= [{ id: '23', content: '本级', separator: false, disabled: false },{ id: '7', content: '向前', separator: false, disabled: false },{ id: '8', content: '向后',separator: false, disabled: false  }];

//逐级审批起始人表达式
export const startComPareOptions = [{ id: '9', content: '发起人', separator: false, disabled: false },
                             { id: '10', content: '指定人员',separator: false, disabled: false  },
                             { id: '11', content: '表单字段',separator: false, disabled: false }];

//条件单选表达式
export const conditionRadioOptions = [{id: '15',title: '',content: ''},
                               {id: '16',title: '',content: ''},
                               {id: '17',title: '',content: ''},
                               {id: '18',title: '',content: ''},
                               {id: '19',title: '',content: ''},
                               {id: '20',title: '',content: ''}];

//包含表达式
export const belongOptions = [{ id: '21', content: '属于', separator: false, disabled: false },{ id: '22', content: '不属于',separator: false, disabled: false  }]

//保留表达式
export const isKeepOptions = [{ id: '23', content: '保留', separator: false, disabled: false },{ id: '24', content: '不保留',separator: false, disabled: false  }]


//栅格的宽占比
export const titleGridWidth = 4;
export const contentGridWidth = 20;
//全局字体style
export const spanStyle = {};
export const spanClassName = 'cycleLabelClass';