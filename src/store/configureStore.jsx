// configureStore.jsx

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Importing 'thunk' directly from 'redux-thunk'
import rootReducer from '../reducers/portfolioReducer';

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
