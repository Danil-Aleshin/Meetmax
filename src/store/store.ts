import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

//Reducers
import AuthenticationReducer from "./AuthenticationSlice"
import CreatePostReducer from "./PostsSlice"
import ChatReducer from "./ChatSlice"
import UsersReducer from "./UsersSlice"



const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["posts","users"]
}
const rootReducer = combineReducers({
  auth:AuthenticationReducer,
  posts:CreatePostReducer,
  chats:ChatReducer,
  users:UsersReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)




export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 