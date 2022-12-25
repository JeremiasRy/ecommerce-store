import { createSlice } from "@reduxjs/toolkit";
import ICheckoutItem from "../../types/interfaces/checkoutItem";
import IProduct from "../../types/interfaces/product";

const initialState:ICheckoutItem[] = []

const checkoutReducer = createSlice({
    name: "checkoutReducer",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            let foundInCart = false;
            let amountInCart = 0;
            state.forEach(item => {
                if (item.product.id === action.payload.id) {
                    foundInCart = true
                    amountInCart = item.amount;
                }
            })
            let newItem:ICheckoutItem = {
                product: action.payload,
                amount: amountInCart + 1,
            }
            if (foundInCart) {
                return state.map(item => item.product.id === action.payload.id ? newItem : item);
            } else {
                return [...state, newItem];
            }
            
        },
        removeFromCart: (state, action) => {
            let amountInCart = 0;
            state.forEach(item => {
                if (item.product.id === action.payload.id) {
                    amountInCart = item.amount;
                }
            })
            if (amountInCart === 1) {
                return state.filter(item => item.product.id !== action.payload.id);
            } else {
                let newItem:ICheckoutItem = {
                    product: action.payload,
                    amount: amountInCart - 1
                }
                return state.map(item => item.product.id === action.payload.id ? newItem : item);
            }
        },
        emptyCart: () => {
            return initialState;
        }
    }
})

export default checkoutReducer.reducer;
export const { addToCart, removeFromCart, emptyCart } = checkoutReducer.actions;