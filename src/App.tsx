import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './routes/Root';
import Products from './routes/Products';
import SingleProduct from './routes/SingleProduct';
import Categories from './routes/Categories';
import Login from "./routes/Login";
import ProductsByCategory from "./routes/ProductsByCategory";
import Checkout from "./routes/Checkout";
import Profile from "./routes/Profile";
import Home from "./routes/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/products/:id",
          element: <SingleProduct />
        },
        {
          path: "/categories",
          element: <Categories />
        }, 
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/products/category/:id",
          element: <ProductsByCategory />
        },
        {
          path: "/checkout",
          element: <Checkout />
        },
        {
          path: "/profile",
          element: <Profile />
        }
      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App