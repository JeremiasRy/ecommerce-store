import ICredentials from './types/interfaces/credentials'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { useEffect } from 'react'
import { getAllProducts, getProduct } from './redux/reducers/productReducer'

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const products = useAppSelector(state => state.products)
  let credentials:ICredentials = {
    email: "john@mail.com",
    password: "changeme"
  }

  useEffect(() => {
    dispatch(getProduct(45))
  }, [])
  
  return (
    <div>App</div>
  )
}

export default App