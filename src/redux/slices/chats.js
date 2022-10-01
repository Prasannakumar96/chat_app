import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMessagesQuery,
  addMessagesMutation,
  updateMessagesMutation,
  addFilesMutation,
} from "../../graphql/chats";
import {url} from "../../graphql/index";
import Axios from "axios";

const MessagesSlice = createSlice({
  name: "messages",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const getMessages = createAsyncThunk("/getMessages", async () => {
  const token = localStorage.getItem("token");
  const response = await Axios.post(
    url,
    {
      query: getMessagesQuery,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  // console.log(response);
  const data = response.data.data.messages;

  return data;
});

export const addMessages = createAsyncThunk("/addMessages", async (action) => {
  const token = localStorage.getItem("token");
  const response = await Axios.post(
    url,
    { query: addMessagesMutation, variables: { input: action.payload } },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data.data.Messages;
});

export const addFiles = createAsyncThunk("/addFiles", async (action) => {
  const token = localStorage.getItem("token");
  const response = await Axios.post(
    url,
    {
      query: addFilesMutation,
      variables: {
        url: action.payload.url,
        userType: action.payload.userType,
      },
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data.data.Messages;
});

export default MessagesSlice;
