import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer'; // Ensure correct path

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
// Use ReturnType to infer the RootState type
export type RootState = ReturnType<typeof rootReducer>;
