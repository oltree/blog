import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isLogin: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }) => {
    try {
      const { data } = await api.post('/auth/register', {
        email,
        password,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isLogin = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.isLogin = false;
      })
      .addCase(register.fulfilled, state => {
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(register.rejected, state => {
        state.isLoading = false;
        state.isLogin = false;
      })

      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
