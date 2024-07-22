import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '../app/features/LoginSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, LoginReducer)

export const makeStore = () => {
  return configureStore({
    reducer: {
      Login: persistedReducer
    },
  })
}

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
