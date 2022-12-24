import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllProducts, getProductsByCategory } from "../redux/reducers/productReducer";

export default function Products() {
    const products = useAppSelector(state => state.products);
    const categories = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log("täh")
        if (products.length === 1) {
            console.log(products)
            dispatch(getAllProducts())
        } else if (categories.length === 1) {
            console.log(categories)
            dispatch(getProductsByCategory(categories[0].id))
        } else {
            dispatch(getAllProducts())
        }
    }, [dispatch])

    
    console.log(categories)
    return (
        <>
        <h1>{categories.length === 1 ? categories[0].name : "All products"}</h1>
        <div className="main__products-wrapper">
            {products.map(product => <ProductCard product={product}/>)}
        </div>
        </>
    );
}