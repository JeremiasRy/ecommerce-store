import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ICheckoutItem from '../types/interfaces/checkoutItem';
import { User } from '../types/user';
import categoryReducer from './reducers/categoryReducer';
import checkoutReducer from './reducers/checkoutReducer';
import loadingReducer from './reducers/loadingReducer';
import notificationReducer from './reducers/notificationReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';


let preCheckout:ICheckoutItem[] = [];
let preUser:User = null;

const getCart = localStorage.getItem("checkout");
const getUser = localStorage.getItem("user");


if (preCheckout.length === 0) {
  preCheckout = JSON.parse(getCart as string)
  if (preCheckout === null) {
    preCheckout = [] as ICheckoutItem[]
  }
}
if (preUser === null) {
  preUser = JSON.parse(getUser as string)
}

const preloadedState = {
  checkout: preCheckout,
  user: preUser
}

const saveState = (state: RootState) => {
  try {
    const checkout = JSON.stringify(state.checkout);
    const user = JSON.stringify(state.user)
    localStorage.setItem("checkout", checkout);
    localStorage.setItem("user", user);
  } catch (e:any) {
    throw new Error(e.message);
  }
}

export const createStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      products: productReducer,
      categories: categoryReducer,
      checkout: checkoutReducer,
      notification: notificationReducer,
      loading: loadingReducer
    },
    preloadedState: preloadedState,
  });
}

export const store = createStore();

store.subscribe(() => saveState(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
