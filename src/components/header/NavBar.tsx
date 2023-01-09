import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getAllCategories } from "../../redux/reducers/categoryReducer";
import { getProductsPage } from "../../redux/reducers/productReducer";

export default function NavBar(props: {setLight:React.Dispatch<React.SetStateAction<boolean>>, light:boolean}) {
    const user = useAppSelector(state => state.user);
    const checkout = useAppSelector(state => state.checkout);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const itemsInCheckout = ` (${checkout.length})`;

    function handleProductsClick() {
        dispatch(getProductsPage(1));
        dispatch(getAllCategories());
        navigate('products')
    }

    return (
        <div className="header-wrapper">
            <div className="header-wrapper__header">
                <h1 className="header-wrapper__header" onClick={() => navigate("/home")}>Web store</h1>
            </div>
            <nav className="header-wrapper__nav">
                <button className="button basic" onClick={() => props.setLight(!props.light)}>{props.light ? "Dark" : "Light"}</button>
                <Link className="header-wrapper__nav__nav-element" to="products" onClick={handleProductsClick}>
                    <p>Products</p>
                </Link>
                <Link className="header-wrapper__nav__nav-element" to="categories">
                    <p>Categories</p>
                </Link>
                <Link className="header-wrapper__nav__nav-element" to="checkout">
                    <p>Checkout {itemsInCheckout}</p>
                </Link>
                {user.length === 0 
                ? <Link  className="header-wrapper__nav__nav-element" to="login">
                    <p>Log in</p>
                  </Link> 
                : <Link className="header-wrapper__nav__nav-element" to="profile">
                    <p>{user[0].name}</p>
                  </Link>}
                {user.length === 1 && user[0].role === "admin" && 
                <Link className="header-wrapper__nav__nav-element" to="create-product/false/0">
                    <p>Create product</p>
                </Link>}
            </nav>
        </div>
    )
}