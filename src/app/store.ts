import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { emptySplitApi } from './services/api'
// import { AuthSliceReducer } from '../features/auth/AuthSlice';
// import { UserDataSliceReducer } from '../features/profile/profileSlice';
// import { WalletSliceReducer } from '../features/wallet/walletSlice';
// import { SubscriptionSliceReducer } from '../features/subscription/subscriptionSlice';
import { unauthenticatedMiddleware } from './middleware/unauthenticatedMiddleware';
import { AuthSliceReducer } from '../features/auth/AuthSlice';

// Combine all reducers here
const rootReducer = combineReducers({
    authUser: AuthSliceReducer,
    // userData: UserDataSliceReducer,
    // userWallet: WalletSliceReducer,
    // userSubscription: SubscriptionSliceReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

// Persist Configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authUser', 'userData', 'userWallet', 'userSubscription']
}

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({

        // Ignore action types dipatched by redux persist to prevent serializable issues
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },

    }).concat([unauthenticatedMiddleware, emptySplitApi.middleware,]),
})

// Export Persistor
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself          
export type RootState = ReturnType<typeof store.getState>

// AppDispatch type
export type AppDispatch = typeof store.dispatch                 