import { combineReducers, createSlice } from "@reduxjs/toolkit";
import createAsyncSlice from "../helper/createAsyncSlice";

const photos_slice = createAsyncSlice({
  name: "photos_fetch",
  initialState: {
    page: 1,
    photos: [],
  },
  fetchConfig: (page) => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=0`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
  reducers: {
    pushPhotos({ photos }, { payload }) {
      photos.push(...payload);
    },
    incrementaPage(page) {
      page.page++;
    },
  },
});

const fetchPhotos = photos_slice.asyncAction;

export const { pushPhotos, incrementaPage } = photos_slice.actions;

export const reducerPhotoPage = combineReducers({
  fetchPhoto: photos_slice.reducer,
});

export const fetcherPhotos =
  (page = 1) =>
  async (dispatch) => {
    const { payload } = await dispatch(fetchPhotos(page));

    dispatch(pushPhotos(payload));
  };
