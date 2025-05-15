import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import authReducer,{signOut} from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import balanceReducer from "./slices/balanceSlice";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  balance: balanceReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === signOut.type) {
    state = undefined;
  }
  return appReducer(state, action);
};


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [ 'auth', 'balance', 'user'],
  //blacklist: [ 'auth']
};



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }), 
});



export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
