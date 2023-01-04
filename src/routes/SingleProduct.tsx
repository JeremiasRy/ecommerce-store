import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import SlideShow from "../components/Slideshow";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { addToCart } from "../redux/reducers/checkoutReducer";
import { addNotification } from "../redux/reducers/notificationReducer";
import { deleteProduct, getProduct } from "../redux/reducers/productReducer";
import INotification from "../types/interfaces/notification";

export default function SingleProduct() {
    const { id } = useParams();
    const product = useAppSelector(state => state.products).filter(product => product.id === Number(id));
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProduct(Number(id)))
    }, [id, dispatch])

    if (product.length === 0) {
        return <></>;
    }
    function handleAddToCart() {
        dispatch(addToCart(product[0]));
        let notification:INotification = {
            message: `Added ${product[0].title} to cart!`,
            type: "notification",
            timeoutInSec: 3,
        }
        dispatch(addNotification(notification))
    }
    function handleDeleteClick() {
        dispatch(deleteProduct(product[0].id))
        navigate("/home")
    }
    return (
        <div className="single-product">
            <h2>{product[0].title}</h2>    
            <div className="single-product__wrapper">
                <div className="single-product-wrapper__left-column">
                    <SlideShow images={product[0].images} />
                </div>
                <div className="single-product-wrapper__right-column">  
                    <p>{product[0].category.name}</p>
                    <p>{product[0].description}</p>
                    <p>{product[0].price}€</p>
                    <button 
                    className="button basic" 
                    onClick={handleAddToCart}>Add to cart</button>
                    {user.length !== 0 && user[0].role === "admin" && 
                    <div className="single-product-wrapper__right-column__admin-actions">
                        <h4>Edit product</h4>
                        <button 
                        className="button remove" 
                        onClick={handleDeleteClick}>
                            Delete
                        </button>
                        <button 
                        className="button basic" 
                        onClick={() => navigate(`/create-product/true/${product[0].id}`)}>Update</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}