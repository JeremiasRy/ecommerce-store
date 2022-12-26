import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { addNotification } from "../redux/reducers/notificationReducer";
import { login } from "../redux/reducers/userReducer"
import INotification from "../types/interfaces/notification";

export default function Login() {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.length !== 0) {
            navigate("/");
            let notification:INotification = {
                message: "Logged in!",
                type: "notification",
                timeoutInSec: 3,
            }
            dispatch(addNotification(notification));
        }
    }, [user]);
    
    return (
        <UserForm submitAction={login}/>
    )
}