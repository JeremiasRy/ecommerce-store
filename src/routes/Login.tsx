import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm"
import { useAppSelector } from "../hooks/reduxHook"
import { login } from "../redux/reducers/userReducer"

export default function Login() {
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.length !== 0) {
            navigate("/");
        }
    }, []);
    
    return (
        <UserForm submitAction={login}/>
    )
}