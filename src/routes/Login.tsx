import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/main/UserForm"
import { useAppSelector } from "../hooks/reduxHook"
import { login, registerUser } from "../redux/reducers/userReducer"

export default function Login() {
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);

    useEffect(() => {
        if (user.length !== 0) {
            navigate("/profile");
        } 
    }, [user, navigate]);
    
    return (
        <>
        <h1 className="login-h1">{register ? "Sign Up" : "Login"}</h1>
        {!register 
            ? <p className="login-p">Not a member? <span onClick={() => setRegister(!register)}className="login-sign-up">Sign up!</span></p> 
            : <p className="login-p">Already a member? <span className="login-sign-up" onClick={() => setRegister(!register)}>Login!</span></p>}
        <UserForm submitAction={register ? registerUser : login} register={register}/>
        </>
    )
}