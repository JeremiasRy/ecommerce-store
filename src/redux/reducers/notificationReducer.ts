import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import INotification from "../../types/interfaces/notification";

const initialState:INotification = {message: "", timeoutInSec: 0, type: "notification"};
let timer:ReturnType<typeof setTimeout>;

const notificationReducer = createSlice({
    name: "notificationReducer",
    initialState: initialState,
    reducers: {
        removeNotification: () => {
            return initialState
        },
    },
    extraReducers: (build) => {
        build.addCase(addNotification.fulfilled, (_, action) => {
            return action.payload;
        })
    }
})

export default notificationReducer.reducer;
export const { removeNotification } = notificationReducer.actions;

export const addNotification = createAsyncThunk(
    'addNotification',
    async (notification:INotification, thunkAPI) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            thunkAPI.dispatch(removeNotification());
        }, notification.timeoutInSec * 1000);
        return notification;
    }
)

export function createNotification(message:string[] | string, type: "notification" | "alert", timeoutInSec:number) {
    return { message, type, timeoutInSec }
}


