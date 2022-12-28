import IProduct, { ISubmitProduct } from "../../types/interfaces/product";
import { createSlice, createAsyncThunk, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import productService from "../../services/product";
import categoryService from "../../services/category";
import { RootState } from "../store";
import { addNotification, createNotification } from "./notificationReducer";
import ICategory from "../../types/interfaces/category";

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
        }
    },
    extraReducers: (build) => {
        build.addCase(getAllProducts.fulfilled, (state, action) => {
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
export const { sortByPrice, filterByName, addNewProduct } = productReducer.actions;

export const addProduct = (product:ISubmitProduct):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    try {
        let result = await productService.createProduct(product);
        dispatch(addNotification(createNotification(`Succesfully added ${result.title}`, "notification", 3)))
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
        dispatch(addNotification(createNotification(`Error while creating product ${e.message}`, "notification", 3)))
    }
}

export const updateProduct = (product:ISubmitProduct, id:number):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    let result = await productService.updateProduct(product, id);
    console.log(result);
} 

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
    async (page:number) => {
        try {
            let products = await productService.getProducts(page - 1);
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