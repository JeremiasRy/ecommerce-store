import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import userService from "../../services/user";
import ICredentials from "../../types/interfaces/credentials";
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
        logout: () => {
            return initialState;
        }
    },
})

export default userReducer.reducer
export const { logout, loginUser } = userReducer.actions;

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
