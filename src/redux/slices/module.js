import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getModulesQuery,addModulesMutation } from "../../graphql/module";
import { url } from "../../graphql/index";
import Axios from 'axios';


const modulesSlice = new createSlice({
    name:"modules",
    initialState: {
        value: [],
        status:"",
        error:"",
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getModules.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
          state.status = "fulfilled"
        })
        builder.addCase(getModules.pending, (state, action) => {
          // Add user to the state array
          state.status="pending"
        })
        builder.addCase(getModules.rejected, (state, action) => {
          // Add user to the state array
          state.error  = action.payload;
          state.status  = "error";
        })
        builder.addCase(addModules.fulfilled, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(addModules.pending, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
        builder.addCase(addModules.rejected, (state, action) => {
          // Add user to the state array
          state.value = (action.payload)
        })
    }
})

export const getModules = createAsyncThunk("/getModules",async() => {
    const response = await Axios.post(url, {query: getModulesQuery},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data.data.modules
})

export const addModules = createAsyncThunk("/addModules",async(args) => {
    const variables = {
        input: {
            title: args.title,
            subTitle:args.title,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt
        }
    }
    const response = await Axios.post(url, {query: addModulesMutation, variables},{headers:{
        "Authorization": "Bearer"
    }});
    return response.data
})


export default modulesSlice;