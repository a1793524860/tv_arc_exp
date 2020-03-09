import { combineEpics } from 'redux-observable';

import modalServiceEpics from 'services/modal/epics';
import loginServiceEpics from 'services/login/epics';

export default combineEpics(
  ...modalServiceEpics,
  ...loginServiceEpics,
);
