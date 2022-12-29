import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';
import checkoutReducer from './reducers/checkoutReducer';
import notificationReducer from './reducers/notificationReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';


export const createStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      products: productReducer,
      categories: categoryReducer,
      checkout: checkoutReducer,
      notification: notificationReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
  });
}

const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
