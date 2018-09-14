import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase'
import './config';

const rrfConfig = {
  userProfile: 'users',
}

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const initialState = {};

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  firebase: firebaseReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunkMiddleware.withExtraArgument(getFirebase) // Pass getFirebase function as extra argument)
    ),
    reactReduxFirebase(firebase, rrfConfig)
  )
)


export default store;
