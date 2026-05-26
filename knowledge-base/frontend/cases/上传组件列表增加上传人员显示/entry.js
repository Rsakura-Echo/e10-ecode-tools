

import { regOvProps } from '@weapp/utils';
import { Component, FC, useCallback, useState } from 'react';


const FileItem: React.FC<any> = ({ item, index, weId, eventProps }) => {
  const { onOptionClick, onEditName } = eventProps;
  const [showInput, setShowInput] = useState<boolean>(false);
  const [name, setName] = useState<string>(item.name)
  // 由于自定义了列表，因此重命名逻辑需要模块自行处理
  const onClickMore = useCallback((id: string, option) => {
    if (id === 'rename') {
      setShowInput(true)
    } else {
      onOptionClick(option, item, index)
    }
  }, [onOptionClick, item, index])
  const handleReName = useCallback((v) => {
    setShowInput(false);
    onEditName(item, v)
  }, [onEditName, item])
  const handleChangeName = useCallback((v) => {
    setName(v);
  }, [])
  return (
    <div key={item.fileid} style={{ display: 'flex', height: '20px', alignItems: 'center' }}>
      <window.weappUi.Icon name="Icon-Knowledge-document-o" />
      {!showInput && <span style={{ display: 'inline-block', width: '200px', marginLeft: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>}
      {!showInput && <div>{item.uploadUserName}</div>}
      {showInput && <window.weappUi.Input value={name} onChange={handleChangeName} onPressEnter={handleReName} />}
      <window.weappUi.Menu
        type="select"
        selectType="iconOverlay"
        showSensitive
        data={item.options}
        onItemClick={onClickMore}
      />
    </div>
  )
}

const renderListUploaded = (data, instance: any, com: any, eventProps: any) => {
 return <div>{
    data.map((item, index) => {
      return <FileItem key={item.fileid} item={item} index={index} eventProps={eventProps} />
    })
  }
  </div>
}

regOvProps('weappUi', 'Upload', props => {

  if (props.weId === "f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_wwdgte") {
    props.renderListUploaded = renderListUploaded;
  }
  return props;
});

