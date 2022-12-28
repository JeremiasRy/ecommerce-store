import { useParams } from "react-router-dom";
import ProductForm from "../components/Productform";
import { useAppSelector } from "../hooks/reduxHook";
import { addProduct, updateProduct } from "../redux/reducers/productReducer";

export default function CreateProduct() {
    const products = useAppSelector(state => state.products);
    const { update, id } = useParams();
    const isTrue = update === 'true'
    
    return (
        <>
        <ProductForm submitAction={isTrue ? updateProduct : addProduct} update={isTrue ? products.find(product => product.id === Number(id)) : null}/>
        </>
    )
}