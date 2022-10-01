import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSectionQuery,addSectionMutation } from "../../graphql/section";
import { url } from "../../graphql/index";
import Axios from 'axios';

const sectionSlice = new createSlice({
    name:"sections",
    initialState: {
        value: [],
        status:"",
        error:"",
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getSections.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
          state.status = "fulfilled"
        })
        builder.addCase(getSections.pending, (state, action) => {
          // Add user to the state array
          state.status="pending"
        })
        builder.addCase(getSections.rejected, (state, action) => {
          // Add user to the state array
          state.error  = action.payload;
          state.status  = "error";
        })
        builder.addCase(addSections.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(addSections.pending, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(addSections.rejected, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
    }
})

export const getSections = createAsyncThunk("/getSections",async() => {
    const response = await Axios.post(url, {query: getSectionQuery},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data.data.sections
})

export const addSections = createAsyncThunk("/addSections",async(args) => {
    const variables = {
        input: {
            video: args.video,
            resource: args.resource,
            title: args.title,
            description: args.description,
            sectionType: args.sectionType,
            updatedAt: args.updatedAt,
            createdAt: args.createdAt
        }
    }
    const response = await Axios.post(url, {query: addSectionMutation, variables},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data
})


// export const addSections = (state) => state.courses.value
export default sectionSlice;