import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import homeFinder from './reducers/HomeFinder/index';

console.log(homeFinder);
const store = createStore(homeFinder, applyMiddleware(thunk));

console.log(store);
export default store;
