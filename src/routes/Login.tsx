import UserForm from "../components/UserForm"
import { login } from "../redux/reducers/userReducer"

export default function Login() {
    return (
        <UserForm submitAction={login}/>
    )
}