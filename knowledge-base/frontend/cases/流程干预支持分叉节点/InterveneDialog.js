import { Dialog,Button,Spin} from '@weapp/ui';
import {observer} from 'mobx-react';


const tableId = '991406695388897281';       //建模主表id
const detailTableId = '991406777068773377'; //建模明细表表id

const zzsp1 = '991407313948073985'          //正在审批下拉框字段为‘是’对应数据id
const zzsp0 = '991407313948073986'          //正在审批下拉框字段为‘是’对应数据id


const sfjs1 = '991407313948073987'          //是否结束下拉框字段为‘是’对应数据id
const sfjs0 = '991407313948073988'          //是否结束下拉框字段为‘是’对应数据id



const nodeTableId = '991834268157698048';   //节点建模表id
const layoutid='991433826873466881';        //布局id

@observer
export default class InterveneDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      rowData:{},
      reload:false,
      dataid:""
    }
  }

  componentDidMount = ()=>{
    window.$interveneDialogThis = this;
  }



  onClose = () => {
    this.setState({ visible: false });
  }
  showDialog = (rowData) => {
    this.setState({visible:true});//'111111111'
    const interveUrl = '/api/workflow/list/monitor/getInterveForm';
    const params = {requestid:"991720163761545230",tableId,nodeTableId,interveUrl,detailTableId,zzsp0,zzsp1,sfjs0,sfjs1};

    axios.post('/api/secondev/workflow/devIntervenor/getEbData',{...params}).then((res: any) => {
      // console.log("wcq::res=",res,res.status,res.data);
      if(res.data.status){
        const data = res.data.data;
        const {ebDataId} = data;
        this.setState({reload:true,dataid:ebDataId })
      }else{
        weappUi.Dialog.message({
            type: 'error',
            content: '后端接口异常，请重试或联系管理员！'
        });
      }
        
    })
  }

  handleOk = ()=>{
    const params = {nodeTableId,tableId,sfjs1,sfjs0,requestid:"991720163761545230",detailTableId,dataid:this.state.dataid}
    axios.post('/api/ecode/secondev/workflow/devIntervenor/doIntervenor',{...params}).then((res: any)=>{
      if(res?.data?.data?.errmsg=='success'){
        weappUi.Dialog.message({
            type: 'success',
            content: '干预成功'
        });
      }else{
        weappUi.Dialog.message({
            type: 'error',
            content: '干预失败'
        });
      }
    })
  }
  
  render() {
    const { visible,rowData,reload,dataid } = this.state;
    const src = `/sp/ebdfpage/card/2/${tableId}/${dataid}?layoutid=${layoutid}`;

    const footer = [
      <Button onClick={this.onClose} key='cancle'>取消</Button>,
      <Button onClick={this.handleOk} type={'primary'} key='ok'>确定</Button>
    ];

    return (
        <Dialog
          visible={visible}
          onClose={this.onClose}
          title="并行节点干预"
          width={1000}
          height={600}
          footer = {footer}
          closable
          destroyOnClose
          scale
          icon="Icon--Import-and-export"
          onScale={this.onScale}
          isStopPropagation={false}
          className ={"intervene-to-node-dialog"}
        >

          {reload &&
            <div className='intervene-to-node-div'>
              <iframe 
                className = "intervene-to-node-iframe"
                name = "interveneToNodeIframe"
                src={src}
              />
            </div>
          }
          {!reload && 
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center','margin-top':'100px'}}>          
              <Spin />
            </div>
          }
  
        </Dialog>
    );
  }
}

export default InterveneDialog