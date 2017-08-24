import { combineReducers } from 'redux';

import user from './user/reducers';
import home from './home/reducers';
import artists from './artists/reducers';

export default combineReducers({
  artists,
  home,
  user,
});
