import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { initialAppState, AppState } from '../../../state';

import { LOAD_PROJECTS_REQUEST } from '../projectTypes';
import { loadProjects } from '../projectActions';
jest.mock('../projectActions');

const middlewares = [ReduxThunk]; // add middleware like `redux-thunk`
const mockStoreCreator = configureMockStore(middlewares);

describe('Project Actions', () => {
  let store: any;

  beforeEach(() => {
    store = mockStoreCreator(initialAppState);
  });

  xtest('should loadProjects', () => {
    return store.dispatch(loadProjects(1)).then(() => {
      const actions = store.getActions();
      // expect(actions[0]).toEqual({ type: LOAD_PROJECTS_REQUEST });
    });
  });
});
