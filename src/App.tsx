import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './routes/Root';
import AllProducts from './routes/AllProducts';
import SingleProduct from './routes/SingleProduct';
import Categories from './routes/Categories';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/products",
          element: <AllProducts />
        },
        {
          path: "/products/:id",
          element: <SingleProduct />
        },
        {
          path: "/categories",
          element: <Categories />
        }

      ]
    },
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App