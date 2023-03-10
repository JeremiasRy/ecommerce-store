import { useEffect, useState } from "react";
import ProductCard from "../components/main/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { filterByName, getProductsPage, } from "../redux/reducers/productReducer";
import FilterActions from "../components/filter/FilterActions";

export default function Products() {
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
    const [find, setFind] = useState("");
    const [page, setPage] = useState(1);
    const products = useAppSelector(state => state.products);
    const loading = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (find !== "") {
            const debounce = setTimeout(() => {
                dispatch(filterByName(find))
            }, 500)
            return () => clearTimeout(debounce)
        } else {
            dispatch(getProductsPage(page))
        }
    }, [find, dispatch, page]);

    return (
        <div className="all-products">
            <h1>All products</h1>
            <FilterActions 
            direction={direction}
            setDirection={setDirection}
            find={find}
            setFind={setFind}
            page={page}
            setPage={setPage}
            productsOnCurrentPage={products.length}/>
            {loading && <h4>Loading all products for search...</h4>}

            <div className="main__products-wrapper">
                {find !== "" && products.length === 0 && 
                <h4>Can't find anything</h4>}
                {products.length !== 0 && products.map(
                    product => <ProductCard key={product.id} product={product}/>
                    )}
            </div>
        </div>
    );
}