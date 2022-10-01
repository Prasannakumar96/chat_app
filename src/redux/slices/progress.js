import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgressQuery,addProgressMutation ,updateProgressMutation} from "../../graphql/progress";
import { url } from "../../graphql/index";
import Axios from 'axios';


const progresssSlice = new createSlice({
    name:"progress",
    initialState: {
        value: [],
        status:"",
        error:"",
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getProgress.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
          state.status = "fulfilled"
        })
        builder.addCase(getProgress.pending, (state, action) => {
          // Add user to the state array
          state.status="pending"
        })
        builder.addCase(getProgress.rejected, (state, action) => {
          // Add user to the state array
          state.error  = action.payload;
          state.status  = "error";
        })
        builder.addCase(addProgress.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(addProgress.pending, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(addProgress.rejected, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(updateProgress.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(updateProgress.pending, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(updateProgress.rejected, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
    }
})

export const getProgress = createAsyncThunk("/getProgress",async() => {
    const response = await Axios.post(url, {query: getProgressQuery},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data.data.progress
})

export const addProgress = createAsyncThunk("/addProgress",async(args) => {
    const variables = {
        input: {
            title: args.title,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt
        }
    }
    const response = await Axios.post(url, {query: addProgressMutation, variables},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data
})

export const updateProgress = createAsyncThunk("/updateProgress",async(args) => {
  //  console.log(args);
    const response = await Axios.post(url, {query: updateProgressMutation, variables: {updateId: args.updateId, update:{
      progressData: args.update
    }}},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data
})

export default progresssSlice;
