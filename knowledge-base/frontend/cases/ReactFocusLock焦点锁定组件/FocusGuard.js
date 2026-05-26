import React from 'react';

export const hiddenGuard = {
  width: '1px',
  height: '0px',
  padding: 0,
  overflow: 'hidden',
  position: 'fixed',
  top: '1px',
  left: '1px',
};

const InFocusGuard = ({ children }) => (
  <React.Fragment>
    <div key="guard-first" data-focus-guard data-focus-auto-guard style={hiddenGuard} />
    {children}
    {children && <div key="guard-last" data-focus-guard data-focus-auto-guard style={hiddenGuard} />}
  </React.Fragment>
);

InFocusGuard.defaultProps = {
  children: null,
};


export default InFocusGuard;
