// import { configureStore } from '@reduxjs/toolkit'

// import loginReducer from './loginReducer'

// const store = configureStore({
//     reducer:{
//         admin:loginReducer
//     }
// })





// export default store








///////////////////////////////

import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import loginReducer from './loginReducer'
import clubLoginReducer from './clubLoginReducer';
import playerLoginReducer from './playerLoginReducer';
const persistConfig = {
    key: 'counter',
    storage,
};

const reducers = combineReducers(
    { 
        admin:loginReducer ,
        player:playerLoginReducer,
        club:clubLoginReducer,

    });
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

