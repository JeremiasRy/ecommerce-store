import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import RadioButton from "../components/RadioButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { filterByName, getProductsPage, getProductsByCategory, sortByPrice } from "../redux/reducers/productReducer";

export default function Products() {
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
    const [find, setFind] = useState("");
    const [page, setPage] = useState(1);
    const products = useAppSelector(state => state.products);
    const categories = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (find !== "") {
            dispatch(filterByName(find));
            return;
        } 

        if (categories.length !== 1) {
            dispatch(getProductsPage(page))
        } else if (categories.length === 1) {
            dispatch(getProductsByCategory(categories[0].id));
        }
    }, [page, categories, dispatch, find])

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
                {categories.length > 1 && 
                <div className="change-page-buttons">
                    <button className="button basic small" onClick={() => page - 1 >= 1 && setPage(page - 1)}>Prev</button> 
                    {page} 
                    <button className="button basic small" onClick={() => setPage(page + 1)}>Next</button>
                </div>}
            </div>
            <div className="main__products-wrapper">
                {find !== "" && products.length === 0 && 
                <h4>Can't find anything</h4>}
                {products.length !== 0 && products.map(product => 
                    <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    );
}