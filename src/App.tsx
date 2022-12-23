import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './routes/Root';
import Products from './routes/Products';
import SingleProduct from './routes/SingleProduct';
import Categories from './routes/Categories';
import LoginForm from "./routes/LogInForm";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
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
          element: <LoginForm />
        }

      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App