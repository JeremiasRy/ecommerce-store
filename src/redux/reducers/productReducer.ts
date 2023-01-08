import IProduct, { ISubmitProduct } from "../../types/interfaces/product";
import { createSlice, createAsyncThunk, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import productService from "../../services/product";
import categoryService from "../../services/category";
import { RootState } from "../store";
import { addNotification, createNotification } from "./notificationReducer";
import ICategory from "../../types/interfaces/category";
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
    }
})

export default productReducer.reducer;
export const { sortByPrice, filterByName, addNewProduct, updateProducts, deleteProductLocal } = productReducer.actions;

export const addProduct = (product:ISubmitProduct):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    if (product.price < 0) {
        dispatch(addNotification(createNotification(["Price must be positive"], "alert", 3)));
        return;
    }
    try {
        let result = await productService.createProduct(product);
        dispatch(addNotification(createNotification([`Succesfully added ${result.title}`], "notification", 3)))
        let newProduct:IProduct = {
            id: result.id,
            title: result.title,
            description: result.description,
            price: result.price,
            category: result.category as ICategory,
            images: result.images
        }
        dispatch(addNewProduct(newProduct));
    } catch (e:any) {
        const error = e as AxiosError
        const response = error.response as AxiosResponse;
        const messageArr = response.data.message as [];

        dispatch(addNotification(createNotification(messageArr, "notification", 5)))
    }
}

export const updateProduct = (product:ISubmitProduct, id:number):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let result = await productService.updateProduct(product, id);
        let uProduct:IProduct = {
            id: result.id,
            title: result.title,
            description: result.description,
            price: result.price,
            category: result.category as ICategory,
            images: result.images
        }
        dispatch(addNotification(createNotification(`Succesfully updated product ${uProduct.title}`, "notification", 3)))
        dispatch(updateProducts(uProduct));
    } catch (e:any) {
        dispatch(addNotification(createNotification("Failed to update product", "alert", 3)));
    }
}
export const deleteProduct = (id:number):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    let allProducts:IProduct[] = await productService.getAllProducts();
    
    if (!allProducts.some(product => product.id === id)) {
        dispatch(addNotification(createNotification("Can't find product to delete", "alert", 3)))
        return
    }
    try {
        await productService.deleteProduct(id);
        dispatch(addNotification(createNotification("Product deleted", "notification", 3)))
        dispatch(deleteProductLocal(id));
    } catch (e:any) {
        dispatch(addNotification(createNotification(`Something went wrong ${e.message}`, "alert", 3)))
    }
    
}

export const getProductsPage = createAsyncThunk(
    "getAllProducts",
    async (page:number) => {
        try {
            let products = await productService.getProductsPage(page - 1);
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
            if (products.length === 0) {
                return [];
            }
            return products;
        } catch (e:any) {
            throw new Error(e.message)
        }
    }
)