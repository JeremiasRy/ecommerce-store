import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import server from "../../utility/testServer";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { addProduct, deleteProduct, filterByName, getProductsPage, sortByPrice, updateProduct } from "./productReducer";
import IUser from "../../types/interfaces/user";
import ICategory from "../../types/interfaces/category";
import ICheckoutItem from "../../types/interfaces/checkoutItem";
import INotification from "../../types/interfaces/notification";
import dummyData from "../../utility/dummyData";

let store: ToolkitStore<RootState, AnyAction, MiddlewareArray<[ThunkMiddleware<{
    user: IUser[];
    products: any[];
    categories: ICategory[];
    checkout: ICheckoutItem[];
    notification: INotification;
}, AnyAction, undefined>]>>;

beforeAll(() => {
    server.listen();
})

afterAll(() => {
    server.close();
})

beforeEach(() => {
    store = createStore();
})

describe("Initial state and fetch all", () => {
    test("Return initial state", () => {
        expect(store.getState().products.length).toBe(0);
    })
    test("Fetch all products from server", async () => {
        await store.dispatch(getProductsPage(0));
        expect(store.getState().products.length).toBe(3);
    })
})
describe("Filter and sort actions", () => {
    beforeEach(async () => {
        await store.dispatch(getProductsPage(0));
    })
    test("Filter", () => {
        store.dispatch(filterByName("search me"));
        expect(store.getState().products.length).toBe(1);
    })
    test("Sort", () => {
        store.dispatch(sortByPrice("asc"));
        expect(store.getState().products[0].price).toBe(100);
        store.dispatch(sortByPrice("desc"));
        expect(store.getState().products[0].price).toBe(166);
    })
})
describe("Create, delete and update", () => {
    beforeEach(async () => {
        await store.dispatch(getProductsPage(0));
    })
    test("Create valid item", async () => {
        await store.dispatch(addProduct(dummyData.validNewItem));
        expect(store.getState().products.length).toBe(4);
        expect(store.getState().products[3].title).toBe(dummyData.validNewItem.title);
        expect(store.getState().products[3].price).toBe(dummyData.validNewItem.price);
        expect(store.getState().products[3].description).toBe(dummyData.validNewItem.description);
    })
    test("Create invalid item", async () => {
        await store.dispatch(addProduct(dummyData.invalidNewItem));
        expect(store.getState().products.length).toBe(3);
    })
    test("Update product", async () => {
        await store.dispatch(updateProduct(dummyData.validNewItem, 0));
        expect(store.getState().products[0].title).toBe(dummyData.validNewItem.title);
    })
    test("Delete product", async () => {
        await store.dispatch(deleteProduct(0));
        expect(store.getState().products.length).toBe(2)
        await store.dispatch(deleteProduct(4));
        expect(store.getState().products.length).toBe(2);
    })
})