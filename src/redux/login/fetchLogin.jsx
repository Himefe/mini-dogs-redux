import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "../helper/createAsyncSlice";
import getLocalStorage from "../helper/getLocalStorage";

const getTokenLocal = getLocalStorage("token", null);

const token = createAsyncSlice({
  name: "token",
  initialState: {
    data: {
      token: getTokenLocal,
    },
  },
  reducers: {
    removeToken(state) {
      localStorage.removeItem("token");
      state.data = null;
    },
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: "token",
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: (user) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  }),
});

const user = createAsyncSlice({
  name: "user",
  fetchConfig: (token) => ({
    url: "https://dogsapi.origamid.dev/json/api/user",
    options: {
      method: "GET",
      headers: {
        AUTHORIZATION: "Bearer " + token,
      },
    },
  }),
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
});

const { removeUser } = user.actions;

const { removeToken } = token.actions;

const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;

export const reducerLogin = combineReducers({
  token: token.reducer,
  user: user.reducer,
});

export const login = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));

  if (payload && payload.token) {
    return await dispatch(fetchUser(payload.token));
  }

  // payload && payload.token ? dispatch(fetchUser(payload.token))
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState().reducerLogin;

  if (state.token.data?.token) {
    return await dispatch(fetchUser(state.token.data.token));
  }
};

export const userLoggout = () => async (dispatch) => {
  await dispatch(removeToken());
  await dispatch(removeUser());

  window.history.pushState(null, null, "/login");
};
