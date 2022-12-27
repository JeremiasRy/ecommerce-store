import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import userService from "../../services/user";
import ICredentials, { IRegister } from "../../types/interfaces/credentials";
import INotification from "../../types/interfaces/notification";
import IUser from "../../types/interfaces/user";
import { RootState } from "../store";
import { addNotification } from "./notificationReducer";

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

export const login = (credentials:ICredentials):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let result = await userService.login(credentials)
        let user:IUser = await userService.getUser(result.access_token)
        let notification:INotification = {
            message: `${user.name} logged in!`,
            type: "notification",
            timeoutInSec: 3
        }
        dispatch(loginUser(user));
        dispatch(addNotification(notification))
    } catch (e:any) {
        let notification:INotification = {
            message: "Log in failed",
            type: "alert",
            timeoutInSec: 3
        }
        dispatch(addNotification(notification));
    }
}
export const logout = ():ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    let notification:INotification = {
        message: "Logged out!",
        type: "notification",
        timeoutInSec: 3,
    } 
    dispatch(addNotification(notification));
    dispatch(logoutUser());
}
export const registerUser = (register:IRegister):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let isAvailable = await userService.checkEmailAvailability(register.email);
        if (!isAvailable.isAvailable) {
            let notification:INotification = {
                message: "E-mail is already in use",
                type: "notification",
                timeoutInSec: 3,
            }
            dispatch(addNotification(notification))
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
        let notification:INotification = {
            message: "Register failed",
            type: "alert",
            timeoutInSec: 3,
        }
        dispatch(addNotification(notification));
    }

}

