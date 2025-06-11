import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "./slice/fileUploadSlice";
import stepsReduser from "./slice/stepsSlice";

export const store = configureStore({
  reducer: {
    steps: stepsReduser,
    fileUpload: fileUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
