import { applyMiddleware, createStore } from 'redux';
import {reducer} from './Reducer';
import { save, load } from "redux-localstorage-simple";
import InitialState from './InitialState';

const createStoreWithMiddleware = applyMiddleware( save({ ignoreStates: ["snackbarState"] }) )(createStore);

const store = createStoreWithMiddleware( reducer, load({preloadedState: InitialState}) );   

export default store;


    
// import { createStore } from 'redux';
// import {reducer} from './Reducer';
// import InitialState from './InitialState';

// const store = createStore(
//     reducer,
//     );

// export default store;