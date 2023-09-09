import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import { taskApi } from "@/redux/services/taskApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    counterReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

setupListeners(store.dispatch);

// the following is a type definition for the RootState, which is the type of the state of the store.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
