import { exportSidecar } from './use-sidecar/index';
import FocusTrap from './Trap';
import { mediumSidecar } from './medium';

export default exportSidecar(mediumSidecar, FocusTrap);
