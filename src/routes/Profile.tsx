import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { logout } from "../redux/reducers/userReducer"

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
            <h1>Your profile {user[0].name}!</h1>
            <div className="profile-page__avatar div-bg-img" style={{backgroundImage: `url(${user[0].avatar})`}}></div>
            <p>Role: {user[0].role}</p>
            <button 
            className="button remove btn-profile-page" 
            onClick={() => {
                dispatch(logout());
                navigate("/home")}}>Log out</button>
        </div>
    )
}