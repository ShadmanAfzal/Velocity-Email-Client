import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const fetchUser = createAsyncThunk('auth/login', async (thunkAPI) => {
  try {
    const response = await axios.get('/auth/user');
    const data = await response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload.error;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
