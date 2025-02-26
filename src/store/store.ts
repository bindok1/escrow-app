import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CustomizerReducer from "./customizer/CustomizerSlice";
import EcommerceReducer from "./apps/eCommerce/ECommerceSlice";


const persistConfig = {
  key: "root",
  storage,
};


export const store = configureStore({
  reducer: {
    customizer: persistReducer<any>(persistConfig, CustomizerReducer),
    ecommerceReducer: EcommerceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const rootReducer = combineReducers({
 customizer: CustomizerReducer,
 ecommerceReducer: EcommerceReducer,
 
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
