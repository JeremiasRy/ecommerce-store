import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { addNotification } from "../redux/reducers/notificationReducer";
import { logout } from "../redux/reducers/userReducer"
import INotification from "../types/interfaces/notification";

export default function Profile() {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user.length === 0) {
            navigate("/");
        }
    }, [navigate, user]);

    if (user.length === 0) {
        return (
            <></>
        );
    };

    return (
        <div className="profile-page">
            <h1>Your profile</h1>
            <p>username: {user[0].name}</p>
            <p>Role: {user[0].role}</p>
            <button 
            className="button remove" 
            onClick={() => {
                dispatch(logout());
                let notification:INotification = {
                    message: "Logged out!",
                    type: "notification",
                    timeoutInSec: 3,
                }
                dispatch(addNotification(notification))
                navigate("/")}}>Log out</button>
        </div>
    )
}