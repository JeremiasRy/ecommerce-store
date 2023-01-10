import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHook";
import { addToCart } from "../../redux/reducers/checkoutReducer";
import { addNotification, createNotification } from "../../redux/reducers/notificationReducer";
import { deleteProduct } from "../../redux/reducers/productReducer";
import IProduct from "../../types/interfaces/product";

export default function SingleProductInfo(props: {product: IProduct, userIsAdmin: boolean}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleAddToCart() {
        dispatch(addToCart(props.product));
        dispatch(addNotification(createNotification(`Added ${props.product.title} to cart!`, "notification", 3)))
    }

    function handleDeleteClick() {
        dispatch(deleteProduct(props.product.id))
        navigate("/home")
    }

    return (
        <>
        <p>{props.product.category.name}</p>
        <p>{props.product.description}</p>
        <p>{props.product.price}€</p>
        <button 
        className="button basic" 
        onClick={handleAddToCart}>Add to cart</button>
        {props.userIsAdmin && 
        <div className="single-product-wrapper__right-column__admin-actions">
            <h4>Edit product</h4>
            <button 
            className="button remove" 
            onClick={handleDeleteClick}>
            Delete
            </button>
            <button 
            className="button basic" 
            onClick={() => navigate(`/create-product/true/${props.product.id}`)}>Update</button>
            </div>}
        </>
    )
} 