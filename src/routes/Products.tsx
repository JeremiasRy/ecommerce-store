import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllProducts } from "../redux/reducers/productReducer";

export default function Products() {
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <>
        <h1>All products</h1>
        <div className="main__products-wrapper">
            {products.map(product => <ProductCard product={product}/>)}
        </div>
        </>
    );
}