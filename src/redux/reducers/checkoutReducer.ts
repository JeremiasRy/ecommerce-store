import { createSlice } from "@reduxjs/toolkit";
import ICheckoutItem from "../../types/interfaces/checkoutItem";

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
                let newState = state.map(item => item.product.id === action.payload.id ? newItem : item);
                return newState;
            } else {
                let newState = [...state, newItem];
                return newState;
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
                let newState = state.filter(item => item.product.id !== action.payload.id);
                return newState
            } else {
                let newItem:ICheckoutItem = {
                    product: action.payload,
                    amount: amountInCart - 1
                }
                let newState = state.map(item => item.product.id === action.payload.id ? newItem : item);
                return newState;
            }
        },
        emptyCart: () => {
            return initialState;
        },
        fillCartFromStorage: (_, action) => {
            return action.payload;
        }
    }
})

export default checkoutReducer.reducer;
export const { addToCart, removeFromCart, emptyCart, fillCartFromStorage } = checkoutReducer.actions;