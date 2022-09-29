import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'

//Reducers
import AuthenticationReducer from "./AuthenticationSlice"
import CreatePostReducer from "./PostsSlice"
import ChatReducer from "./ChatSlice"
import UsersReducer from "./UsersSlice"
import FriendsReducer from "./FriendsSlice"
import FollowersReducer from "./FollowersSlice"
import PreloaderReducer from "./PreloaderSlice"
import ThemeReducer from "./ThemeSlice"
import EditProfileReducer from "./EditProfileSlice"
import ViewPicturesReducer from "./ViewPicturesSlice"



const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["posts","users","preloader","friends","followers","chats","editProfile","viewPictures"]
}
const rootReducer = combineReducers({
  auth:AuthenticationReducer,
  posts:CreatePostReducer,
  chats:ChatReducer,
  users:UsersReducer,
  friends:FriendsReducer,
  followers:FollowersReducer,
  preloader:PreloaderReducer,
  theme:ThemeReducer,
  editProfile:EditProfileReducer,
  viewPictures:ViewPicturesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)




export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 