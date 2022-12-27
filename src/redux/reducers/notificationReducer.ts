import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import INotification from "../../types/interfaces/notification";
import { RootState } from "../store";

const initialState:INotification = {message: "", timeoutInSec: 0, type: "notification"};
let timer:ReturnType<typeof setTimeout>;

const notificationReducer = createSlice({
    name: "notificationReducer",
    initialState: initialState,
    reducers: {
        notify: (state, action) => {
            return action.payload
        },
        removeNotification: () => {
            return initialState
        }
    },
})

export default notificationReducer.reducer;
export const { notify, removeNotification } = notificationReducer.actions;

export const addNotification = (notification:INotification):ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        dispatch(removeNotification());
    }, notification.timeoutInSec * 1000);
    dispatch(notify(notification))
}

export function createNotification(message:string, type: "notification" | "alert", timeoutInSec:number) {
    return { message, type, timeoutInSec }
}


