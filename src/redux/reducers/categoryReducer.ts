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
            console.log("täh")
            return action.payload
        })
        build.addCase(getCategory.fulfilled, (state, action) => {
            return [action.payload];
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
export const getCategory = createAsyncThunk(
    "getCategory",
    async (id:number) => {
        try {
            let category = await categoryService.getCategory(id);
            return category;
        } catch (e:any) {
            throw new Error(e.message)
        }
    }
)