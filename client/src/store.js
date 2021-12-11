import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middlawere = [thunk];

const store = createStore(

    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlawere))
)

export default store;