import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { addNotification, createNotification } from "../redux/reducers/notificationReducer";
import { logout } from "../redux/reducers/userReducer"

export default function Profile() {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user === null) {
            navigate("/login");
            dispatch(addNotification(createNotification("Please login", "notification", 3)))
        }
    }, [dispatch, user, navigate]);

    return (
        <div className="profile-page">
            <h1>Your profile {user?.name}!</h1>
            <div className="profile-page__avatar div-bg-img" style={{backgroundImage: `url(${user?.avatar})`}}></div>
            <p>Role: {user?.role}</p>
            <button 
            className="button remove btn-profile-page" 
            onClick={() => {
                dispatch(logout());
                navigate("/home")}}>Log out</button>
        </div>
    )
}