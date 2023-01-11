import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../../redux/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { addToCart, removeFromCart } from "../../redux/reducers/checkoutReducer";
import dummyData from "../../utility/dummyData";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;

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