import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/auth.slice';
import emailSlice from '../features/email/email.slice';
import uiSlice from '../features/ui/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    email: emailSlice,
    ui: uiSlice,
  },
});
