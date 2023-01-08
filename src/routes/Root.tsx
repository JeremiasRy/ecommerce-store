import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Notification from "../components/NotificationBar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import lightCss from "../components/LightCss";
import { refreshLogin } from "../redux/reducers/userReducer";
import { fillCartFromStorage } from "../redux/reducers/checkoutReducer";
import NavBar from "../components/NavBar";


export default function Root() {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [light, setLight] = useState(false);

    useEffect(() => {
        if (user.length === 0 && window.localStorage.getItem("refreshToken")) {
            const refreshToken = window.localStorage.getItem("refreshToken") as string;
            dispatch(refreshLogin(refreshToken))
        }
    }, [user, dispatch])
    
    useEffect(() => {
        if (window.localStorage.getItem("checkout")) {
            const checkout = JSON.parse(window.localStorage.getItem("checkout") as string);
            dispatch(fillCartFromStorage(checkout));
        }
    }, [dispatch])
    
    return (
        <>
        <Notification />
        <style media={light ? 'screen' : 'none'}>
            {lightCss}
        </style>
        <header>
            <NavBar setLight={setLight} light={light}/>
        </header>
        <main>
            <Breadcrumbs />
            <Outlet />
        </main>
        <footer>
            <div className="footer__copyright">
                <p>By Jeremias Ryttäri</p>
            </div>
            <div className="footer__img">
                <img alt=""/>
            </div>
        </footer>
        </>
    )
}