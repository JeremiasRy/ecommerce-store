import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState, createStore } from "../store";
import { actionDone, loading } from "./loadingReducer";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;

beforeEach(() => {
    store = createStore();
})

describe("loading reducer", () => {
    test("initial state", () => {
        expect(store.getState().loading).toBe(false);
    })
    test("changes to loading and back to not loading", () => {
        store.dispatch(loading());
        expect(store.getState().loading).toBe(true);
        store.dispatch(actionDone());
        expect(store.getState().loading).toBe(false);
    })
})