import { Button } from '@weapp/ui';

export default class NewButton extends React.Component {
  render() {
    const { OriginCom } = this.props;
    return (
      <>
        <Button type="warning" style={{ marginLeft: 10 }}>表单审核</Button>
        <OriginCom {...this.props} />
      </>
    )
  }
}