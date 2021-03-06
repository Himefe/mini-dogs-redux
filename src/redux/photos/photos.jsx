import { combineReducers, createSlice } from "@reduxjs/toolkit";
import createAsyncSlice from "../helper/createAsyncSlice";

const photos_slice = createAsyncSlice({
  name: "photos_fetch",
  initialState: {
    page: 1,
    photos: [],
    infinite: true,
  },
  fetchConfig: (page) => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=0`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
  reducers: {
    pushPhotos(state, { payload }) {
      state.photos.push(...payload);
      state.page++;
      state.infinite = true;
      if (payload.length <= 1) state.infinite = false;
    },
    resetPhotos(state) {
      state.page = 1;
      state.photos = [];
    },
  },
});

const fetchPhotos = photos_slice.asyncAction;

export const { pushPhotos, resetPhotos } = photos_slice.actions;

export const reducerPhotoPage = combineReducers({
  fetchPhoto: photos_slice.reducer,
});

export const fetcherPhotos =
  (page = 1) =>
  async (dispatch) => {
    const { payload } = await dispatch(fetchPhotos(page));
    if (payload.length >= 1) {
      dispatch(pushPhotos(payload));
    }

    return payload;
  };
