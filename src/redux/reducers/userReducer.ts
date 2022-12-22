import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user";
import ICredentials from "../../types/interfaces/credentials";
import IUser from "../../types/interfaces/user";

const initialState:IUser | null = null; 
const userReducer = createSlice({
    name: "userReducer",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(login.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export default userReducer.reducer

export const login = createAsyncThunk(
    "login", 
    async (credentials:ICredentials) => {
        try {
            let result = await userService.login(credentials)
            let user = await userService.getUser(result.access_token)
            return user
        } catch (e:any) {
            throw new Error(e.message);
        }
    },
)