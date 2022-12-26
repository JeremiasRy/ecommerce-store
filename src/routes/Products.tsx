import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import RadioButton from "../components/RadioButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { filterByName, getAllProducts, sortByPrice } from "../redux/reducers/productReducer";

export default function Products() {
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
    const [find, setFind] = useState("");
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (find === "") {
            dispatch(getAllProducts())
        } else {
            dispatch(filterByName(find));
        }
    }, [dispatch, find])

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
            <input type="text" placeholder="Filter by name" value={find} onChange={(e) => setFind(e.currentTarget.value)}/>
        </div>
        <div className="main__products-wrapper">
            {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        </div>
    );
}