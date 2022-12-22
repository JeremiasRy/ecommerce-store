import ICredentials from './types/interfaces/credentials'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { login } from './redux/reducers/userReducer'
import { useEffect } from 'react'

const App = () => {
  let credentials:ICredentials = {
    email: "john@mail.com",
    password: "changeme"
  }
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(login(credentials))
  }, [])
  


  return (
    <div>App</div>
  )
}

export default App