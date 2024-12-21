import { configureStore } from '@reduxjs/toolkit'

import api from '../services/api'
export const store = configureStore({
  //rootreducer
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type AppDispatch = typeof store.dispatch

export type RootReducer = ReturnType<typeof store.getState>
