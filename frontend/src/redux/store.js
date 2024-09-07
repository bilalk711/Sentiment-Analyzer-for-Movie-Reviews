import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'; 
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = persistReducer(persistConfig, (state = {}, action) => ({
  [apiSlice.reducerPath]: apiSlice.reducer(state[apiSlice.reducerPath], action),
  auth: authReducer(state.auth, action),
}));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const persistor = persistStore(store);

export { persistor, store };
