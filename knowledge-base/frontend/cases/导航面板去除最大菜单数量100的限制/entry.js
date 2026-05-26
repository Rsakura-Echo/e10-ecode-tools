weappUtils.regOvProps('weappDesigner', 'Config', (props) => {
  if(props.com && props.com && props.com.type === 'NavPanel') {
      props.com.config.maxMenus = Infinity
  }
 
  return props;
}, 1)