import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/main/Productform";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addProduct, getAllProducts, updateProduct } from "../redux/reducers/productReducer";

export default function CreateProduct() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products);
    const { update, id } = useParams();
    const isTrue = update === 'true'

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    
    return (
        <>
        <ProductForm submitAction={isTrue ? updateProduct : addProduct} update={products.find(product => product.id === Number(id))}/>
        </>
    )
}