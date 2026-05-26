import React from 'react';

import * as constants from './focus-lock/constants';
import { inlineProp } from './util';

const FreeFocusInside = ({ children, className }) => (
  <div {...inlineProp(constants.FOCUS_ALLOW, true)} className={className}>
    {children}
  </div>
);


FreeFocusInside.defaultProps = {
  className: undefined,
};

export default FreeFocusInside;
