import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import server from "../../utility/testServer";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import IUser from "../../types/interfaces/user";
import ICategory from "../../types/interfaces/category";
import ICheckoutItem from "../../types/interfaces/checkoutItem";
import INotification from "../../types/interfaces/notification";
import { login, logout } from "./userReducer";

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

describe("Initial state", () => {
    test("Return initial state", () => {
        expect(store.getState().user.length).toBe(0);
    })
    test("login logins and logoug logouts", async () => {
        await store.dispatch(login({email: "dumdum", password: "qwe"} ))
        expect(store.getState().user.length).toBe(0);
        await store.dispatch(login({email: "dumdum", password: "qwerty"} ))
        expect(store.getState().user.length).toBe(1);
        await store.dispatch(logout());
        expect(store.getState().user.length).toBe(0);
    })
})