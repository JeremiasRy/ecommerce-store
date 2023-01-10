import IProduct, { ISubmitProduct } from "../../types/interfaces/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/product";
import categoryService from "../../services/category";
import { addNotification, createNotification } from "./notificationReducer";
import { AxiosError, AxiosResponse } from "axios";

const initialState:IProduct[] = [];

const productReducer = createSlice({
    name: "productReducer",
    initialState: initialState,
    reducers: {
        sortByPrice: (state, action) => {
            if (action.payload === "asc") {
                return [...state].sort((a, b) => a.price - b.price);
            } else {
                return [...state].sort((a, b) => b.price - a.price);
            }
        },
        filterByName: (state, action) => {
            return state.filter(product => product.title.toLowerCase().includes(action.payload.toLowerCase()));
        }
    },
    extraReducers: (build) => {
        build.addCase(getProductsPage.fulfilled, (_, action) => {
            return action.payload;
        })
        build.addCase(getProduct.fulfilled, (_, action) => {
            return [action.payload];
        })
        build.addCase(getProductsByCategory.fulfilled, (_, action) => {
            return action.payload;
        })
        build.addCase(addProduct.fulfilled, () => {
            return;
        })
        build.addCase(updateProduct.fulfilled, () => {
            return;
        })
        build.addCase(getAllProducts.fulfilled, (_, action) => {
            return action.payload;
        })
    }
})

export default productReducer.reducer;
export const { sortByPrice, filterByName, } = productReducer.actions;

export const addProduct = createAsyncThunk(
    'addProducts',
    async (product:ISubmitProduct, thunkAPI) => {
        if (product.price <= 0 || product.description === "" || product.title === ""  || product.images.length === 0) {
            thunkAPI.dispatch(addNotification(createNotification("Please fill out the product info correctly", "notification", 3)))
        }
        try {
            let result = await productService.createProduct(product);
            thunkAPI.dispatch(addNotification(createNotification([`Succesfully added ${result.title}`], "notification", 3)));
            thunkAPI.dispatch(getProductsPage(1));
        } catch (e:any) {
            const error = e as AxiosError
            const response = error.response as AxiosResponse;
            const messageArr = response.data.message as [];
            thunkAPI.dispatch(addNotification(createNotification(messageArr, "notification", 5)))
        }
    }
)

export const updateProduct = createAsyncThunk(
    'updateProduct',
    async (update:ISubmitProduct, thunkAPI) => {
        console.log(update.id)
        try {
            await productService.updateProduct(update, Number(update.id))
            thunkAPI.dispatch(addNotification(createNotification(`Succesfully updated product ${update.title}`, "notification", 3)))
            thunkAPI.dispatch(getProductsPage(1));
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification("Failed to update product", "alert", 3)));
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (id:number, thunkAPI) => {
        let allProducts:IProduct[] = await productService.getAllProducts();
        if (!allProducts.some(product => product.id === id)) {
            thunkAPI.dispatch(addNotification(createNotification("Can't find product to delete", "alert", 3)))
            return
        }
        try {
            await productService.deleteProduct(id);
            thunkAPI.dispatch(addNotification(createNotification("Product deleted", "notification", 3)))
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification(`Something went wrong ${e.message}`, "alert", 3)))
        }
    }
)


export const getProductsPage = createAsyncThunk(
    "getProductsPage",
    async (page:number, thunkAPI) => {
        try {
            let products = await productService.getProductsPage(page - 1);
            return products
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification(e.message, "alert", 3)))
        }
    }
)
export const getProduct = createAsyncThunk(
    "getProduct",
    async (id:number, thunkAPI) => {
        try {
            let product = await productService.getProduct(id);
            return product;
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification(["Something went wrong while fetching a product", e.message], "notification", 3)))
        }
    }
)
export const getProductsByCategory = createAsyncThunk(
    "getProductsByCategory",
    async (categoryId:number, thunkAPI) => {
        try {
            let products = await categoryService.getProductsByCategory(categoryId);
            return products;
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification(["Something went wrong while fetching a products by category", e.message], "notification", 3)))
        }
    }
)
export const getAllProducts = createAsyncThunk(
    "getAllProducts",
    async (_, thunkAPI) => {
        try {
            let products = await productService.getAllProducts();
            return products;
        } catch (e:any) {
            thunkAPI.dispatch(addNotification(createNotification(["Something went wrong while fetching all the products:", e.message], "notification", 3)))
        }   
    }
)