import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentsQuery } from "../../graphql/student";
import Axios from "axios";

import { url } from "../../graphql";

const StudentSlice = createSlice({
  name: "Students",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudents.fulfilled, (state, action) => {
      //   console.log(action);
      state.value = action.payload;
    });
  },
});

export const getStudents = createAsyncThunk("/getStudents", async () => {
  const token = localStorage.getItem("token");
  const response = await Axios.post(
    url,
    {
      query: getStudentsQuery,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = response.data.data.students;
  //   console.log(data);
  return data;
});

export default StudentSlice;
