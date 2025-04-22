import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './api/postsApi';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import postsReducer from './postsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['posts'],
};

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(postsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 