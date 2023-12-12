import {applyMiddleware, compose, createStore} from "redux"
import createDebounce from "redux-debounced"
import ReduxThunk from "redux-thunk"
import {createLogger} from 'redux-logger'
import rootReducer from "../reducers/rootReducer";


const logger = createLogger({
    collapsed: true
});
const middleWares = [ReduxThunk, createDebounce(), logger];
const appReducer = (state, action) => {
    return rootReducer(state, action)
};
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    appReducer,
    // composeEnhancers(
    applyMiddleware(...middleWares)
    // )
);

export {store}
