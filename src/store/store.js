import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

// root reducer
import { rootReducer } from "./root-reducer";

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
