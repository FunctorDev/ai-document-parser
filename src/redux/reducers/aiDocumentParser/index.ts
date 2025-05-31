import * as Actions from './actions';
import * as selectors from './selectors';
import { actions as SliceActions, reducer, sliceKey } from './slice';

const actions = {
  ...SliceActions,
  ...Actions,
};

export { reducer, sliceKey, actions, selectors };
