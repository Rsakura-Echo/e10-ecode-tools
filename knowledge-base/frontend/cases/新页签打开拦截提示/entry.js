
window.oldOpen = window.open;
window.open = (url)=>{
  weappUi.Dialog.confirm({
    content: <div>确认打开链接<br/>{url}</div>,
    onOk: () => {
      window.oldOpen(url);
    }
  });
}