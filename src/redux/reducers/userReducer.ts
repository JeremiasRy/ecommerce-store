import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import userService from "../../services/user";
import ICredentials, { IRegister } from "../../types/interfaces/credentials";
import { User } from '../../types/user'
import { addNotification, createNotification } from "./notificationReducer";

const initialState:User = null as User;

const userReducer = createSlice({
    name: "userReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(refreshLogin.fulfilled, (_, action) => {
            return action.payload;
        })
        build.addCase(login.fulfilled, (_, action) => {
            return action.payload;
        })
        build.addCase(logout.fulfilled, (_, action) => {
            return action.payload;
        })
    }
})

export default userReducer.reducer

export const refreshLogin = createAsyncThunk(
    'refreshLogin',
    async (refreshToken:string, thunkAPI) => {
        try {
            thunkAPI.dispatch(addNotification(createNotification("Logging in...", "notification", 5)));
            let result = await userService.refresh(refreshToken);
            let user = await userService.getUser(result.access_token);
            thunkAPI.dispatch(addNotification(createNotification(`${user.name} logged in!`, "notification", 3)));
            return user;
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification("Session expired", "notification", 3)));
            return null;
        }
    }
)
export const login = createAsyncThunk(
    'login',
    async (credentials:ICredentials, thunkAPI) => {
        try {
            thunkAPI.dispatch(addNotification(createNotification("Logging in...", "notification", 5)));
            let result = await userService.login(credentials);
            let user:User = await userService.getUser(result.access_token);
            if (user !== null) {
                user.refreshtoken = result.refresh_token;
                thunkAPI.dispatch(addNotification(createNotification(`${user.name} logged in!`, "notification", 3)));
                return user;
            }
        } catch (e:any) {
            const error = e as AxiosError
            const response = error.response as AxiosResponse;
            const messageArr = response.data.message as [];
            thunkAPI.dispatch(addNotification(createNotification(messageArr, "alert", 3)));
            return null;
        }
    }
)
export const logout = createAsyncThunk(
    'logout',
    (_, thunkAPI) => {
        thunkAPI.dispatch(addNotification(createNotification("Logged out!", "notification", 3)));
        window.localStorage.removeItem("refreshToken");
        return null;
    }
)
export const registerUser = createAsyncThunk(
    'registerUser',
    async (register:IRegister, thunkAPI) => {
        try {
            let isAvailable = await userService.checkEmailAvailability(register.email);
            if (!isAvailable.isAvailable) {
                thunkAPI.dispatch(addNotification(createNotification("E-mail is already in use", "notification", 3)))
                return;
            }
            await userService.createNewUser(register);
    
            thunkAPI.dispatch(addNotification(createNotification("Register success! " + register.name, "notification", 3)));
            thunkAPI.dispatch(login({email: register.email, password: register.password}));
        } catch (e:any) {
            const error = e as AxiosError
            const response = error.response as AxiosResponse;
            const messageArr = response.data.message as [];
            thunkAPI.dispatch(addNotification(createNotification(messageArr, "alert", 3)));
        }
    }
)

