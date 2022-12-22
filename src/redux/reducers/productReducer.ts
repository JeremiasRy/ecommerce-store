import IProduct from "../../types/interfaces/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/product";

const initialState:IProduct[] = [];

const productReducer = createSlice({
    name: "productReducer",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllProducts.fulfilled, (state, action) => {
            return action.payload;
        })
        build.addCase(getProduct.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export default productReducer.reducer;

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
    async () => {
        try {
            let products = await productService.getProducts();
            return products
        } catch (e:any) {
            throw new Error(e.message);
        }
    }
)
export const getProduct = createAsyncThunk(
    "getProduct",
    async (id:number) => {
        try {
            let product = await productService.getProduct(id);
            return product;
        } catch {

        }
    }
)