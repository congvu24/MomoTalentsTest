import PhotoApi from '@/api/photo.api';
import Photo from '@/model/photo.model';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const api: PhotoApi = new PhotoApi();

export const getPhotos = createAsyncThunk('photo/getall', async () => {
  const result = await api.getListPhoto();
  return result;
});

export const getPhotoDetail = createAsyncThunk(
  'photo/detail',
  async ({id}: {id: number}) => {
    const data = await api.getPhotoDetail(id);
    return data;
  },
);
const slice = createSlice({
  name: 'photo',
  initialState: {list: [], activePhoto: null} as PhotoState,
  reducers: {
    clearActive: state => {
      state.activePhoto = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(getPhotoDetail.fulfilled, (state, action) => {
      state.activePhoto = action.payload;
    });
  },
});

export const {clearActive} = slice.actions;

export default slice.reducer;

export type PhotoState = {
  list: Photo[];
  activePhoto: null | Photo;
};
