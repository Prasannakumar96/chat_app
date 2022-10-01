import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMentorQuery } from "../../graphql/mentor";
import Axios from "axios";
import {url} from "../../graphql/index";
const MentorSlice = createSlice({
  name: "Mentor",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMentor.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const getMentor = createAsyncThunk("/getMentor", async () => {
  const token = localStorage.getItem('token');
  const response = await Axios.post(url, {
    query: getMentorQuery,
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  // console.log(response);
  const data = response.data.data.mentors;

  return data;
});

export default MentorSlice;
