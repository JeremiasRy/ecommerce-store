import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import IUser from "../../types/interfaces/user";
import ICategory from "../../types/interfaces/category";
import ICheckoutItem from "../../types/interfaces/checkoutItem";
import INotification from "../../types/interfaces/notification";
import { addToCart, removeFromCart } from "./checkoutReducer";
import dummyData from "../../utility/dummyData";

let store: ToolkitStore<RootState, AnyAction, MiddlewareArray<[ThunkMiddleware<{
    user: IUser[];
    products: any[];
    categories: ICategory[];
    checkout: ICheckoutItem[];
    notification: INotification;
}, AnyAction, undefined>]>>;

beforeEach(() => {
    store = createStore();
})

describe("Checkout", () => {
    test("Initalstate", () => {
        expect(store.getState().checkout.length).toBe(0);
    })
    test("Adding item to cart", () => {
        store.dispatch(addToCart(dummyData.allProducts[0]));
        expect(store.getState().checkout.length).toBe(1);
        expect(store.getState().checkout[0].amount).toBe(1);
        expect(store.getState().checkout[0].product.title).toBe(dummyData.allProducts[0].title);
        
        store.dispatch(addToCart(dummyData.allProducts[0]));
        expect(store.getState().checkout.length).toBe(1);
        expect(store.getState().checkout[0].amount).toBe(2);
        
        store.dispatch(addToCart(dummyData.allProducts[1]));
        expect(store.getState().checkout.length).toBe(2);
    })
    test("Remove item from cart", () => {
        store.dispatch(addToCart(dummyData.allProducts[0]));
        store.dispatch(addToCart(dummyData.allProducts[0]));
        expect(store.getState().checkout.length).toBe(1);
        
        store.dispatch(removeFromCart(dummyData.allProducts[0]));
        expect(store.getState().checkout[0].amount).toBe(1);

        store.dispatch(removeFromCart(dummyData.allProducts[0]));
        expect(store.getState().checkout.length).toBe(0);
    })
})