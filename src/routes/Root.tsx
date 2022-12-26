import { Link, Outlet } from "react-router-dom";
import Notification from "../components/NotificationBar";
import { useAppSelector } from "../hooks/reduxHook";

export default function Root() {
    const user = useAppSelector(state => state.user);
    const checkout = useAppSelector(state => state.checkout);
    const itemsInCheckout = `(${checkout.reduce((a,b) => a + b.amount, 0)})`;
    return (
        <>
        <Notification />
        <header>
            <div className="header-wrapper">
                <div className="header-wrapper__header">
                    <h1>Welcome to the web store</h1>
                </div>
                <nav className="header-wrapper__nav">
                    <Link className="header-wrapper__nav__nav-element" to="/products"><p>Products</p></Link>
                    <Link className="header-wrapper__nav__nav-element" to="/categories"><p>Categories</p></Link>
                    <Link className="header-wrapper__nav__nav-element" to="/checkout"><p>Checkout {itemsInCheckout}</p></Link>
                    {user.length === 0 ? <Link  className="header-wrapper__nav__nav-element" to="/login"><p>Log in</p></Link> : <Link className="header-wrapper__nav__nav-element" to="/profile"><p>{user[0].name}</p></Link>}
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
                <img alt=""/>
            </div>
        </footer>
        </>
    )
}