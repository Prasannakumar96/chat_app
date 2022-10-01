import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentsQuery,
  addStudentsMutation,
  updateStudentMutation,
  updateProfilePicMutation,
} from "../../graphql/studentprofile";
import Axios from "axios";

const studentSlice = new createSlice({
  name: "student",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const getStudents = createAsyncThunk("/getStudents", async () => {
  const token = localStorage.getItem("token");
  const response = await Axios.post(
    "http://localhost:8000/",
    {
      query: getStudentsQuery,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = response.data.data.student;

  return data;
});

export const updateStudent = createAsyncThunk("/updateStudent",async (action) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(
      "http://localhost:8000/",
      { query: updateStudentMutation, variables: { update: action.payload } },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );


    return response.data.data.students;
  }
);

export const updateProfilePic = createAsyncThunk(
  "/updateProfilePic",
  async (action) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post(
      "http://localhost:8000/",
      {
        query: updateProfilePicMutation,
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

    return response.data.data.students;
  }
);

export default studentSlice;
