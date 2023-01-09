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
        },
        addNewProduct: (state, action) => {
            return [...state, action.payload]
        },
        updateProducts: (state, action) => {
            return state.map(product => product.id === action.payload.id ? action.payload : product);
        },
        deleteProductLocal: (state, action) => {
            return state.filter(product => product.id !== action.payload);
        }
    },
    extraReducers: (build) => {
        build.addCase(getProductsPage.fulfilled, (state, action) => {
            return action.payload;
        })
        build.addCase(getProduct.fulfilled, (state, action) => {
            return [action.payload];
        })
        build.addCase(getProductsByCategory.fulfilled, (state, action) => {
            return action.payload;
        })
        build.addCase(addProduct.fulfilled, () => {
            return;
        })
        build.addCase(updateProduct.fulfilled, () => {
            return;
        })
    }
})

export default productReducer.reducer;
export const { sortByPrice, filterByName, addNewProduct, updateProducts, deleteProductLocal } = productReducer.actions;

export const addProduct = createAsyncThunk(
    'addProducts',
    async (product:ISubmitProduct, thunkAPI) => {
        if (product.price < 0) {
            thunkAPI.dispatch(addNotification(createNotification(["Price must be positive"], "alert", 3)));
            return;
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
        try {
            await productService.updateProduct(update, update.id as number)
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
    "getAllProducts",
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
    async (id:number) => {
        try {
            let product = await productService.getProduct(id);
            return product;
        } catch (e:any) {
            throw new Error(e.message)
        }
    }
)
export const getProductsByCategory = createAsyncThunk(
    "getProductsByCategory",
    async (categoryId:number) => {
        try {
            let products = await categoryService.getProductsByCategory(categoryId);
            return products;
        } catch (e:any) {
            throw new Error(e.message)
        }
    }
)