import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import localStorage from "./middlewares/localStorage";
import { reducerLogin } from "./login/fetchLogin";
import { reducerPhotoPage } from "./photos/photos";

const reducer = combineReducers({ reducerLogin, reducerPhotoPage });

const middlewares = [...getDefaultMiddleware(), localStorage];

export const store = configureStore({ reducer, middleware: middlewares });
