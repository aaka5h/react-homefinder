import { applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import homeFinder from './_reducers/HomeFinder/index';

console.log(homeFinder);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(homeFinder, composeEnhancers(applyMiddleware(thunk)));

console.log(store);
export default store;
