import { AsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import ICredentials from "../types/interfaces/credentials";

export default function UserForm(props: {submitAction: AsyncThunk<any, ICredentials, any>}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (user.length !== 0) {
        navigate('/')
    }

    const handleSubmit = () => {
        console.log(props.submitAction);
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