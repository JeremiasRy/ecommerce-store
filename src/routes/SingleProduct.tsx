import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { addToCart } from "../redux/reducers/checkoutReducer";
import { getProduct } from "../redux/reducers/productReducer";
import productService from "../services/product";

export default function SingleProduct() {
    const { id } = useParams();
    const product = useAppSelector(state => state.products)
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProduct(Number(id)))
    }, [dispatch, id])

    if (product.length === 0) {
        return <></>;
    }

    return (
        <div className="single-product">
            <h2>{product[0].title}</h2>    
            <div className="single-product__wrapper">
                <div className="single-product-wrapper__left-column">
                    <img src={product[0].images[0]} />
                </div>
                <div className="single-product-wrapper__right-column">  
                    <p>{product[0].category.name}</p>
                    <p>{product[0].description}</p>
                    <p>{product[0].price}€</p>
                    <button className="button basic" onClick={() => dispatch(addToCart(product[0]))}>Add to cart</button>
                    {user.length !== 0 && user[0].role === "admin" && 
                    <div className="single-product-wrapper__right-column__admin-actions">
                        <h4>Edit product</h4>
                        <button 
                        className="button remove" 
                        onClick={() => {
                            productService.deleteProduct(product[0].id)
                            navigate("/")}}>
                            Delete
                        </button><button className="button basic">Update</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}