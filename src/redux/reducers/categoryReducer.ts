import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/category";
import ICategory from "../../types/interfaces/category";

const initialState:ICategory[] = [];

const categoryReducer = createSlice({
    name: "categoryReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllCategories.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default categoryReducer.reducer;

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try {
            let categories = await categoryService.getAllCategories();
            return categories;
        } catch (e:any) {
            throw new Error(e.message);
        }
    }
)