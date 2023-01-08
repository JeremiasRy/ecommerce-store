import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './routes/Root';
import Products from './routes/Products';
import SingleProduct from './routes/SingleProduct';
import Categories from './routes/Categories';
import Login from "./routes/Login";
import Checkout from "./routes/Checkout";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import CreateProduct from "./routes/CreateProduct";
import ProductsByCategory from "./routes/ProductsByCategory";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:id",
          element: <SingleProduct />
        },
        {
          path: "categories",
          element: <Categories />
        },
        {
          path: "categories/:categoryId",
          element: <ProductsByCategory />
        }, 
        {
          path: "login",
          element: <Login />
        },
        {
          path: "checkout",
          element: <Checkout />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "create-product/:update/:id",
          element: <CreateProduct />
        }
      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App