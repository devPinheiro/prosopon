import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist'

import appReducer from './rootReducers'
import storage from 'redux-persist/lib/storage'

// Persistance Config for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,

  // Skip JSON.stringify(data) before storing it
  // You can remove this if you do not want your store in the persisted file to be formatted
  serialize: false,

  // window.store.get already returns deserialized data
  deserialize: false
}
const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore all actions that redux-persist has
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

// Make the store persistent
export const persistor = persistStore(store)

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
