import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentQuery, addStudentMutation, addNotesMutation } from "../../graphql/student";
import { url } from "../../graphql/index";
import Axios from 'axios';


const studentSlice = new createSlice({
    name:"student",
    initialState: {
        value: [],
        status:"",
        error:"",
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getStudent.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
          state.status = "fulfilled"
        })
        builder.addCase(getStudent.pending, (state, action) => {
          // Add user to the state array
          state.status="pending"
        })
        builder.addCase(getStudent.rejected, (state, action) => {
          // Add user to the state array
          state.error  = action.payload;
          state.status  = "error";
        })
        builder.addCase(addNotes.fulfilled, (state, action) => {
          // Add user to the state array
          state.addNotes = (action.payload)
        })
        builder.addCase(addNotes.pending, (state, action) => {
          // Add user to the state array
          state.addNotes = (action.payload)
        })
        builder.addCase(addNotes.rejected, (state, action) => {
          // Add user to the state array
          state.addNotes = (action.payload)
        })
    }
})

export const getStudent = createAsyncThunk("/getStudent",async() => {
  const token = localStorage.getItem("token");
  // console.log(token);
    const response = await Axios.post(url, {query: getStudentQuery},{headers:{
        "Authorization": "Bearer "+token
    }});
     console.log(response);
    return response.data.data.student
})

export const addStudent = createAsyncThunk("/addStudent",async({input}) => {
  const token = localStorage.getItem("token");
  const variables = {
      input: {
          noteTitle: input.noteTitle,
          note: input.note,
      }
  }
  const response = await Axios.post(url, {query: addStudentMutation, variables},{headers:{
      "Authorization": "Bearer "+token
  }});
  return response.data.data.addStudent
})

export const addNotes = createAsyncThunk("/addNotes",async({input},{dispatch}) => {
  const token = localStorage.getItem("token");
  const variables = {
    input : {
      noteTitle: input.noteTitle,
      note: input.note,
    }
  }
  const response = await Axios.post(url, {query: addNotesMutation, variables},{headers:{
    "Authorization": "Bearer "+token
  }});
  const res= response.data.data.addNotes
  console.log(response);
  if (res.msg == "notes added"){
    dispatch(getStudent());
  }
  return res;
})

export default studentSlice;