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
                    <ul>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li>
                            {user === null ? <Link to="/login">Log in</Link> : <Link to="/profile">Profile</Link>}
                        </li>
                    </ul>
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