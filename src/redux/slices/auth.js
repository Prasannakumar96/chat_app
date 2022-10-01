import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginQuery } from "../../graphql/auth";
import { url } from "../../graphql/index";
import Axios from "axios";

const authSlice = new createSlice({
  name: "auth",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.value = "";
    });
  },
});

export const login = createAsyncThunk("/login", async (action) => {
  const response = await Axios.post(url, {
    query: loginQuery,
    variables: {
      email: action.email,
      password: action.password,
      userType: action.userType,
    },
  });

  if (response.data.errors) return response.data.errors[0];
  let token = response.data.data.login.token;
  let userId = response.data.data.login.userID;
  localStorage.setItem("token", token);
  localStorage.setItem("id", userId);

  //   Axios.defaults.headers.common["Authorization"] =  token;
  const data = response.data.data.login;
  action.login(token);
  return data;
});

export default authSlice;
