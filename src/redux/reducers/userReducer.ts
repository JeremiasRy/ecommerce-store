import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import userService from "../../services/user";
import ICredentials, { IRegister } from "../../types/interfaces/credentials";
import INotification from "../../types/interfaces/notification";
import IUser from "../../types/interfaces/user";
import { RootState } from "../store";
import { addNotification, createNotification } from "./notificationReducer";

const initialState:IUser[] = [];

const userReducer = createSlice({
    name: "userReducer",
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            return [action.payload]
        },
        logoutUser: () => {
            return initialState;
        }
    },
})

export default userReducer.reducer
export const { logoutUser, loginUser } = userReducer.actions;

export const refreshLogin = (refreshToken:string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let result = await userService.refresh(refreshToken);
        let user:IUser = await userService.getUser(result.access_token);
        dispatch(loginUser(user));
        dispatch(addNotification(createNotification(`${user.name} logged in!`, "notification", 3)));
        window.localStorage.setItem("refreshToken", result.refresh_token);
    } catch (e:any) {
        dispatch(addNotification(createNotification("Session expired", "notification", 3)));
    }
}

export const login = (credentials:ICredentials):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let result = await userService.login(credentials);
        let user:IUser = await userService.getUser(result.access_token);
        dispatch(loginUser(user));
        dispatch(addNotification(createNotification(`${user.name} logged in!`, "notification", 3)));
        window.localStorage.setItem("refreshToken", result.refresh_token);
    } catch (e:any) {
        dispatch(addNotification(createNotification("Log in failed", "alert", 3)));
    }
}
export const logout = ():ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    dispatch(addNotification(createNotification("Logged out!", "notification", 3)));
    dispatch(logoutUser());
    window.localStorage.clear();
}
export const registerUser = (register:IRegister):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let isAvailable = await userService.checkEmailAvailability(register.email);
        if (!isAvailable.isAvailable) {
            dispatch(addNotification(createNotification("E-mail is already in use", "notification", 3)))
            return;
        }
        await userService.createNewUser(register);
        let notification:INotification = {
            message: "Register success! " + register.name,
            type: "notification",
            timeoutInSec: 3,
        }
        dispatch(addNotification(notification));
        dispatch(login({email: register.email, password: register.password}));
    } catch (e:any) {
        dispatch(addNotification(createNotification("Register failed", "alert", 3)));
    }

}

