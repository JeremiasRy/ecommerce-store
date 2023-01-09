import { ThunkMiddleware, MiddlewareArray, AnyAction } from "@reduxjs/toolkit";
import { createStore, RootState } from "../store";
import server from "../../utility/testServer";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { login, logout, registerUser } from "./userReducer";
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

describe("Initial state", () => {
    test("Return initial state", () => {
        expect(store.getState().user).toBe(null);
    })
    test("login logins and logoug logouts", async () => {
        await store.dispatch(login({email: "jes@mail.com", password: "qwe"} ))
        expect(store.getState().user).toBe(null);
        await store.dispatch(login({email: "jes@mail.com", password: "qwerty"} ))
        expect(store.getState().user).toBe(1);
        await store.dispatch(logout());
        expect(store.getState().user).toBe(0);
    })
    test("resgister doen't happen if email exists", async () => {
        await store.dispatch(registerUser(dummyData.invalidNewGuy))
        expect(store.getState().user).toBe(0);
    })
    test("register happens and logins", async () => {
        await store.dispatch(registerUser(dummyData.validNewGuy))
        await store.dispatch(login({email: dummyData.validNewGuy.email, password: dummyData.validNewGuy.password}))
        expect(store.getState().user).toBe(1)
    })

})