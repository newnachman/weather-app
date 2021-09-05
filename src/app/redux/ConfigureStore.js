import { applyMiddleware, createStore } from 'redux';
import {reducer} from './Reducer';
import { save, load } from "redux-localstorage-simple";

const createStoreWithMiddleware 
    = applyMiddleware(
        save() // Saving done here
    )(createStore);

    const store = createStoreWithMiddleware(
        reducer,    
        load() // Loading done here
    )    

export default store;
    
// import { createStore } from 'redux';
// import {reducer} from './Reducer';

// const store = createStore(
//     reducer,
//     );

// export default store;