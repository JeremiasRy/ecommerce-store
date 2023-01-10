import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import server from "../../utility/testServer";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { addProduct, deleteProduct, filterByName, getProductsPage, sortByPrice, updateProduct } from "./productReducer";
import dummyData from "../../utility/dummyData";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;

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
        await store.dispatch(getProductsPage(1));
        expect(store.getState().products.length).toBe(4);
        expect(store.getState().products[3].title).toBe(dummyData.validNewItem.title);
        expect(store.getState().products[3].price).toBe(dummyData.validNewItem.price);
        expect(store.getState().products[3].description).toBe(dummyData.validNewItem.description);
    })
    test("Create invalid item", async () => {
        await store.dispatch(addProduct(dummyData.invalidNewItem));
        await store.dispatch(getProductsPage(1));
        expect(store.getState().products.length).toBe(4);
    })
    test("Update product", async () => {
        dummyData.validNewItem.id = 0;
        await store.dispatch(updateProduct(dummyData.validNewItem));
        await store.dispatch(getProductsPage(1))
        expect(store.getState().products[0].title).toBe(dummyData.validNewItem.title);
    })
    test("Delete product", async () => {
        await store.dispatch(deleteProduct(0));
        await store.dispatch(getProductsPage(1));
        expect(store.getState().products.length).toBe(3)
        await store.dispatch(deleteProduct(4));
        await store.dispatch(getProductsPage(1));
        expect(store.getState().products.length).toBe(3);
    })
})