import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import RadioButton from "../components/RadioButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { filterByName, getProductsPage, sortByPrice } from "../redux/reducers/productReducer";

export default function Products() {
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
    const [find, setFind] = useState("");
    const [page, setPage] = useState(1);
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (find !== "") {
            dispatch(filterByName(find))
        } else {
            dispatch(getProductsPage(page))
        }
    }, [find, dispatch, page]);

    return (
        <div className="all-products">
            <h1>All products</h1>
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
                <input className="all-products__filter-actions__text" type="text" placeholder="Filter by name" value={find} onChange={(e) => setFind(e.currentTarget.value)}/>
                {find !== "" && <button className="button basic small wide" onClick={() => setFind("")}>Remove filter</button>}
                <div className="change-page-buttons">
                    <button className="button basic small" onClick={() => page - 1 >= 1 && setPage(page - 1)}>Prev</button> 
                    {page} 
                    <button className="button basic small" onClick={() => !(products.length < 20) && setPage(page + 1)}>Next</button>
                </div>
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