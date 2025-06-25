import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../reducers/PhotoSlice";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
});
