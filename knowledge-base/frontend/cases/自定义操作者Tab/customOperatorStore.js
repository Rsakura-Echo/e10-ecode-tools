import { action, observable } from 'mobx';
import {mathCompareOptions,stepCompareOptions,belongOptions,startComPareOptions}  from './util/index';
import {customFieldConfig}  from './config/config';

class CustomOperatorStore {

    //操作者设置数据
     /**
       * 数据结构设计
       * {
       * approveStartOpertor:{selectVal:1,fieldVal:1}//逐级审批人
       * approveLevel:2//审批层级。
       * endCondition:1//单选
       * condition1:{selectVal:1,fieldVal:2}//条件1
       * condition2:{selectVal:1,fieldVal:2}//条件2
       * condition3:{selectVal:1,fieldVal:{selectVal:1,fieldVal:2},isKeep:24}//条件3
       * condition4:{selectVal:1,fieldVal:2}//条件4
       * condition5:{selectVal:1,fieldVal:2,selectVal2:1,fieldVal2:2}//条件5
       * condition6:{selectVal:1,fieldVal:{selectVal:1,fieldVal:2,fieldVal2:3}}//条件6
       * exceptionData:{isOpen:1,nodeid:2}//异常处理逻辑
       * }
       * 
      */
    @observable operatorData:any = {
      approveStartOpertor:{},
      approveLevel:'',
      endCondition:'',
      condition1:{},
      condition2:{},
      condition3:{},
      condition4:{},
      condition5:{},
      condition6:{},
      exceptionData:{}
    };


    scope='';//安全级别

    //原始数据，用于后续condition拼接显示
    rawData={};



    @action('设置安全级别')
    setScope=(otherItems=[])=>{
      otherItems.map(item=>{
        if(item?.itemType == "SCOPE"){
          const {allowMinLevel=-999,allowMaxLevel=999} = item?.otherParams;
          this.scope=allowMinLevel+"~"+allowMaxLevel;
        }
      })
      
    }

    @action('初始化操作者数据，用于编辑回显')
    initOperatorData=(data)=>{
      let editExtendData = JSON.parse(data);
      let oldOperatorData = editExtendData?.operatorData;
      if(oldOperatorData.endCondition == '15'){
        oldOperatorData['condition1'] = oldOperatorData.condition;
      }else if(oldOperatorData.endCondition == '16'){
        oldOperatorData['condition2'] = oldOperatorData.condition;
      }else if(oldOperatorData.endCondition == '17'){
        oldOperatorData['condition3'] = oldOperatorData.condition;
      }else if(oldOperatorData.endCondition == '18'){
        oldOperatorData['condition4'] = oldOperatorData.condition;
      }else if(oldOperatorData.endCondition == '19'){
        oldOperatorData['condition5'] = oldOperatorData.condition;
      }else if(oldOperatorData.endCondition == '20'){
        oldOperatorData['condition6'] = oldOperatorData.condition;
      }
      delete oldOperatorData.condition;
      this.operatorData = oldOperatorData;
      console.log("initOperatorData",this.operatorData);
    }

    @action('封装操作者设置数据')
    setOperatorData = (data,key,operateKey,componentType) => {
      let _data = this.operatorData[key] || {};
      
      if('approveLevel' == key || 'endCondition' == key){
        _data = data;
      }else if('condition3' == key || 'condition6' == key){
        if('fieldSelect' == operateKey){
          //自定义字段下拉框选择
          _data['selectVal'] = data;
          //自定义字段下拉框数据一改变，必须清空后续关联数据
          _data['fieldVal'] = {};
        }else if('fieldValCompareSelect' == operateKey){
          //自定义字段值比较下拉框选择
          let fieldVal = _data['fieldVal'] || {};
          fieldVal['selectVal'] = data;
          _data['fieldVal'] = fieldVal;
        }else if('fieldValSelect' == operateKey || 'fieldVal2' == operateKey){
          //自定义字段值选择
          let fieldVal = _data['fieldVal'] || {};
          if('fieldVal2'==operateKey){
            fieldVal['fieldVal2'] = data;
          }else{
            fieldVal['fieldVal'] = data;
          }
          _data['fieldVal'] = fieldVal;
        }else if('isKeep' == operateKey){
          //是否保留 满足条件时的审批人
          _data['isKeep'] = data;
        }
      }else{
        if('approveStartOpertor' == key && 'selectVal' == operateKey){
          //下拉框切换，清空fieldval
          _data['fieldVal'] = undefined;
        }
        else if('exceptionData' == key && 'isOpen' == operateKey && !data){
          //关闭异常处理节点开关时，清空掉节点Id数据
          _data['nodeid'] = undefined;
        }
        _data[operateKey] = data;        
      }
      this.operatorData[key] = _data;

      this.operatorData = JSON.parse(JSON.stringify(this.operatorData));
    }

    @action('重置参数')
    reset=()=>{
      this.operatorData={};
      this.scope='';
    }
    
    /**
     * 必填校验
     */
    @action('必填校验')
    checkExtendData = ()=>{
      const {approveStartOpertor={},approveLevel='',endCondition='',condition1={},condition2={},condition3={},condition4={},condition5={},condition6={},exceptionData={}} = this.operatorData; 
      const {selectVal='',fieldVal=[]} = approveStartOpertor;

      //逐级审批人校验
      if(selectVal=='' || (selectVal!='9'&&fieldVal.length==0)){
        return '逐级审批起始人不能为空';
      }

      //条件校验
      if(endCondition=='' && approveLevel==''){
        return '审批层级和结束条件必须设置其中一个！';
      }

      let tipMsg = '';
      if(endCondition=='15'&&!this.checkCondition(condition1,'1')){
        tipMsg = '条件1必要信息不完整，请确认';
      }else if(endCondition=='16'&&!this.checkCondition(condition2,'2')){
        tipMsg = '条件2必要信息不完整，请确认';
      }else if(endCondition=='17'&&!this.checkCondition(condition3,'3')){
        tipMsg = '条件3必要信息不完整，请确认';
      }else if(endCondition=='18'&&!this.checkCondition(condition4,'4')){
        tipMsg = '条件4必要信息不完整，请确认';
      }else if(endCondition=='19'&&!this.checkCondition(condition5,'5')){
        tipMsg = '条件5必要信息不完整，请确认';
      }else if(endCondition=='20'&&!this.checkCondition(condition6,'6')){
        tipMsg = '条件6必要信息不完整，请确认';
      }

      //异常处理校验
      const {isOpen=false,nodeid=[]} = exceptionData;
      if(isOpen&&nodeid.length==0){
        tipMsg = '请选择异常处理需要流转的节点';
      }
      if(""==tipMsg){
        //校验通过，执行清空动作
        this.reset(); 
      }
      console.log("tipMsg",tipMsg);
      return tipMsg;
    }

    /**
     * 条件值校验
     */
    checkCondition=(conditionData,type)=>{
      let isCheckPass = false;
      const {selectVal,fieldVal,selectVal2,fieldVal2} = conditionData;
      if(type=='1'&&selectVal&&selectVal!=''&&fieldVal&&fieldVal!=''){
        isCheckPass = true;
      }else if((type=='2' || type=='4')&&selectVal&&selectVal!=''&&this.isArray(fieldVal)&&fieldVal.length>0){
        isCheckPass = true;
      }else if((type=='3' || type=='6')&&selectVal&&selectVal!=''&&fieldVal&&
              fieldVal.selectVal&&fieldVal.selectVal!=''&&((this.isArray(fieldVal.fieldVal)&&fieldVal.fieldVal.length>0)||(fieldVal.fieldVal&&fieldVal.fieldVal!=''))
              &&(type=='3'||(type=='6'&&fieldVal.fieldVal2&&fieldVal.fieldVal2!=''))){
        isCheckPass=true;
      }else if(type=='5'&&selectVal&&selectVal!=''&&this.isArray(fieldVal)&&fieldVal.length>0&&selectVal2&&selectVal2!=''&&fieldVal2&&fieldVal2!=''){
        isCheckPass=true;
      }
      return isCheckPass;
    }

    /**
     * 打包JSON数据
     */
    packageNewOperatorData=()=>{
      let newOperatorData={};
      const {approveStartOpertor={},approveLevel='',endCondition='',exceptionData={}} = this.operatorData;
  
      //1.逐级审批起始人
      newOperatorData['approveStartOpertor'] = {selectVal:approveStartOpertor['selectVal'],fieldVal:this.simplifyData(approveStartOpertor['fieldVal'])};
      //2.审批层级
      newOperatorData['approveLevel'] = approveLevel;
      //3.结束条件
      newOperatorData['endCondition'] = endCondition;
      this.setCondition(newOperatorData,endCondition);
      //4.异常处理
      newOperatorData['exceptionData'] = {isOpen:exceptionData?.isOpen,nodeid:exceptionData?.nodeid}

      console.log("newOperatorData",newOperatorData);
      // return JSON.stringify(newOperatorData);
      return newOperatorData;
    }


    /**
     * 是否是数组
     */
    isArray = (obj) =>{
      if(!obj) return false;
      return obj instanceof Array;
    }

    /**
     * 数据瘦身
     */
    simplifyData = (fieldVal) => {
      let isArray = this.isArray(fieldVal);
      // console.log("simplifyData_fieldVal",fieldVal,"isArray",isArray);
      if(isArray){
        let simplifyData = [];
        fieldVal.map(item=>{
          let param = {id:item.id,name:item.name};
          if(item.avatar){
            param['avatar'] = item.avatar;
          }
          if(item.icon){
            param['icon'] = item.icon;
          }
          simplifyData.push(param);
        })
        return simplifyData;
      }
      return fieldVal;
    }

    /**
     * 抽出选中的条件数据
     */
    setCondition=(newOperatorData,endCondition)=>{
      if(endCondition=='15'){
        newOperatorData['condition'] = this.operatorData?.condition1 || {};
      }else if(endCondition=='16'){
        let condition2 = this.operatorData?.condition2 || {};
        newOperatorData['condition'] = {selectVal:condition2?.selectVal,fieldVal:this.simplifyData(condition2?.fieldVal)};
      }else if(endCondition=='17'){
        let condition3 = this.operatorData?.condition3 || {};
        newOperatorData['condition'] = {selectVal:condition3?.selectVal,fieldVal:{selectVal:condition3?.fieldVal?.selectVal,fieldVal:this.simplifyData(condition3?.fieldVal?.fieldVal)},isKeep:condition3?.isKeep||'24'};
      }else if(endCondition=='18'){
        let condition4 = this.operatorData?.condition4 || {};
        newOperatorData['condition'] = {selectVal:condition4?.selectVal,fieldVal:this.simplifyData(condition4?.fieldVal)};
      }else if(endCondition=='19'){
        let condition5 = this.operatorData?.condition5 || {};
        newOperatorData['condition'] = {selectVal:condition5?.selectVal,fieldVal:this.simplifyData(condition5?.fieldVal),selectVal2:condition5?.selectVal2,fieldVal2:condition5?.fieldVal2};
      }else if(endCondition=='20'){
        let condition6 = this.operatorData?.condition6 || {};
        newOperatorData['condition'] = {selectVal:condition6?.selectVal,fieldVal:{selectVal:condition6?.fieldVal?.selectVal,fieldVal:this.simplifyData(condition6?.fieldVal?.fieldVal),fieldVal2:condition6?.fieldVal?.fieldVal2}};
      }else {
        newOperatorData['condition'] = {};
      }
    }

    /**
     * 浏览那妞数据格式抽出ID数据
     */
    getIds=(fieldVal)=>{
      let ids = [];
      if(this.isArray(fieldVal)){
        fieldVal.map(item=>{
          ids.push(item.id);
        })
      }
      return ids;
    }
    
    /**
     * 封装条件中文显示数据
     */
    packageConditionData=()=>{
      /**
       * 数据结构设计
       * {
       * approveStartOpertor:{selectVal:1,fieldVal:1}//逐级审批人
       * approveLevel:2//审批层级。
       * endCondition:1//单选
       * condition1:{selectVal:1,fieldVal:2}//条件1
       * condition2:{selectVal:1,fieldVal:2}//条件2
       * condition3:{selectVal:1,fieldVal:{selectVal:1,fieldVal:2}}//条件3
       * condition4:{selectVal:1,fieldVal:2}//条件4
       * condition5:{selectVal:1,fieldVal:2,selectVal2:1,fieldVal2:2}//条件5
       * condition6:{selectVal:1,fieldVal:{selectVal:1,fieldVal:2,fieldVal2:3}}//条件6
       * exceptionData:{isOpen:1,nodeid:2}//异常处理逻辑
       * }
       * 
      */
      const {endCondition='',condition1={},condition2={},condition3={},condition4={},condition5={},condition6={}} = this.operatorData;
      if(endCondition == ''){
        return '';
      }
      let customFieldOption=[];
      let fieldTypeData = {};
      let customOptionData = {};
      if(endCondition=='17' || endCondition=='20'){
        customFieldConfig.map((item,index)=>{
          let option={id:item.fieldId,content:item.fieldName,separator:false,disabled:false};
          customFieldOption.push(option);
          fieldTypeData[item.fieldId]=item.fieldType;
          if(item.fieldType=='4'){
            customOptionData[item.fieldId]=item.options;
          }
        });
      }

      let conditionContent = '';
      if(endCondition == '15'){
        conditionContent += '当前审批人的职级（安全级别）'+this.getSelectShowName(condition1?.selectVal,mathCompareOptions)+condition1?.fieldVal;
      }else if(endCondition == '16'){
        conditionContent += '当前审批人的岗位'+this.getSelectShowName(condition2?.selectVal,belongOptions)+this.getFieldShowName(condition2?.fieldVal);
      }else if(endCondition == '17'){
        conditionContent += '当前审批人的人员卡片字段【'+this.getSelectShowName(condition3?.selectVal,customFieldOption,true)+"】";
        if(fieldTypeData[condition3?.selectVal]=='1' || fieldTypeData[condition3?.selectVal]=='2'){
          //浏览按钮
          conditionContent += this.getSelectShowName(condition3?.fieldVal?.selectVal,belongOptions)+this.getFieldShowName(condition3?.fieldVal?.fieldVal);
        }else if(fieldTypeData[condition3?.selectVal]=='4'){
          //下拉框
          conditionContent += this.getSelectShowName(condition3?.fieldVal?.selectVal,mathCompareOptions)+this.getSelectShowName(condition3?.fieldVal?.fieldVal,customOptionData[condition3?.selectVal],true);
        }else {
          //数值
          conditionContent += this.getSelectShowName(condition3?.fieldVal?.selectVal,mathCompareOptions)+condition3?.fieldVal?.fieldVal;
        }
      }else if(endCondition == '18'){
        conditionContent += '当前审批人'+this.getSelectShowName(condition4?.selectVal,belongOptions)+this.getFieldShowName(condition4?.fieldVal);
      }else if(endCondition == '19'){
        // conditionContent += '当前审批人'+this.getSelectShowName(condition5?.selectVal,belongOptions)+"【"+this.getFieldShowName(condition5?.fieldVal,true)+"】表单字段里的人员时，需"+this.getSelectShowName(condition5?.selectVal2,stepCompareOptions)+"审批"+condition5?.fieldVal2+"个层级";
        conditionContent += '当前审批人'+this.getSelectShowName(condition5?.selectVal,belongOptions)+"【"+this.getFieldShowName(condition5?.fieldVal,true)+"】表单字段里的人员时，"+(condition5?.selectVal2=='23'?'需本级审批':'需'+this.getSelectShowName(condition5?.selectVal2,stepCompareOptions)+"审批"+condition5?.fieldVal2+"个层级");
      }else if(endCondition == '20'){
        conditionContent += '当发起人的人员卡片字段【'+this.getSelectShowName(condition6?.selectVal,customFieldOption,true)+"】";
        if(fieldTypeData[condition6?.selectVal]=='1' || fieldTypeData[condition6?.selectVal]=='2'){
          //浏览按钮
          conditionContent += this.getSelectShowName(condition6?.fieldVal?.selectVal,belongOptions)+this.getFieldShowName(condition6?.fieldVal?.fieldVal);
        }else if(fieldTypeData[condition6?.selectVal]=='4'){
          //下拉框
          conditionContent += this.getSelectShowName(condition6?.fieldVal?.selectVal,mathCompareOptions)+this.getSelectShowName(condition6?.fieldVal?.fieldVal,customOptionData[condition6?.selectVal],true);
        }else {
          //数值
          conditionContent += this.getSelectShowName(condition6?.fieldVal?.selectVal,mathCompareOptions)+condition6?.fieldVal?.fieldVal;
        }
        conditionContent += "时，需向上审批"+condition6?.fieldVal?.fieldVal2+"个层级";
      }
      console.log("conditionContent",conditionContent);
      return conditionContent;
    }

    /**
     * 获取浏览按钮字段显示值
     */
    getFieldShowName=(fieldVal,noBrackets)=>{
      if(!this.isArray(fieldVal)){
        return '';
      }
      let fieldShowName = [];
      fieldVal.map(item=>{
        fieldShowName.push(item.name);
      })
      if(noBrackets){
        return fieldShowName.join();
      }
      return "("+fieldShowName.join()+")";
    }

    /**
     * 获取下拉框显示值
     */
    getSelectShowName=(selectVal,options,noSpace)=>{
      let content = '';
      if(this.isArray(options)){
        for(let i=0;i<options.length;i++){
          let item = options[i];
          if(item?.id == selectVal){
            content = item?.content;
            break;
          }
        }
      }
      if(noSpace){
        return content;
      }
      return " "+content+" ";
    }

    /**
     * 封装自定义名称
     */
    packageItemName=()=>{
      const {approveStartOpertor={}} = this.operatorData;
      const {selectVal,fieldVal}=approveStartOpertor;
      let content = this.getSelectShowName(selectVal,startComPareOptions,true);
      content += this.getFieldShowName(fieldVal,false);
      content += "(所有上级)";
      return content;
    }


    @action('获取封装的JSON数据')
    getExtendData = ()=>{
      let extendData = {itemName:this.packageItemName(),endApproversCondition:this.packageConditionData(),itemLevel:this.scope,level:this.scope,signOrder:'2',signOrderCN:'依次逐个处理',operatorData:this.packageNewOperatorData()};
      console.log('extendData',extendData);
      return extendData;
    }

}
export default CustomOperatorStore;
