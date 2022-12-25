import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import RadioButton from "../components/RadioButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllProducts, sortByPrice } from "../redux/reducers/productReducer";

export default function Products() {
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    console.log(direction);
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    return (
        <div className="all-products">
        <h1>All products</h1>
        <div className="all-products__filter-actions">
            <button 
            className="button basic" 
            onClick={() => dispatch(sortByPrice(direction))}>
                Sort
            </button>
            <div>
                <RadioButton 
                label="ascending" 
                value="asc" 
                checked={direction === "asc"} 
                setDirection={setDirection}/> 
                <RadioButton 
                label="Descending" 
                value="desc" 
                checked={direction === "desc"} 
                setDirection={setDirection}/>
            </div>
        </div>
        <div className="main__products-wrapper">
            {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        </div>
    );
}