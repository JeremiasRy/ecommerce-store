import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import IUser from "../../types/interfaces/user";
import ICategory from "../../types/interfaces/category";
import ICheckoutItem from "../../types/interfaces/checkoutItem";
import INotification from "../../types/interfaces/notification";
import { addNotification, createNotification } from "./notificationReducer";

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

describe("Notification", () => {
    test("Create notification", () => {
        store.dispatch(addNotification(createNotification("Hello", "notification", 3)));
        expect(store.getState().notification.message).toBe("Hello");
    })
})