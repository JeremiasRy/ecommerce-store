import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { addNotification, createNotification } from "./notificationReducer";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;

beforeEach(() => {
    store = createStore();
})

describe("Notification", () => {
    test("Create notification", async () => {
        await store.dispatch(addNotification(createNotification("Hello", "notification", 3)));
        expect(store.getState().notification.message).toBe("Hello");
    })
    test("Create notification from array of messages", async () => {
        await store.dispatch(addNotification(createNotification(["Hello", "world"], "notification", 3)));
        expect(store.getState().notification.message.length).toBe(2);
    })
})