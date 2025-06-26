import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../reducers/PhotoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  photos: photoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["photos"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
