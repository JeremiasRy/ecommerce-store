import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { addNotification, createNotification } from "./notificationReducer";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;

beforeEach(() => {
    store = createStore();
})

describe("Notification", () => {
    test("Create notification", () => {
        store.dispatch(addNotification(createNotification(["Hello"], "notification", 3)));
        expect(store.getState().notification.message[0]).toBe("Hello");
    })
})