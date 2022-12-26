import { useState } from "react";
import { useAppDispatch, } from "../hooks/reduxHook";
import ICredentials from "../types/interfaces/credentials";

export default function UserForm(props: {submitAction: any}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        let credentials:ICredentials = {
            email: email,
            password: password
        }
        dispatch(props.submitAction(credentials));
    }
    return (
        <div className="login-form">
            <h1>Login</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
            <input type="password" value={password} onChange={(e => setPassword(e.currentTarget.value))}/>
            <button className="button basic" onClick={() => handleSubmit()}>Login</button>
        </div>
    )
}