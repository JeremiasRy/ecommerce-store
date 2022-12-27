import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import RadioButton from "../components/RadioButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllCategories } from "../redux/reducers/categoryReducer";
import { addNotification, createNotification } from "../redux/reducers/notificationReducer";
import { filterByName, getAllProducts, getProductsByCategory, sortByPrice } from "../redux/reducers/productReducer";

export default function Products() {
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
    const [find, setFind] = useState("");
    const products = useAppSelector(state => state.products);
    const categories = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (find !== "") {
            dispatch(filterByName(find));  
        }
    }, [find])

    if (categories.length === 1 && products.length === 0) {
        dispatch(addNotification(createNotification("Category does not have any products", "notification", 3)))
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }


    return (
        <div className="all-products">
        <Outlet />
        <h1>{categories.length === 1 ? categories[0].name : "All products"}</h1>
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
            {categories.length > 1 && <input type="text" placeholder="Filter by name" value={find} onChange={(e) => setFind(e.currentTarget.value)}/>}
        </div>
        <div className="main__products-wrapper">
            {products.length === 0 ? <h4>Can't find anything with {find}</h4> : products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        </div>
    );
}