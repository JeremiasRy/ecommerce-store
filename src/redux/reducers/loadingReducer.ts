import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loadingReducer = createSlice({
    name: "loadingReducer",
    initialState,
    reducers: {
        loading: () => {
            return true;
        },
        actionDone: () => {
            return false
        }
    }
})

export default loadingReducer.reducer;
export const { loading, actionDone } = loadingReducer.actions;