/**
 * callEsbFlow(esbFlowId, mainParams, detailParams)
 *
 * esbFlowId: 动作流模块创建的动作流 ID 主键
 * mainParams: 主表参数对象
 * detailParams: 明细参数二维数组
 */
const esbFlowId = "1586999223341314049";

const mainParams = {
  name: "张三",
  sex: "男",
  idCardNumber: "340123198503625026"
};

const detailParams = [
  [{ learningExperience: "1996/09/01-1999/07/30就读于清华大学附属中学-初中部" }],
  [{ learningExperience: "1999/09/01-2002/07/30就读于清华大学附属中学-高中部" }],
];

ebdfpageSDK.callEsbFlow(esbFlowId, mainParams, detailParams).then(res => {
  // ...
});
