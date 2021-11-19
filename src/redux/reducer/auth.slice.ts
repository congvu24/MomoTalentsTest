import UserApi from '@/api/user.api';
import User from '@/model/user.model';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

const api: UserApi = new UserApi();

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}) => {
    const token = await api.postLogin({email, password});
    return token;
  },
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLogin: false,
    isLoading: false,
  } as AuthState,
  reducers: {
    logout: state => {
      state.token = null;
      state.user = null;
      state.isLogin = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      let token = action.payload;
      state.token = token;
      state.isLogin = true;
      state.isLoading = false;
    });

    builder.addCase(userLogin.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(userLogin.rejected, state => {
      state.isLoading = false;

      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại!',
        text2: 'Kiểm tra tài khoản của bạn và thử lại',
      });
    });
  },
});

export const {logout} = slice.actions;

export default slice.reducer;

export type AuthState = {
  user: null | undefined | User;
  token: string | null | undefined;
  isLogin: boolean;
  isLoading: boolean;
};

type AuthPayload = {
  payload: {
    user: null | undefined | User;
    token: string | null | undefined;
  };
};
