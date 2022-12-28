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
    
    useEffect(() => {
        if (categories.length === 1 && products.length === 0) {
            dispatch(addNotification(createNotification("Category does not have any products", "notification", 3)))
            dispatch(getAllProducts());
            dispatch(getAllCategories());
        } else if (products.length === 0 && find === "") {
            dispatch(getAllProducts());
            dispatch(getAllCategories());
        }
    }, [dispatch, categories, products, find])

    return (
        <div className="all-products">
        <Outlet />
        <h1>{categories.length === 1 ? categories[0].name : "All products"}</h1>
        <div className="all-products__filter-actions">
            <div className="all-products__filter-actions__sort-direction">
                <button 
                className="button basic" 
                onClick={() => dispatch(sortByPrice(direction))}>
                    Sort
                </button>
                <div className="sort-direction__radio-buttons">
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
            {categories.length > 1 && <input className="all-products__filter-actions__text" type="text" placeholder="Filter by name" value={find} onChange={(e) => setFind(e.currentTarget.value)}/>}
        </div>
        <div className="main__products-wrapper">
            {find !== "" && products.length === 0 && <h4>Can't find anything</h4>}
            {products.length !== 0 && products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        </div>
    );
}