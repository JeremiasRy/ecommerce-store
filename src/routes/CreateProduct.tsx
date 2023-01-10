import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/main/Productform";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addNotification, createNotification } from "../redux/reducers/notificationReducer";
import { addProduct, getAllProducts, updateProduct } from "../redux/reducers/productReducer";

export default function CreateProduct() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useAppSelector(state => state.products);
    const user = useAppSelector(state => state.user);
    const { update, id } = useParams();
    const isTrue = update === 'true'

    useEffect(() => {
        if (!user) {
            navigate("/login");
            dispatch(addNotification(createNotification("Please login", "notification", 3)));
        }
        dispatch(getAllProducts())
    }, [dispatch])
    
    return (
        <>
        <ProductForm submitAction={isTrue ? updateProduct : addProduct} update={products.find(product => product.id === Number(id))}/>
        </>
    )
}