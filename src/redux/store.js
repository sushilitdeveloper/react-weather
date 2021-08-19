import { createStore } from 'redux';
import coordReducer from './coordinates/coordReducer';

const store = createStore(coordReducer);

export default store;