import { useEffect, useState } from "react";
import { useAppDispatch, } from "../../hooks/reduxHook";
import ICredentials, { IRegister } from "../../types/interfaces/credentials";

export default function UserForm(props: {submitAction: any, register: boolean}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const dispatch = useAppDispatch();

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setAvatar("");
    }
    useEffect(() => {
        resetForm()
    }, [props.register])

    const handleSubmit = () => {
        let credentials: ICredentials | IRegister;
        if (props.register) {
            credentials = {
                name: name,
                email: email,
                password: password,
                avatar: avatar
            }
        } else {
            credentials = {
                email: email,
                password: password,
            }
        }
        dispatch(props.submitAction(credentials));
    }
    return (
        <div className="login-form">
            {props.register && 
            <>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <input type="url" placeholder="Url to avatar" value={avatar} onChange={(e) => setAvatar(e.currentTarget.value)}/>
            </>
            }
            <input type="email" placeholder="E-mail address" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e => setPassword(e.currentTarget.value))}/>
            <button className="button basic" onClick={() => handleSubmit()}>{props.register ? "Register" : "Login"}</button>
        </div>
    )
}