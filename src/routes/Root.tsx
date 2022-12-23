import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

export default function Root() {
    const user = useAppSelector(state => state.user);
    return (
        <>
        <header>
            <div className="header-wrapper">
                <div className="header-wrapper__header">
                    <h1>Welcome to the web store</h1>
                </div>
                <nav className="header-wrapper__nav">
                    <Link className="header-wrapper__nav__nav-element" to="/products"><p>Products</p></Link>
                    <Link className="header-wrapper__nav__nav-element" to="/categories"><p>Categories</p></Link>
                    {user === null ? <Link  className="header-wrapper__nav__nav-element" to="/login"><p>Log in</p></Link> : <Link className="header-wrapper__nav__nav-element" to="/profile"><p>Profile</p></Link>}
                </nav>
            </div>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <div className="footer__copyright">
                <p>By Jeremias Ryttäri</p>
            </div>
            <div className="footer__img">
                <img />
            </div>
        </footer>
        </>
    )
}