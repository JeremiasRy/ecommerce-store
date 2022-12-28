import { Link, Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Notification from "../components/NotificationBar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllCategories } from "../redux/reducers/categoryReducer";
import { getAllProducts } from "../redux/reducers/productReducer";

export default function Root() {
    const user = useAppSelector(state => state.user);
    const checkout = useAppSelector(state => state.checkout);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const itemsInCheckout = `(${checkout.reduce((a,b) => a + b.amount, 0)})`;
    return (
        <>
        <Notification />
        <header>
            <div className="header-wrapper">
                <div className="header-wrapper__header">
                    <h1 className="header-wrapper__header" onClick={() => navigate("/home")}>Web store</h1>
                </div>
                <nav className="header-wrapper__nav">
                    <Link className="header-wrapper__nav__nav-element" to="products" 
                    onClick={() => {
                        dispatch(getAllProducts(1));
                        dispatch(getAllCategories());
                        navigate('products')}}><p>Products</p></Link>
                    <Link className="header-wrapper__nav__nav-element" to="categories"><p>Categories</p></Link>
                    <Link className="header-wrapper__nav__nav-element" to="checkout"><p>Checkout {itemsInCheckout}</p></Link>
                    {user.length === 0 ? <Link  className="header-wrapper__nav__nav-element" to="login"><p>Log in</p></Link> : <Link className="header-wrapper__nav__nav-element" to="profile"><p>{user[0].name}</p></Link>}
                    {user.length === 1 && user[0].role === "admin" && <Link className="header-wrapper__nav__nav-element" to="create-product/false/0"><p>Create product</p></Link>}
                </nav>
            </div>
        </header>
        <Breadcrumbs />
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